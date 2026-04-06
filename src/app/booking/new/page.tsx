import { PageShell } from "@/components/app/PageShell";
import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";

export default function NewBookingPage() {
  return (
    <PageShell
      eyebrow="Booking"
      title="New client booking"
      description="This route is reserved for the future new-client booking flow. Intake, appointment selection, and submission logic are intentionally deferred."
    >
      <PlaceholderPanel
        title="Scaffold only"
        body="The URL, page shell, and visual foundation are in place. The actual new-client workflow will be implemented in a later slice."
      />
    </PageShell>
  );
}
