import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPlaceholderCard } from "@/components/admin/AdminPlaceholderCard";

export default function AdminAvailabilityPage() {
  return (
    <AdminPageShell
      eyebrow="Admin"
      title="Availability"
      description="This route reserves the future availability and schedule configuration area."
    >
      <AdminPlaceholderCard
        title="Availability scaffold"
        body="Working hours, blackout times, and scheduling rules are not implemented yet."
      />
    </AdminPageShell>
  );
}
