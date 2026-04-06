import { BookingRequestList } from "@/components/booking/BookingRequestList";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { listBookingRequests } from "@/server/booking/queries";

export const dynamic = "force-dynamic";

export default async function AdminBookingRequestsPage() {
  const requests = await listBookingRequests();

  return (
    <AdminPageShell
      eyebrow="Admin"
      title="Booking requests"
      description="Review submitted booking requests, check the requested service, and move each request through the initial review statuses."
    >
      <BookingRequestList requests={requests} />
    </AdminPageShell>
  );
}
