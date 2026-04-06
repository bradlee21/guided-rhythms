import { BookingRequestForm } from "@/components/booking/BookingRequestForm";
import { PageShell } from "@/components/app/PageShell";
import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";
import { listPublicServices } from "@/server/booking/queries";

export const dynamic = "force-dynamic";

export default async function NewBookingPage() {
  const servicesResult = await listPublicServices();

  return (
    <PageShell
      eyebrow="Booking"
      title="New client request"
      description="Share the service you want, the dates that work best, and the context that will help Guided Rhythms review your first booking request."
    >
      {servicesResult.data.length ? (
        <BookingRequestForm mode="new" services={servicesResult.data} />
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
