import Link from "next/link";
import { notFound } from "next/navigation";

import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminIntakeActions } from "@/components/intake/AdminIntakeActions";
import { IntakeStatusBadge } from "@/components/intake/IntakeStatusBadge";
import { IntakeSummary } from "@/components/intake/IntakeSummary";
import { brand } from "@/lib/brand";
import { formatDateOnly } from "@/lib/dates";
import { createDefaultIntakeValues, getHealthFlags, mapIntakeAnswersToValues } from "@/lib/intake/answers";
import { getIntakeById } from "@/server/intakes/queries";

export const dynamic = "force-dynamic";

function formatDateTime(value: string | null) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function AdminIntakeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getIntakeById(id);

  if (result.connection === "connected" && !result.data) {
    notFound();
  }

  if (result.connection !== "connected") {
    return (
      <AdminPageShell eyebrow="Admin" title="Intake" description="The detail route is in place, but the intake could not be loaded from Supabase.">
        <PlaceholderPanel
          title={
            result.connection === "not_configured"
              ? "Database not connected"
              : "Unable to load intake"
          }
          body={result.message ?? "Guided Rhythms could not load this intake right now."}
        />
      </AdminPageShell>
    );
  }

  if (!result.data) {
    notFound();
  }

  const intake = result.data;
  const values = mapIntakeAnswersToValues(
    intake.answers,
    createDefaultIntakeValues(intake.client ?? undefined),
  );
  const healthFlags = getHealthFlags(values);

  return (
    <AdminPageShell
      eyebrow="Admin"
      title={`${intake.client?.preferred_name || intake.client?.first_name || "Intake"} ${intake.client?.last_name || ""}`.trim()}
      description="Review the submitted intake, scan for health and safety flags, and mark it reviewed when it is ready for the session."
    >
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <section className="rounded-[1.75rem] p-6" style={{ backgroundColor: "rgba(255,255,255,0.7)", border: `1px solid ${brand.border}` }}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.22em]" style={{ color: brand.secondary }}>
                  Intake overview
                </p>
                <p className="mt-3 text-sm leading-6" style={{ color: brand.textMuted }}>
                  Appointment {intake.appointment ? `${formatDateOnly(intake.appointment.appointment_date)} at ${intake.appointment.start_time}` : "not available"}
                </p>
              </div>
              <IntakeStatusBadge status={intake.status} />
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.22em]" style={{ color: brand.secondary }}>Completed</p>
                <p className="mt-2 text-base leading-7" style={{ color: brand.textMuted }}>{formatDateTime(intake.completed_at)}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.22em]" style={{ color: brand.secondary }}>Reviewed</p>
                <p className="mt-2 text-base leading-7" style={{ color: brand.textMuted }}>{formatDateTime(intake.reviewed_at)}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.22em]" style={{ color: brand.secondary }}>Reviewed by</p>
                <p className="mt-2 text-base leading-7" style={{ color: brand.textMuted }}>{intake.reviewed_by || "Not reviewed yet"}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.22em]" style={{ color: brand.secondary }}>Appointment</p>
                {intake.appointment ? (
                  <Link href={`/admin/appointments/${intake.appointment.id}`} className="mt-2 inline-flex text-sm font-semibold" style={{ color: brand.primary }}>
                    Open appointment
                  </Link>
                ) : (
                  <p className="mt-2 text-base leading-7" style={{ color: brand.textMuted }}>Not linked</p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-[1.75rem] p-6" style={{ backgroundColor: "rgba(255,255,255,0.68)", border: `1px solid ${brand.border}` }}>
            <p className="text-sm uppercase tracking-[0.22em]" style={{ color: brand.secondary }}>
              Health and safety flags
            </p>
            {healthFlags.length ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {healthFlags.map((flag) => (
                  <span
                    key={flag.key}
                    className="rounded-full px-4 py-2 text-sm"
                    style={{ backgroundColor: "rgba(255,245,234,0.9)", border: `1px solid ${brand.border}` }}
                  >
                    {flag.label}: {flag.value.replaceAll("_", " ")}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6" style={{ color: brand.textMuted }}>
                No obvious health and safety flags were identified from the submitted answers.
              </p>
            )}
          </section>

          <IntakeSummary values={values} />
        </div>

        <div className="space-y-6">
          <AdminIntakeActions id={intake.id} status={intake.status} />
        </div>
      </section>
    </AdminPageShell>
  );
}
