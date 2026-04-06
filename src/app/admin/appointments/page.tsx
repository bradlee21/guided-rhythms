import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPlaceholderCard } from "@/components/admin/AdminPlaceholderCard";

export default function AdminAppointmentsPage() {
  return (
    <AdminPageShell
      eyebrow="Admin"
      title="Appointments"
      description="This route reserves the appointments workspace for the future scheduling and session management workflow."
    >
      <AdminPlaceholderCard
        title="Appointments scaffold"
        body="Calendar views, appointment states, and session actions will be added later."
      />
    </AdminPageShell>
  );
}
