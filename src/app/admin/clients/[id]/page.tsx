import { createServiceClient } from "@/lib/supabase/server";
import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { notFound } from "next/navigation";
import Link from "next/link";
import { brand } from "@/lib/brand";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", year: "numeric",
  });
}

function formatTime(t: string) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
}

const statusColor: Record<string, string> = {
  pending_confirmation: "#C8881A",
  confirmed: "#2E4A30",
  completed: "#6F8F55",
  cancelled: "#9A8A72",
  no_show: "#c0392b",
};

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireApprovedAdminUser();
  const supabase = await createServiceClient();

  const { data: client } = await supabase
    .from("clients")
    .select(`
      *,
      appointments (
        id,
        appointment_date,
        start_time,
        end_time,
        status,
        services ( name ),
        soap_notes ( id )
      ),
      intakes (
        id,
        status,
        completed_at,
        intake_answers ( field_key, field_label, answer_text )
      )
    `)
    .eq("id", id)
    .single();

  if (!client) notFound();

  const displayName = client.preferred_name
    ? `${client.preferred_name} ${client.last_name}`
    : `${client.first_name} ${client.last_name}`;

  const appointments = [...(client.appointments ?? [])].sort(
    (a: any, b: any) => b.appointment_date.localeCompare(a.appointment_date)
  );

  const latestIntake = client.intakes?.[0] ?? null;

  const infoRows = [
    { label: "Legal name", value: `${client.first_name} ${client.last_name}` },
    { label: "Preferred name", value: client.preferred_name ?? "—" },
    { label: "Email", value: client.email },
    { label: "Phone", value: client.phone ?? "—" },
    { label: "Date of birth", value: client.date_of_birth ?? "—" },
    { label: "Pronouns", value: client.pronouns ?? "—" },
    { label: "Emergency contact", value: client.emergency_contact_name ? `${client.emergency_contact_name} · ${client.emergency_contact_phone ?? ""}` : "—" },
    { label: "Referral source", value: client.referral_source ?? "—" },
    { label: "Member since", value: new Date(client.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
  ];

  return (
    <AdminPageShell
      eyebrow="Client profile"
      title={displayName}
      description={client.email}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>

        {/* Left — client info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Info table */}
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", marginBottom: "16px" }}>
              Profile
            </h2>
            <div style={{ border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden" }}>
              {infoRows.map((row, i) => (
                <div key={row.label} style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr",
                  padding: "12px 20px",
                  borderBottom: i < infoRows.length - 1 ? `1px solid ${brand.border}` : "none",
                  background: i % 2 === 0 ? "#ffffff" : brand.background,
                }}>
                  <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", paddingTop: "2px" }}>
                    {row.label}
                  </span>
                  <span style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Intake summary */}
          {latestIntake && (
            <div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "16px" }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em" }}>
                  Intake form
                </h2>
                <Link href={`/admin/intakes/${latestIntake.id}`} style={{ fontSize: "13px", color: brand.gold, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>
                  View full intake →
                </Link>
              </div>
              <div style={{ border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden" }}>
                {(latestIntake.intake_answers ?? []).slice(0, 6).map((answer: any, i: number) => (
                  <div key={answer.field_key} style={{
                    display: "grid",
                    gridTemplateColumns: "160px 1fr",
                    padding: "12px 20px",
                    borderBottom: i < Math.min(latestIntake.intake_answers.length, 6) - 1 ? `1px solid ${brand.border}` : "none",
                    background: i % 2 === 0 ? "#ffffff" : brand.background,
                  }}>
                    <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", paddingTop: "2px" }}>
                      {answer.field_label}
                    </span>
                    <span style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
                      {answer.answer_text || "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — appointment history */}
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Session history
          </h2>
          {appointments.length === 0 ? (
            <div style={{ padding: "32px", textAlign: "center", border: `1px solid ${brand.border}`, borderRadius: "2px", color: brand.textSoft, fontSize: "14px", fontFamily: "'DM Sans', sans-serif", background: brand.backgroundSoft }}>
              No sessions yet.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0", border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden" }}>
              {appointments.map((appt: any, i: number) => {
                const hasSoap = appt.soap_notes?.length > 0;
                return (
                  <div key={appt.id} style={{
                    padding: "16px 20px",
                    borderBottom: i < appointments.length - 1 ? `1px solid ${brand.border}` : "none",
                    background: i % 2 === 0 ? "#ffffff" : brand.background,
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                    gap: "12px",
                  }}>
                    <div>
                      <div style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif", marginBottom: "4px" }}>
                        {formatDate(appt.appointment_date)} · {formatTime(appt.start_time)}
                      </div>
                      <div style={{ fontSize: "13px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                        {appt.services?.name ?? "—"}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: statusColor[appt.status] ?? brand.textSoft,
                        fontFamily: "'DM Sans', sans-serif",
                      }}>
                        {appt.status.replace(/_/g, " ")}
                      </span>
                      {hasSoap && (
                        <Link href={`/admin/soap/${appt.id}`} style={{
                          fontSize: "12px",
                          padding: "4px 12px",
                          border: `1px solid ${brand.borderMed}`,
                          color: brand.textMuted,
                          borderRadius: "2px",
                          textDecoration: "none",
                          fontFamily: "'DM Sans', sans-serif",
                        }}>
                          Notes
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AdminPageShell>
  );
}
