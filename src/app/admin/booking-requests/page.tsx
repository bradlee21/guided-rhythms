import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";
import { BookingRequestList } from "@/components/booking/BookingRequestList";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { listBookingRequests } from "@/server/booking/queries";

export const dynamic = "force-dynamic";

export default async function AdminBookingRequestsPage() {
  const requestsResult = await listBookingRequests();

  return (
    <AdminPageShell
      eyebrow="Admin"
      title="Booking requests"
      description="Review submitted booking requests, check the requested service, and move each request through the initial review statuses."
    >
      {requestsResult.connection === "error" ||
      requestsResult.connection === "not_configured" ? (
        <PlaceholderPanel
          title={
            requestsResult.connection === "not_configured"
              ? "Database not connected"
              : "Unable to load booking requests"
          }
          body={
            requestsResult.message ??
            "Guided Rhythms could not load booking requests right now."
          }
        />
      ) : (
        <BookingRequestList
          requests={requestsResult.data}
          emptyMessage="No booking requests have been submitted yet."
        />
      )}
    </AdminPageShell>
  );
}
