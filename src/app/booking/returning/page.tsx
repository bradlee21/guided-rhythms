import { BookingRequestForm } from "@/components/booking/BookingRequestForm";
import { PageShell } from "@/components/app/PageShell";
import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";
import { listPublicServices } from "@/server/booking/queries";

export const dynamic = "force-dynamic";

export default async function ReturningBookingPage() {
  const servicesResult = await listPublicServices();

  return (
    <PageShell
      eyebrow="Booking"
      title="Returning client request"
      description="Request another session by sharing your preferred service, timing, and anything helpful for review before scheduling."
    >
      {servicesResult.data.length ? (
        <BookingRequestForm mode="returning" services={servicesResult.data} />
      ) : (
        <PlaceholderPanel
          title={
            servicesResult.connection === "connected"
              ? "No services found"
              : "Database not connected"
          }
          body={
            servicesResult.message ??
            "No public services are available to request right now."
          }
        />
      )}
    </PageShell>
  );
}
