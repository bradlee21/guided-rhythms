"use server";

import { revalidatePath } from "next/cache";

import { createAdminClient } from "@/lib/supabase/admin";
import { hasServiceRoleSupabaseEnv } from "@/lib/supabase/env";
import {
  bookingRequestAdminNotesSchema,
  bookingRequestSchema,
  bookingRequestStatusSchema,
} from "@/lib/validators/booking";
import type { BookingActionState } from "@/types/booking";

const defaultActionState: BookingActionState = {
  success: false,
  message: null,
};

function formDataToBookingValues(formData: FormData) {
  return {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    requested_service_id: formData.get("requested_service_id"),
    preferred_date_1: formData.get("preferred_date_1"),
    preferred_date_2: formData.get("preferred_date_2"),
    preferred_date_3: formData.get("preferred_date_3"),
    preferred_days: formData.getAll("preferred_days"),
    preferred_times: formData.getAll("preferred_times"),
    pain_points: formData.get("pain_points"),
    goals: formData.get("goals"),
    referral_source: formData.get("referral_source"),
    notes: formData.get("notes"),
    is_new_client: formData.get("is_new_client") === "true",
  };
}

export async function createBookingRequest(
  _previousState: BookingActionState,
  formData: FormData,
): Promise<BookingActionState> {
  const parsed = bookingRequestSchema.safeParse(formDataToBookingValues(formData));

  if (!parsed.success) {
    return {
      ...defaultActionState,
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    } satisfies BookingActionState;
  }

  if (!hasServiceRoleSupabaseEnv()) {
    return {
      ...defaultActionState,
      message:
        "The database is not connected yet. Add the Supabase URL, anon key, and service-role key.",
    } satisfies BookingActionState;
  }

  const supabase = createAdminClient();
  const values = parsed.data;

  try {
    const { data: existingClient } = await supabase
      .from("clients")
      .select("id")
      .ilike("email", values.email)
      .limit(1)
      .maybeSingle();

    const { data, error } = await supabase
      .from("booking_requests")
      .insert({
        client_id: existingClient?.id ?? null,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: values.phone,
        is_new_client: values.is_new_client,
        requested_service_id: values.requested_service_id,
        preferred_days: values.preferred_days.length
          ? values.preferred_days
          : null,
        preferred_times: values.preferred_times.length
          ? values.preferred_times
          : null,
        preferred_date_1: values.preferred_date_1 || null,
        preferred_date_2: values.preferred_date_2 || null,
        preferred_date_3: values.preferred_date_3 || null,
        pain_points: values.pain_points || null,
        goals: values.goals || null,
        referral_source: values.referral_source || null,
        notes: values.notes || null,
      })
      .select("id")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/admin/booking-requests");

    return {
      success: true,
      message: "Your request has been submitted.",
      requestId: data.id,
    } satisfies BookingActionState;
  } catch {
    return {
      ...defaultActionState,
      message: "Unable to submit the booking request right now.",
    } satisfies BookingActionState;
  }
}

export async function updateBookingRequestStatus(input: {
  id: string;
  status: string;
}) {
  const parsed = bookingRequestStatusSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error("Invalid booking request status update.");
  }

  if (!hasServiceRoleSupabaseEnv()) {
    throw new Error("Supabase is not connected.");
  }

  const supabase = createAdminClient();

  const { error } = await supabase
    .from("booking_requests")
    .update({
      status: parsed.data.status,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", parsed.data.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/booking-requests");
  revalidatePath(`/admin/booking-requests/${parsed.data.id}`);
}

export async function updateBookingRequestAdminNotes(input: {
  id: string;
  admin_notes: string;
}) {
  const parsed = bookingRequestAdminNotesSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error("Invalid admin notes update.");
  }

  if (!hasServiceRoleSupabaseEnv()) {
    throw new Error("Supabase is not connected.");
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("booking_requests")
    .update({
      admin_notes: parsed.data.admin_notes || null,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", parsed.data.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/booking-requests");
  revalidatePath(`/admin/booking-requests/${parsed.data.id}`);
}
