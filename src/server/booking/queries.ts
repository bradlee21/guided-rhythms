import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import type {
  BookingRequestListItem,
  BookingRequestRecord,
  BookingService,
} from "@/types/booking";

function normalizeService(row: Record<string, unknown>): BookingService {
  return {
    id: String(row.id),
    name: String(row.name),
    slug: String(row.slug),
    category: String(row.category),
    description: String(row.description),
    hands_on_minutes: Number(row.hands_on_minutes),
    intake_minutes: Number(row.intake_minutes),
    buffer_minutes: Number(row.buffer_minutes),
    total_block_minutes: Number(row.total_block_minutes),
    base_price_cents: Number(row.base_price_cents),
  };
}

function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return null;
  }

  return value.filter((item): item is string => typeof item === "string");
}

export async function listPublicServices() {
  if (!hasSupabaseEnv()) {
    return [] satisfies BookingService[];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select(
      "id, name, slug, category, description, hands_on_minutes, intake_minutes, buffer_minutes, total_block_minutes, base_price_cents",
    )
    .eq("is_active", true)
    .eq("is_public", true)
    .order("sort_order", { ascending: true })
    .order("hands_on_minutes", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) =>
    normalizeService(row as Record<string, unknown>),
  );
}

export async function listBookingRequests() {
  if (!hasSupabaseEnv()) {
    return [] satisfies BookingRequestListItem[];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("booking_requests")
    .select(
      "id, first_name, last_name, is_new_client, status, created_at, requested_service:services(name, slug)",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as Record<string, unknown>[]).map((row) => ({
    id: String(row.id),
    first_name: String(row.first_name),
    last_name: String(row.last_name),
    is_new_client: Boolean(row.is_new_client),
    status: row.status as BookingRequestListItem["status"],
    created_at: String(row.created_at),
    requested_service:
      row.requested_service &&
      typeof row.requested_service === "object" &&
      !Array.isArray(row.requested_service)
        ? {
            name: String((row.requested_service as Record<string, unknown>).name),
            slug: String((row.requested_service as Record<string, unknown>).slug),
          }
        : null,
  }));
}

export async function getBookingRequestById(id: string) {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("booking_requests")
    .select(
      "id, client_id, first_name, last_name, email, phone, is_new_client, requested_service_id, requested_therapist_id, preferred_days, preferred_times, preferred_date_1, preferred_date_2, preferred_date_3, pain_points, goals, referral_source, notes, status, admin_notes, reviewed_by, reviewed_at, created_at, updated_at, requested_service:services(id, name, slug, category, description, hands_on_minutes, intake_minutes, buffer_minutes, total_block_minutes, base_price_cents)",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null satisfies BookingRequestRecord | null;
  }

  const row = data as Record<string, unknown>;

  return {
    id: String(row.id),
    client_id: (row.client_id as string | null) ?? null,
    first_name: String(row.first_name),
    last_name: String(row.last_name),
    email: String(row.email),
    phone: String(row.phone),
    is_new_client: Boolean(row.is_new_client),
    requested_service_id: (row.requested_service_id as string | null) ?? null,
    requested_therapist_id:
      (row.requested_therapist_id as string | null) ?? null,
    preferred_days: normalizeStringArray(row.preferred_days),
    preferred_times: normalizeStringArray(row.preferred_times),
    preferred_date_1: (row.preferred_date_1 as string | null) ?? null,
    preferred_date_2: (row.preferred_date_2 as string | null) ?? null,
    preferred_date_3: (row.preferred_date_3 as string | null) ?? null,
    pain_points: (row.pain_points as string | null) ?? null,
    goals: (row.goals as string | null) ?? null,
    referral_source: (row.referral_source as string | null) ?? null,
    notes: (row.notes as string | null) ?? null,
    status: row.status as BookingRequestRecord["status"],
    admin_notes: (row.admin_notes as string | null) ?? null,
    reviewed_by: (row.reviewed_by as string | null) ?? null,
    reviewed_at: (row.reviewed_at as string | null) ?? null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
    requested_service:
      row.requested_service &&
      typeof row.requested_service === "object" &&
      !Array.isArray(row.requested_service)
        ? normalizeService(row.requested_service as Record<string, unknown>)
        : null,
  } satisfies BookingRequestRecord;
}
