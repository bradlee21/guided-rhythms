import { BookingRequestForm } from "@/components/booking/BookingRequestForm";
import { PageShell } from "@/components/app/PageShell";
import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";
import { listPublicServices } from "@/server/booking/queries";

export const dynamic = "force-dynamic";

export default async function ReturningBookingPage() {
  const services = await listPublicServices();

  return (
    <PageShell
      eyebrow="Booking"
      title="Returning client request"
      description="Request another session by sharing your preferred service, timing, and anything helpful for review before scheduling."
    >
      {services.length ? (
        <BookingRequestForm mode="returning" services={services} />
      ) : (
        <PlaceholderPanel
          title="Services not available yet"
          body="No public services are available to request right now. Seed the services table and confirm Supabase environment variables are configured."
        />
      )}
    </PageShell>
  );
}
