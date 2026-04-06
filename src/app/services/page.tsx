import { PageShell } from "@/components/app/PageShell";
import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";

export default function ServicesPage() {
  return (
    <PageShell
      eyebrow="Services"
      title="Services foundation"
      description="This page is reserved for the Guided Rhythms service catalog and public service details. The route is scaffolded now so pricing, duration, and presentation can be added without reshaping the app later."
    >
      <PlaceholderPanel
        title="What comes next"
        body="Service definitions, durations, pricing presentation, and public-facing descriptions will be added in a later slice. No booking logic is implemented here."
      />
    </PageShell>
  );
}
