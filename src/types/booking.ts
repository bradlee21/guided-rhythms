export const bookingRequestStatuses = [
  "submitted",
  "under_review",
  "approved",
  "declined",
  "expired",
  "converted",
] as const;

export type BookingRequestStatus = (typeof bookingRequestStatuses)[number];

export const bookingPreferredDayOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const bookingPreferredTimeOptions = [
  "Morning",
  "Afternoon",
  "Evening",
] as const;

export type BookingPreferredDay = (typeof bookingPreferredDayOptions)[number];
export type BookingPreferredTime = (typeof bookingPreferredTimeOptions)[number];

export type BookingFormMode = "new" | "returning";

export type BookingService = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  hands_on_minutes: number;
  intake_minutes: number;
  buffer_minutes: number;
  total_block_minutes: number;
  base_price_cents: number;
};

export type BookingRequestRecord = {
  id: string;
  client_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_new_client: boolean;
  requested_service_id: string | null;
  requested_therapist_id: string | null;
  preferred_days: string[] | null;
  preferred_times: string[] | null;
  preferred_date_1: string | null;
  preferred_date_2: string | null;
  preferred_date_3: string | null;
  pain_points: string | null;
  goals: string | null;
  referral_source: string | null;
  notes: string | null;
  status: BookingRequestStatus;
  admin_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
  requested_service: BookingService | null;
};

export type BookingRequestListItem = Pick<
  BookingRequestRecord,
  "id" | "first_name" | "last_name" | "is_new_client" | "status" | "created_at"
> & {
  requested_service: Pick<BookingService, "name" | "slug"> | null;
};

export type BookingFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  requested_service_id: string;
  preferred_date_1: string;
  preferred_date_2: string;
  preferred_date_3: string;
  preferred_days: BookingPreferredDay[];
  preferred_times: BookingPreferredTime[];
  pain_points: string;
  goals: string;
  referral_source: string;
  notes: string;
  is_new_client: boolean;
};

export type BookingActionState = {
  success: boolean;
  message: string | null;
  requestId?: string;
  fieldErrors?: Partial<Record<keyof BookingFormValues, string[]>>;
};
