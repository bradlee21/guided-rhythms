"use server";

import { revalidatePath } from "next/cache";

import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasServiceRoleSupabaseEnv } from "@/lib/supabase/env";
import { appointmentInternalNotesSchema, appointmentStatusUpdateSchema, appointmentConversionSchema } from "@/lib/validators/appointment";
import { addMinutesToTime } from "@/server/appointments/helpers";
import type { AppointmentActionState } from "@/types/appointment";

const defaultActionState: AppointmentActionState = {
  success: false,
  message: null,
};

function formDataToConversionValues(formData: FormData) {
  return {
    booking_request_id: formData.get("booking_request_id"),
    appointment_date: formData.get("appointment_date"),
    start_time: formData.get("start_time"),
    location_type: formData.get("location_type"),
    location_label: formData.get("location_label"),
    internal_notes: formData.get("internal_notes"),
    price_override_cents: formData.get("price_override_cents"),
  };
}

export async function createAppointmentFromBookingRequest(
  _previousState: AppointmentActionState,
  formData: FormData,
): Promise<AppointmentActionState> {
  const parsed = appointmentConversionSchema.safeParse(
    formDataToConversionValues(formData),
  );

  if (!parsed.success) {
    return {
      ...defaultActionState,
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!hasServiceRoleSupabaseEnv()) {
    return {
      ...defaultActionState,
      message: "Supabase is not connected.",
    };
  }

  const adminUser = await requireApprovedAdminUser();
  const supabase = createAdminClient();
  const values = parsed.data;

  try {
    const { data: request, error: requestError } = await supabase
      .from("booking_requests")
      .select(
        "id, client_id, first_name, last_name, email, phone, requested_service_id, requested_therapist_id, referral_source, notes, status, requested_service:services(id, total_block_minutes, base_price_cents)",
      )
      .eq("id", values.booking_request_id)
      .maybeSingle();

    if (requestError) {
      throw new Error(requestError.message);
    }

    if (!request) {
      return {
        ...defaultActionState,
        message: "Booking request not found.",
      };
    }

    if (request.status !== "approved") {
      return {
        ...defaultActionState,
        message: "Only approved booking requests can be converted.",
      };
    }

    const { data: existingAppointment } = await supabase
      .from("appointments")
      .select("id")
      .eq("booking_request_id", request.id)
      .maybeSingle();

    if (existingAppointment) {
      return {
        ...defaultActionState,
        message: "This booking request already has an appointment.",
        appointmentId: existingAppointment.id,
      };
    }

    const service =
      request.requested_service &&
      typeof request.requested_service === "object" &&
      !Array.isArray(request.requested_service)
        ? request.requested_service
        : null;

    if (!request.requested_service_id || !service) {
      return {
        ...defaultActionState,
        message: "A service is required before conversion.",
      };
    }

    let clientId = request.client_id as string | null;

    if (!clientId) {
      const { data: createdClient, error: clientError } = await supabase
        .from("clients")
        .insert({
          first_name: request.first_name,
          last_name: request.last_name,
          email: request.email,
          phone: request.phone,
          referral_source: request.referral_source ?? null,
          notes: request.notes ?? null,
        })
        .select("id")
        .single();

      if (clientError) {
        throw new Error(clientError.message);
      }

      clientId = createdClient.id;
    }

    const totalBlockMinutes = Number(
      (service as Record<string, unknown>).total_block_minutes,
    );
    const basePriceCents = Number(
      (service as Record<string, unknown>).base_price_cents,
    );
    const priceCents = values.price_override_cents
      ? Number(values.price_override_cents)
      : basePriceCents;
    const endTime = addMinutesToTime(values.start_time, totalBlockMinutes);

    const { data: appointment, error: appointmentError } = await supabase
      .from("appointments")
      .insert({
        client_id: clientId,
        booking_request_id: request.id,
        service_id: request.requested_service_id,
        therapist_id: request.requested_therapist_id ?? null,
        appointment_date: values.appointment_date,
        start_time: values.start_time,
        end_time: endTime,
        location_type: values.location_type,
        location_label: values.location_label || null,
        price_cents: priceCents,
        internal_notes: values.internal_notes || null,
      })
      .select("id")
      .single();

    if (appointmentError) {
      throw new Error(appointmentError.message);
    }

    const { error: requestUpdateError } = await supabase
      .from("booking_requests")
      .update({
        client_id: clientId,
        status: "converted",
        reviewed_by: adminUser.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", request.id);

    if (requestUpdateError) {
      throw new Error(requestUpdateError.message);
    }

    revalidatePath("/admin/booking-requests");
    revalidatePath(`/admin/booking-requests/${request.id}`);
    revalidatePath("/admin/appointments");
    revalidatePath(`/admin/appointments/${appointment.id}`);

    return {
      success: true,
      message: "Appointment created.",
      appointmentId: appointment.id,
    };
  } catch {
    return {
      ...defaultActionState,
      message: "Unable to create the appointment right now.",
    };
  }
}

export async function updateAppointmentStatus(input: {
  id: string;
  status: string;
}) {
  const parsed = appointmentStatusUpdateSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error("Invalid appointment status update.");
  }

  if (!hasServiceRoleSupabaseEnv()) {
    throw new Error("Supabase is not connected.");
  }

  await requireApprovedAdminUser();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("appointments")
    .update({
      status: parsed.data.status,
    })
    .eq("id", parsed.data.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/appointments");
  revalidatePath(`/admin/appointments/${parsed.data.id}`);
}

export async function updateAppointmentInternalNotes(input: {
  id: string;
  internal_notes: string;
}) {
  const parsed = appointmentInternalNotesSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error("Invalid appointment notes update.");
  }

  if (!hasServiceRoleSupabaseEnv()) {
    throw new Error("Supabase is not connected.");
  }

  await requireApprovedAdminUser();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("appointments")
    .update({
      internal_notes: parsed.data.internal_notes || null,
    })
    .eq("id", parsed.data.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/appointments");
  revalidatePath(`/admin/appointments/${parsed.data.id}`);
}
