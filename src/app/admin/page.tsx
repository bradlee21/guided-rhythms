import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPlaceholderCard } from "@/components/admin/AdminPlaceholderCard";

export default function AdminDashboardPage() {
  return (
    <AdminPageShell
      eyebrow="Admin"
      title="Practice app overview"
      description="This dashboard is intentionally light. It establishes the admin shell and route map so future implementation can land in stable sections without revisiting the foundation."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AdminPlaceholderCard
          title="Booking requests"
          body="Pending booking intake and request triage will be implemented in a later slice."
        />
        <AdminPlaceholderCard
          title="Appointments"
          body="Scheduled session management and lifecycle actions are not built yet."
        />
        <AdminPlaceholderCard
          title="Clients"
          body="Client records, visit history, and profile management are reserved for future work."
        />
        <AdminPlaceholderCard
          title="Intakes"
          body="Submitted intake review and status tracking will attach here later."
        />
        <AdminPlaceholderCard
          title="SOAP notes"
          body="Documentation and charting workflows are intentionally deferred in this slice."
        />
        <AdminPlaceholderCard
          title="Follow-ups"
          body="Post-session communication tools will be layered in after the core workflows exist."
        />
      </div>
    </AdminPageShell>
  );
}
