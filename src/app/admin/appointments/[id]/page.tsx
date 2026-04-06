import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPlaceholderCard } from "@/components/admin/AdminPlaceholderCard";

export default async function AdminAppointmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AdminPageShell
      eyebrow="Admin"
      title={`Appointment ${id}`}
      description="This detail route is reserved for future appointment review and action handling. No appointment data is loaded yet."
    >
      <AdminPlaceholderCard
        title="Detail shell"
        body="Check-in, charting links, treatment summary, and follow-up actions are deferred."
      />
    </AdminPageShell>
  );
}
