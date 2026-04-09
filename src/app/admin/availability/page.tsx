import { createServiceClient } from "@/lib/supabase/server";
import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import AvailabilityManager from "@/components/admin/AvailabilityManager";

export const dynamic = "force-dynamic";

const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export default async function AvailabilityPage() {
  const user = await requireApprovedAdminUser();
  const supabase = await createServiceClient();

  const { data: schedule } = await supabase
    .from("therapist_schedules")
    .select("*")
    .eq("therapist_id", user.id)
    .order("day_of_week");

  const { data: blocks } = await supabase
    .from("blocked_times")
    .select("*")
    .eq("therapist_id", user.id)
    .gte("blocked_date", new Date().toISOString().split("T")[0])
    .order("blocked_date");

  // Build a full 7-day schedule with defaults
  const fullSchedule = DAYS.map((name, i) => {
    const existing = schedule?.find((s) => s.day_of_week === i);
    return {
      day_of_week: i,
      name,
      is_active: existing?.is_active ?? (i >= 1 && i <= 5),
      start_time: existing?.start_time?.slice(0, 5) ?? "09:00",
      end_time: existing?.end_time?.slice(0, 5) ?? "17:00",
    };
  });

  return (
    <AdminPageShell
      eyebrow="Scheduling"
      title="Availability"
      description="Set your weekly hours and block off time as needed."
    >
      <AvailabilityManager
        therapistId={user.id}
        schedule={fullSchedule}
        blocks={blocks ?? []}
      />
    </AdminPageShell>
  );
}
