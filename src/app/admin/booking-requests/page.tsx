import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPlaceholderCard } from "@/components/admin/AdminPlaceholderCard";

export default function AdminBookingRequestsPage() {
  return (
    <AdminPageShell
      eyebrow="Admin"
      title="Booking requests"
      description="This route is reserved for reviewing inbound booking requests. No request list, filtering, or decision actions are implemented yet."
    >
      <AdminPlaceholderCard
        title="Workflow deferred"
        body="Booking request intake, review states, and conversion into appointments will be built in a later slice."
      />
    </AdminPageShell>
  );
}
