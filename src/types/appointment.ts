import type { IntakeStatus } from "@/types/intake";

export const appointmentStatuses = [
  "pending_confirmation",
  "confirmed",
  "intake_pending",
  "ready_for_visit",
  "arrived",
  "in_session",
  "completed",
  "cancelled",
  "no_show",
  "rescheduled",
] as const;

export const followUpStatuses = [
  "not_needed",
  "planned",
  "sent",
  "responded",
  "rebooked",
  "closed",
] as const;

export const appointmentLocationTypes = ["office", "custom"] as const;

export type AppointmentStatus = (typeof appointmentStatuses)[number];
export type FollowUpStatus = (typeof followUpStatuses)[number];
export type AppointmentLocationType =
  (typeof appointmentLocationTypes)[number];

export type AppointmentRecord = {
  id: string;
  client_id: string;
  booking_request_id: string | null;
  service_id: string;
  therapist_id: string | null;
  status: AppointmentStatus;
  appointment_date: string;
  start_time: string;
  end_time: string;
  timezone: string;
  location_type: AppointmentLocationType;
  location_label: string | null;
  intake_status: IntakeStatus;
  follow_up_status: FollowUpStatus;
  price_cents: number;
  internal_notes: string | null;
  confirmation_sent_at: string | null;
  reminder_sent_at: string | null;
  cancelled_at: string | null;
  cancelled_reason: string | null;
  rescheduled_from_appointment_id: string | null;
  created_at: string;
  updated_at: string;
  client: {
    id: string;
    first_name: string;
    last_name: string;
    preferred_name: string | null;
    email: string;
    phone: string;
  } | null;
  service: {
    id: string;
    name: string;
    slug: string;
    total_block_minutes: number;
    base_price_cents: number;
  } | null;
  booking_request: {
    id: string;
    status: string;
    first_name: string;
    last_name: string;
  } | null;
  intake: {
    id: string;
    status: IntakeStatus;
    completed_at: string | null;
    created_at: string;
  } | null;
};

export type AppointmentListItem = Pick<
  AppointmentRecord,
  "id" | "status" | "appointment_date" | "start_time" | "end_time"
> & {
  client: {
    first_name: string;
    last_name: string;
  } | null;
  service: {
    name: string;
  } | null;
};

export type AppointmentActionState = {
  success: boolean;
  message: string | null;
  appointmentId?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};
