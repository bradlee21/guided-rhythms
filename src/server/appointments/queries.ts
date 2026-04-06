import { createAdminClient } from "@/lib/supabase/admin";
import { hasServiceRoleSupabaseEnv } from "@/lib/supabase/env";
import type {
  AppointmentListItem,
  AppointmentRecord,
} from "@/types/appointment";

export type AppointmentQueryResult<T> = {
  data: T;
  connection: "connected" | "not_configured" | "error";
  message: string | null;
};

function normalizeAppointment(
  row: Record<string, unknown>,
): AppointmentRecord {
  const client =
    row.client && typeof row.client === "object" && !Array.isArray(row.client)
      ? {
          id: String((row.client as Record<string, unknown>).id),
          first_name: String((row.client as Record<string, unknown>).first_name),
          last_name: String((row.client as Record<string, unknown>).last_name),
          preferred_name:
            ((row.client as Record<string, unknown>).preferred_name as string | null) ??
            null,
          email: String((row.client as Record<string, unknown>).email),
          phone: String((row.client as Record<string, unknown>).phone),
        }
      : null;

  const service =
    row.service &&
    typeof row.service === "object" &&
    !Array.isArray(row.service)
      ? {
          id: String((row.service as Record<string, unknown>).id),
          name: String((row.service as Record<string, unknown>).name),
          slug: String((row.service as Record<string, unknown>).slug),
          total_block_minutes: Number(
            (row.service as Record<string, unknown>).total_block_minutes,
          ),
          base_price_cents: Number(
            (row.service as Record<string, unknown>).base_price_cents,
          ),
        }
      : null;

  const bookingRequest =
    row.booking_request &&
    typeof row.booking_request === "object" &&
    !Array.isArray(row.booking_request)
      ? {
          id: String((row.booking_request as Record<string, unknown>).id),
          status: String((row.booking_request as Record<string, unknown>).status),
          first_name: String(
            (row.booking_request as Record<string, unknown>).first_name,
          ),
          last_name: String(
            (row.booking_request as Record<string, unknown>).last_name,
          ),
        }
      : null;

  return {
    id: String(row.id),
    client_id: String(row.client_id),
    booking_request_id: (row.booking_request_id as string | null) ?? null,
    service_id: String(row.service_id),
    therapist_id: (row.therapist_id as string | null) ?? null,
    status: row.status as AppointmentRecord["status"],
    appointment_date: String(row.appointment_date),
    start_time: String(row.start_time).slice(0, 5),
    end_time: String(row.end_time).slice(0, 5),
    timezone: String(row.timezone),
    location_type: row.location_type as AppointmentRecord["location_type"],
    location_label: (row.location_label as string | null) ?? null,
    intake_status: row.intake_status as AppointmentRecord["intake_status"],
    follow_up_status:
      row.follow_up_status as AppointmentRecord["follow_up_status"],
    price_cents: Number(row.price_cents),
    internal_notes: (row.internal_notes as string | null) ?? null,
    confirmation_sent_at:
      (row.confirmation_sent_at as string | null) ?? null,
    reminder_sent_at: (row.reminder_sent_at as string | null) ?? null,
    cancelled_at: (row.cancelled_at as string | null) ?? null,
    cancelled_reason: (row.cancelled_reason as string | null) ?? null,
    rescheduled_from_appointment_id:
      (row.rescheduled_from_appointment_id as string | null) ?? null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
    client,
    service,
    booking_request: bookingRequest,
  };
}

export async function getAppointments() {
  if (!hasServiceRoleSupabaseEnv()) {
    return {
      data: [] satisfies AppointmentListItem[],
      connection: "not_configured",
      message:
        "The appointments area is not connected yet. Add the Supabase URL, anon key, and service-role key.",
    } satisfies AppointmentQueryResult<AppointmentListItem[]>;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("appointments")
      .select(
        "id, status, appointment_date, start_time, end_time, client:clients(first_name,last_name), service:services(name)",
      )
      .order("appointment_date", { ascending: true })
      .order("start_time", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return {
      data: ((data ?? []) as Record<string, unknown>[]).map((row) => ({
        id: String(row.id),
        status: row.status as AppointmentListItem["status"],
        appointment_date: String(row.appointment_date),
        start_time: String(row.start_time).slice(0, 5),
        end_time: String(row.end_time).slice(0, 5),
        client:
          row.client && typeof row.client === "object" && !Array.isArray(row.client)
            ? {
                first_name: String((row.client as Record<string, unknown>).first_name),
                last_name: String((row.client as Record<string, unknown>).last_name),
              }
            : null,
        service:
          row.service &&
          typeof row.service === "object" &&
          !Array.isArray(row.service)
            ? { name: String((row.service as Record<string, unknown>).name) }
            : null,
      })),
      connection: "connected",
      message: null,
    } satisfies AppointmentQueryResult<AppointmentListItem[]>;
  } catch {
    return {
      data: [] satisfies AppointmentListItem[],
      connection: "error",
      message: "Guided Rhythms could not load appointments right now.",
    } satisfies AppointmentQueryResult<AppointmentListItem[]>;
  }
}

export async function getAppointmentById(id: string) {
  if (!hasServiceRoleSupabaseEnv()) {
    return {
      data: null,
      connection: "not_configured",
      message:
        "The appointment detail view is not connected yet. Add the Supabase URL, anon key, and service-role key.",
    } satisfies AppointmentQueryResult<AppointmentRecord | null>;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("appointments")
      .select(
        "id, client_id, booking_request_id, service_id, therapist_id, status, appointment_date, start_time, end_time, timezone, location_type, location_label, intake_status, follow_up_status, price_cents, internal_notes, confirmation_sent_at, reminder_sent_at, cancelled_at, cancelled_reason, rescheduled_from_appointment_id, created_at, updated_at, client:clients(id, first_name, last_name, preferred_name, email, phone), service:services(id, name, slug, total_block_minutes, base_price_cents), booking_request:booking_requests(id, status, first_name, last_name)",
      )
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return {
      data: data ? normalizeAppointment(data as Record<string, unknown>) : null,
      connection: "connected",
      message: null,
    } satisfies AppointmentQueryResult<AppointmentRecord | null>;
  } catch {
    return {
      data: null,
      connection: "error",
      message: "Guided Rhythms could not load this appointment right now.",
    } satisfies AppointmentQueryResult<AppointmentRecord | null>;
  }
}

export async function getAppointmentByBookingRequestId(bookingRequestId: string) {
  if (!hasServiceRoleSupabaseEnv()) {
    return null satisfies AppointmentRecord | null;
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("appointments")
    .select(
      "id, client_id, booking_request_id, service_id, therapist_id, status, appointment_date, start_time, end_time, timezone, location_type, location_label, intake_status, follow_up_status, price_cents, internal_notes, confirmation_sent_at, reminder_sent_at, cancelled_at, cancelled_reason, rescheduled_from_appointment_id, created_at, updated_at, client:clients(id, first_name, last_name, preferred_name, email, phone), service:services(id, name, slug, total_block_minutes, base_price_cents), booking_request:booking_requests(id, status, first_name, last_name)",
    )
    .eq("booking_request_id", bookingRequestId)
    .maybeSingle();

  if (error || !data) {
    return null satisfies AppointmentRecord | null;
  }

  return normalizeAppointment(data as Record<string, unknown>);
}
