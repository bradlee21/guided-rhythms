import { createServiceClient } from "@/lib/supabase/server";
import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { notFound } from "next/navigation";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { createDefaultIntakeValues, getHealthFlags, mapIntakeAnswersToValues } from "@/lib/intake/answers";

export const dynamic = "force-dynamic";

function formatDateTime(iso: string | null) {
  if (!iso) return "Not yet";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

export default async function IntakeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireApprovedAdminUser();
  const supabase = await createServiceClient();

  const { data: intake } = await supabase
    .from("intakes")
    .select(`
      *,
      intake_answers ( * ),
      appointments (
        id,
        appointment_date,
        start_time,
        clients ( * )
      )
    `)
    .eq("id", id)
    .single();

  if (!intake) notFound();

  const appt = intake.appointments as any;
  const client = appt?.clients as any;
  const clientName = client?.preferred_name
    ? `${client.preferred_name} ${client.last_name}`
    : client ? `${client.first_name} ${client.last_name}` : "Unknown";

  const values = mapIntakeAnswersToValues(
    intake.intake_answers ?? [],
    createDefaultIntakeValues(client ?? undefined),
  );
  const healthFlags = getHealthFlags(values);

  const metaRows = [
    { label: "Client", value: clientName },
    { label: "Email", value: client?.email ?? "—" },
    { label: "Phone", value: client?.phone ?? "—" },
    { label: "Status", value: intake.status.replace(/_/g, " ") },
    { label: "Completed", value: formatDateTime(intake.completed_at) },
    { label: "Reviewed", value: formatDateTime(intake.reviewed_at) },
    { label: "Reviewed by", value: intake.reviewed_by ?? "—" },
  ];

  return (
    <AdminPageShell
      eyebrow="Intake review"
      title={clientName}
      description={appt ? `Appointment ${new Date(appt.appointment_date + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}` : "Health history form"}
    >
      <div className="detail-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: "32px", alignItems: "start" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

          {/* Meta */}
          <div style={{ border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden" }}>
            {metaRows.map((row, i) => (
              <div key={row.label} style={{ display: "grid", gridTemplateColumns: "160px 1fr", padding: "14px 24px", borderBottom: i < metaRows.length - 1 ? `1px solid ${brand.border}` : "none", background: i % 2 === 0 ? "#ffffff" : brand.background }}>
                <span style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", paddingTop: "2px" }}>{row.label}</span>
                <span style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Health flags */}
          {healthFlags.length > 0 && (
            <div style={{ padding: "24px", background: "rgba(192,57,43,0.04)", border: "1px solid rgba(192,57,43,0.2)", borderRadius: "2px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#c0392b", fontFamily: "'DM Sans', sans-serif", marginBottom: "16px" }}>
                Health &amp; safety flags
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {healthFlags.map((flag) => (
                  <div key={flag.key} style={{ display: "flex", alignItems: "baseline", gap: "12px", padding: "10px 16px", background: "rgba(255,255,255,0.7)", borderRadius: "2px", border: "1px solid rgba(192,57,43,0.15)" }}>
                    <span style={{ fontSize: "13px", color: "#c0392b", fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>{flag.label}</span>
                    <span style={{ fontSize: "13px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{flag.value.replace(/_/g, " ")}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Intake answers */}
          {(intake.intake_answers?.length ?? 0) > 0 && (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", marginBottom: "16px" }}>
                Form responses
              </h2>
              <div style={{ border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden" }}>
                {intake.intake_answers.map((answer: any, i: number) => (
                  <div key={answer.id} style={{ display: "grid", gridTemplateColumns: "200px 1fr", padding: "14px 24px", borderBottom: i < intake.intake_answers.length - 1 ? `1px solid ${brand.border}` : "none", background: i % 2 === 0 ? "#ffffff" : brand.background }}>
                    <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", paddingTop: "2px", lineHeight: 1.5 }}>{answer.field_label}</span>
                    <span style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>{answer.answer_text || "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {appt && (
            <Link href={`/admin/appointments/${appt.id}`} style={{ display: "block", padding: "16px 20px", background: "#ffffff", border: `1px solid ${brand.borderMed}`, borderRadius: "2px", textDecoration: "none" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "6px" }}>Linked appointment</p>
              <p style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>
                {new Date(appt.appointment_date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
              </p>
            </Link>
          )}
          {intake.status !== "reviewed" && intake.completed_at && (
            <MarkReviewedButton intakeId={id} />
          )}
        </div>
      </div>
    </AdminPageShell>
  );
}

function MarkReviewedButton({ intakeId }: { intakeId: string }) {
  return (
    <form action={async () => {
      "use server";
      const { createServiceClient } = await import("@/lib/supabase/server");
      const supabase = await createServiceClient();
      await supabase
        .from("intakes")
        .update({ status: "reviewed", reviewed_at: new Date().toISOString() })
        .eq("id", intakeId);
      const { revalidatePath } = await import("next/cache");
      revalidatePath(`/admin/intakes/${intakeId}`);
    }}>
      <button type="submit" style={{ width: "100%", padding: "12px 20px", background: brand.forest, color: "#F0EBE0", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: "2px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
        Mark as reviewed
      </button>
    </form>
  );
}
