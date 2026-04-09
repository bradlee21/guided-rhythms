import { createServiceClient } from "@/lib/supabase/server";

export const BUFFER_MINUTES = 30;
export const MAX_SESSIONS_PER_DAY = 4;
export const BUSINESS_START = "09:00";
export const BUSINESS_END = "17:00";

export interface TimeSlot {
  start: string; // "HH:MM"
  end: string;   // "HH:MM"
  available: boolean;
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function slotsOverlap(
  aStart: number, aEnd: number,
  bStart: number, bEnd: number
): boolean {
  return aStart < bEnd && aEnd > bStart;
}

export async function getAvailableSlots(
  therapistId: string,
  date: string, // "YYYY-MM-DD"
  durationMinutes: number
): Promise<TimeSlot[]> {
  const supabase = await createServiceClient();

  // Get day of week (0 = Sunday)
  const dayOfWeek = new Date(date + "T12:00:00").getDay();

  // Check therapist schedule for this day
  const { data: schedule } = await supabase
    .from("therapist_schedules")
    .select("start_time, end_time, is_active")
    .eq("therapist_id", therapistId)
    .eq("day_of_week", dayOfWeek)
    .eq("is_active", true)
    .single();

  // Use schedule hours if set, otherwise fall back to business hours
  const dayStart = schedule ? schedule.start_time.slice(0, 5) : BUSINESS_START;
  const dayEnd = schedule ? schedule.end_time.slice(0, 5) : BUSINESS_END;

  // Get blocked times for this day
  const { data: blocks } = await supabase
    .from("blocked_times")
    .select("start_time, end_time, is_full_day")
    .eq("therapist_id", therapistId)
    .eq("blocked_date", date);

  // If any full-day block exists, return empty
  if (blocks?.some((b) => b.is_full_day)) return [];

  // Get existing appointments for this day
  const { data: existing } = await supabase
    .from("appointments")
    .select("start_time, end_time")
    .eq("therapist_id", therapistId)
    .eq("appointment_date", date)
    .not("status", "in", '("cancelled","no_show")');

  // Enforce max sessions per day
  if ((existing?.length ?? 0) >= MAX_SESSIONS_PER_DAY) return [];

  // Build occupied ranges (appointments + buffers + blocks)
  const occupied: Array<{ start: number; end: number }> = [];

  for (const appt of existing ?? []) {
    const s = timeToMinutes(appt.start_time.slice(0, 5));
    const e = timeToMinutes(appt.end_time.slice(0, 5));
    // Add buffer before and after
    occupied.push({ start: s - BUFFER_MINUTES, end: e + BUFFER_MINUTES });
  }

  for (const block of blocks ?? []) {
    if (!block.is_full_day) {
      occupied.push({
        start: timeToMinutes(block.start_time.slice(0, 5)),
        end: timeToMinutes(block.end_time.slice(0, 5)),
      });
    }
  }

  // Generate candidate slots every 30 minutes
  const slots: TimeSlot[] = [];
  const startMins = timeToMinutes(dayStart);
  const endMins = timeToMinutes(dayEnd);
  const totalMins = durationMinutes + BUFFER_MINUTES;

  for (let t = startMins; t + totalMins <= endMins; t += 30) {
    const slotEnd = t + durationMinutes;
    const slotWithBuffer = t + totalMins;

    const blocked = occupied.some((o) =>
      slotsOverlap(t, slotWithBuffer, o.start, o.end)
    );

    // Don't offer more slots if already at max - 1
    // (the current loop iteration would be the next booking)
    const wouldExceedMax = (existing?.length ?? 0) >= MAX_SESSIONS_PER_DAY;

    slots.push({
      start: minutesToTime(t),
      end: minutesToTime(slotEnd),
      available: !blocked && !wouldExceedMax,
    });
  }

  return slots;
}

export async function getTherapists() {
  const supabase = await createServiceClient();
  const { data } = await supabase
    .from("therapists")
    .select("id, full_name, email, bio, specialty, display_order")
    .eq("is_active", true)
    .order("display_order");
  return data ?? [];
}

export async function seedDefaultSchedule(therapistId: string) {
  const supabase = await createServiceClient();
  // Mon–Fri (1–5), 9am–5pm
  const days = [1, 2, 3, 4, 5];
  const rows = days.map((day) => ({
    therapist_id: therapistId,
    day_of_week: day,
    start_time: "09:00",
    end_time: "17:00",
    is_active: true,
  }));

  const { error } = await supabase
    .from("therapist_schedules")
    .upsert(rows, { onConflict: "therapist_id,day_of_week" });

  return error;
}
