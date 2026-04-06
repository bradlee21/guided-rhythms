import { PageShell } from "@/components/app/PageShell";
import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";

export default function ReturningBookingPage() {
  return (
    <PageShell
      eyebrow="Booking"
      title="Returning client booking"
      description="This route will support future returning-client booking. It exists now only as a clean shell so the app structure is ready for the next implementation slice."
    >
      <PlaceholderPanel
        title="Scaffold only"
        body="No booking workflow is implemented yet. This page simply reserves the route and shared visual language for future work."
      />
    </PageShell>
  );
}
