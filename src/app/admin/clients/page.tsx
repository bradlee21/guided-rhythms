import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPlaceholderCard } from "@/components/admin/AdminPlaceholderCard";

export default function AdminClientsPage() {
  return (
    <AdminPageShell
      eyebrow="Admin"
      title="Clients"
      description="This route is reserved for future client records and client-level history across the Guided Rhythms app."
    >
      <AdminPlaceholderCard
        title="Clients scaffold"
        body="Profiles, notes, intake history, and session history will be implemented later."
      />
    </AdminPageShell>
  );
}
