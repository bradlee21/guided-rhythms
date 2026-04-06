import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPlaceholderCard } from "@/components/admin/AdminPlaceholderCard";

export default function AdminSettingsPage() {
  return (
    <AdminPageShell
      eyebrow="Admin"
      title="Settings"
      description="This route is reserved for future app-level and practice-level configuration."
    >
      <AdminPlaceholderCard
        title="Settings scaffold"
        body="Environment-driven settings, preferences, and practice configuration will be added in a later slice."
      />
    </AdminPageShell>
  );
}
