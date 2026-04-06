import { BookingRequestForm } from "@/components/booking/BookingRequestForm";
import { PageShell } from "@/components/app/PageShell";
import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";
import { listPublicServices } from "@/server/booking/queries";

export const dynamic = "force-dynamic";

export default async function NewBookingPage() {
  const services = await listPublicServices();

  return (
    <PageShell
      eyebrow="Booking"
      title="New client request"
      description="Share the service you want, the dates that work best, and the context that will help Guided Rhythms review your first booking request."
    >
      {services.length ? (
        <BookingRequestForm mode="new" services={services} />
      ) : (
        <PlaceholderPanel
          title="Services not available yet"
          body="No public services are available to request right now. Seed the services table and confirm Supabase environment variables are configured."
        />
      )}
    </PageShell>
  );
}
