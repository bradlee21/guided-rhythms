import { createServiceClient } from "@/lib/supabase/server";
import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import FollowUpQueue from "@/components/admin/FollowUpQueue";

export const dynamic = "force-dynamic";

export default async function FollowUpsPage() {
  const user = await requireApprovedAdminUser();
  const supabase = await createServiceClient();

  const today = new Date().toISOString().split("T")[0];

  const { data: followUps } = await supabase
    .from("follow_ups")
    .select(`
      id,
      type,
      status,
      due_date,
      clients ( id, first_name, last_name, preferred_name, email ),
      appointments ( id, appointment_date, services ( name ) )
    `)
    .eq("therapist_id", user.id)
    .eq("status", "pending")
    .lte("due_date", today)
    .order("due_date", { ascending: true });

  const { data: recentlyCompleted } = await supabase
    .from("appointments")
    .select(`
      id,
      appointment_date,
      clients ( id, first_name, last_name, preferred_name, email ),
      services ( name )
    `)
    .eq("therapist_id", user.id)
    .eq("status", "completed")
    .gte("appointment_date", new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0])
    .order("appointment_date", { ascending: false });

  return (
    <AdminPageShell
      eyebrow="Client care"
      title="Follow-ups"
      description="Post-session check-ins and rebooking nudges."
    >
      <FollowUpQueue
        therapistId={user.id}
        followUps={(followUps ?? []) as any}
        recentlyCompleted={(recentlyCompleted ?? []) as any}
      />
    </AdminPageShell>
  );
}
