import { PageShell } from "@/components/app/PageShell";
import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";

export default async function IntakeTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <PageShell
      eyebrow="Intake"
      title="Intake link"
      description="This route is reserved for secure intake access. The tokenized URL is scaffolded now so the later intake workflow can attach to a stable route."
    >
      <PlaceholderPanel
        title="Token route reserved"
        body={`Captured intake token: ${token}. Form rendering, validation, and submission are intentionally not implemented in this foundation slice.`}
      />
    </PageShell>
  );
}
