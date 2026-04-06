import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AppointmentList } from "@/components/appointments/AppointmentList";
import { getAppointments } from "@/server/appointments/queries";

export const dynamic = "force-dynamic";

export default async function AdminAppointmentsPage() {
  const appointmentsResult = await getAppointments();

  return (
    <AdminPageShell
      eyebrow="Admin"
      title="Appointments"
      description="Review scheduled appointments created from approved booking requests and manage their current visit status."
    >
      {appointmentsResult.connection === "connected" ? (
        <AppointmentList appointments={appointmentsResult.data} />
      ) : (
        <PlaceholderPanel
          title={
            appointmentsResult.connection === "not_configured"
              ? "Database not connected"
              : "Unable to load appointments"
          }
          body={
            appointmentsResult.message ??
            "Guided Rhythms could not load appointments right now."
          }
        />
      )}
    </AdminPageShell>
  );
}
