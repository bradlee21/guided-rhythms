import { PageShell } from "@/components/app/PageShell";
import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";

export default function BookingSuccessPage() {
  return (
    <PageShell
      eyebrow="Booking"
      title="Booking success"
      description="This page is scaffolded as the future confirmation destination after booking submission. It is intentionally static until booking workflows are built."
    >
      <PlaceholderPanel
        title="Confirmation shell"
        body="Success messaging, appointment details, and any follow-up actions will be added once booking logic exists."
      />
    </PageShell>
  );
}
