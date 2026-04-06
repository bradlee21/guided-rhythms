import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPlaceholderCard } from "@/components/admin/AdminPlaceholderCard";

export default async function AdminSoapAppointmentPage({
  params,
}: {
  params: Promise<{ appointmentId: string }>;
}) {
  const { appointmentId } = await params;

  return (
    <AdminPageShell
      eyebrow="Admin"
      title={`SOAP note for appointment ${appointmentId}`}
      description="This route is reserved for appointment-specific charting. No note creation or editing logic is wired in this slice."
    >
      <AdminPlaceholderCard
        title="Appointment charting shell"
        body="SOAP documentation will be implemented later after appointment workflows and client context exist."
      />
    </AdminPageShell>
  );
}
