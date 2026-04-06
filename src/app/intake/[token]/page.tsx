import { PageShell } from "@/components/app/PageShell";
import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";
import { IntakeForm } from "@/components/intake/IntakeForm";
import { IntakeSummary } from "@/components/intake/IntakeSummary";
import { mapIntakeAnswersToValues, createDefaultIntakeValues } from "@/lib/intake/answers";
import { getIntakeByToken } from "@/server/intakes/queries";

export const dynamic = "force-dynamic";

export default async function IntakeTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const result = await getIntakeByToken(token);

  if (result.state !== "connected") {
    return (
      <PageShell
        eyebrow="Intake"
        title="Intake form"
        description="This secure link is tied to one intake and appointment context."
      >
        <PlaceholderPanel
          title={
            result.state === "expired"
              ? "Intake link expired"
              : result.state === "not_configured"
                ? "Secure intake access not configured"
                : "Invalid intake link"
          }
          body={result.message}
        />
      </PageShell>
    );
  }

  const { intake, formValues } = result;
  const isLocked = intake.status === "completed" || intake.status === "reviewed";

  return (
    <PageShell
      eyebrow="Intake"
      title="Guided intake"
      description="A calm, step-by-step intake that helps Guided Rhythms understand your needs before the session."
    >
      {isLocked ? (
        <div className="space-y-6">
          <PlaceholderPanel
            title="Intake already submitted"
            body="This intake has already been completed. If something important has changed, please contact Guided Rhythms before your appointment."
          />
          <IntakeSummary
            values={mapIntakeAnswersToValues(
              intake.answers,
              createDefaultIntakeValues(intake.client ?? undefined),
            )}
          />
        </div>
      ) : (
        <IntakeForm intake={intake} defaultValues={formValues} />
      )}
    </PageShell>
  );
}
