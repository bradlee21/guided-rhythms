import { PageShell } from "@/components/app/PageShell";
import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";

export default function FormsCompletedPage() {
  return (
    <PageShell
      eyebrow="Forms"
      title="Forms completed"
      description="This route is scaffolded for future confirmation after intake or related forms are submitted. It currently exists only as a clean placeholder destination."
    >
      <PlaceholderPanel
        title="Completion shell"
        body="Future intake completion messaging and next-step guidance will be added here after forms are implemented."
      />
    </PageShell>
  );
}
