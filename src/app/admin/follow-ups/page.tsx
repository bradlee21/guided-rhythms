import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPlaceholderCard } from "@/components/admin/AdminPlaceholderCard";

export default function AdminFollowUpsPage() {
  return (
    <AdminPageShell
      eyebrow="Admin"
      title="Follow-ups"
      description="This route reserves the follow-up workspace for future post-session communication and client outreach."
    >
      <AdminPlaceholderCard
        title="Follow-up scaffold"
        body="Message drafting, sending, scheduling, and tracking remain unimplemented in this foundation slice."
      />
    </AdminPageShell>
  );
}
