import { createServiceClient } from "@/lib/supabase/server";
import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { notFound } from "next/navigation";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { createIntakeToken, getIntakeTokenPath } from "@/lib/intake/token";
import { hasIntakeTokenSecret } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

function formatTime(t: string) {
  if (!t) return "—";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
}

function formatDateTime(iso: string | null) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

function formatCents(cents: number | null) {
  if (!cents) return "—";
  return `$${(cents / 100).toFixed(0)}`;
}

const statusColor: Record<string, string> = {
  pending_confirmation: "#C8881A",
  confirmed: "#2E4A30",
  intake_pending: "#C8881A",
  ready_for_visit: "#6F8F55",
  arrived: "#446E49",
  in_session: "#2E4A30",
  completed: "#6F8F55",
  cancelled: "#9A8A72",
  no_show: "#c0392b",
};

export default async function AppointmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireApprovedAdminUser();
  const supabase = await createServiceClient();

  const { data: appt } = await supabase
    .from("appointments")
    .select(`
      *,
      clients ( * ),
      services ( * ),
      intakes ( id, status, completed_at, reviewed_at, created_at ),
      soap_notes ( id )
    `)
    .eq("id", id)
    .eq("therapist_id", user.id)
    .single();

  if (!appt) notFound();

  const client = appt.clients as any;
  const service = appt.services as any;
  // intakes has a unique constraint on appointment_id, so PostgREST returns an object, not an array
  const intake = (appt.intakes as any) ?? null;
  const hasSoap = ((appt.soap_notes as any)?.length ?? 0) > 0;
  const clientName = client?.preferred_name
    ? `${client.preferred_name} ${client.last_name}`
    : client ? `${client.first_name} ${client.last_name}` : "Unknown";

  const intakeLink = intake && hasIntakeTokenSecret()
    ? getIntakeTokenPath(createIntakeToken({ intakeId: intake.id, appointmentId: appt.id, createdAt: intake.created_at }))
    : null;

  const infoRows = [
    { label: "Client", value: clientName },
    { label: "Email", value: client?.email ?? "—" },
    { label: "Phone", value: client?.phone ?? "—" },
    { label: "Service", value: service?.name ?? "—" },
    { label: "Date", value: formatDate(appt.appointment_date) },
    { label: "Time", value: `${formatTime(appt.start_time)} – ${formatTime(appt.end_time)}` },
    { label: "Price", value: formatCents(appt.price_cents) },
    { label: "Status", value: appt.status.replace(/_/g, " ") },
    { label: "Intake status", value: appt.intake_status?.replace(/_/g, " ") ?? "—" },
    { label: "Created", value: formatDateTime(appt.created_at) },
  ];

  return (
    <AdminPageShell
      eyebrow="Appointment"
      title={clientName}
      description={`${service?.name ?? "Session"} · ${formatDate(appt.appointment_date)}`}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "32px", alignItems: "start" }}>

        {/* Main detail */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden" }}>
            {infoRows.map((row, i) => (
              <div key={row.label} style={{ display: "grid", gridTemplateColumns: "180px 1fr", padding: "14px 24px", borderBottom: i < infoRows.length - 1 ? `1px solid ${brand.border}` : "none", background: i % 2 === 0 ? "#ffffff" : brand.background }}>
                <span style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", paddingTop: "2px" }}>{row.label}</span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: row.label === "Status" ? (statusColor[appt.status] ?? brand.text) : brand.text,
                  textTransform: row.label === "Status" ? "uppercase" : "none",
                  letterSpacing: row.label === "Status" ? "0.08em" : "normal",
                  fontSize: row.label === "Status" ? "11px" : "14px",
                }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Action links */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {intake && (
              <Link href={`/admin/intakes/${intake.id}`} style={{ padding: "10px 20px", border: `1px solid ${brand.borderMed}`, borderRadius: "2px", fontSize: "12px", color: brand.textMuted, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>
                View intake
              </Link>
            )}
            {intakeLink && (
              <Link href={intakeLink} style={{ padding: "10px 20px", border: `1px solid ${brand.borderGold}`, borderRadius: "2px", fontSize: "12px", color: brand.gold, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>
                Client intake link
              </Link>
            )}
            <Link href={`/admin/soap/${appt.id}`} style={{ padding: "10px 20px", background: hasSoap ? brand.backgroundSoft : brand.forest, border: `1px solid ${hasSoap ? brand.borderMed : "transparent"}`, borderRadius: "2px", fontSize: "12px", color: hasSoap ? brand.textMuted : "#F0EBE0", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>
              {hasSoap ? "View SOAP notes" : "Write SOAP notes"}
            </Link>
            {client?.id && (
              <Link href={`/admin/clients/${client.id}`} style={{ padding: "10px 20px", border: `1px solid ${brand.borderMed}`, borderRadius: "2px", fontSize: "12px", color: brand.textMuted, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>
                Client profile
              </Link>
            )}
          </div>
        </div>

        {/* Status panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ padding: "24px", background: "#ffffff", border: `1px solid ${brand.borderMed}`, borderRadius: "2px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "12px" }}>Current status</p>
            <div style={{ display: "inline-block", padding: "6px 14px", background: `${statusColor[appt.status] ?? brand.textSoft}18`, border: `1px solid ${statusColor[appt.status] ?? brand.textSoft}40`, borderRadius: "2px", marginBottom: "20px" }}>
              <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: statusColor[appt.status] ?? brand.text, fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>
                {appt.status.replace(/_/g, " ")}
              </span>
            </div>
            <AppointmentStatusForm appointmentId={id} currentStatus={appt.status} clientId={client?.id ?? ""} />
          </div>

          {intake && (
            <div style={{ padding: "24px", background: "#ffffff", border: `1px solid ${brand.borderMed}`, borderRadius: "2px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "12px" }}>Intake</p>
              <p style={{ fontSize: "13px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
                {intake.completed_at
                  ? `Completed ${formatDateTime(intake.completed_at)}`
                  : "Not yet completed by client."}
              </p>
              {intake.reviewed_at && (
                <p style={{ fontSize: "12px", color: brand.sage, fontFamily: "'DM Sans', sans-serif", marginTop: "6px" }}>
                  Reviewed {formatDateTime(intake.reviewed_at)}
                </p>
              )}
            </div>
          )}

          <IntakeLinkPanel appointmentId={id} intake={intake} />

          {appt.notes && (
            <div style={{ padding: "24px", background: brand.goldPale, border: `1px solid ${brand.borderGold}`, borderRadius: "2px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: brand.gold, fontFamily: "'DM Sans', sans-serif", marginBottom: "8px" }}>Notes</p>
              <p style={{ fontSize: "13px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>{appt.notes}</p>
            </div>
          )}
        </div>
      </div>
    </AdminPageShell>
  );
}

function AppointmentStatusForm({ appointmentId, currentStatus, clientId }: { appointmentId: string; currentStatus: string; clientId: string }) {
  const transitions: Record<string, { label: string; next: string; primary: boolean }[]> = {
    pending_confirmation: [
      { label: "Confirm", next: "confirmed", primary: true },
      { label: "Cancel", next: "cancelled", primary: false },
    ],
    confirmed: [
      { label: "Mark arrived", next: "arrived", primary: true },
      { label: "Cancel", next: "cancelled", primary: false },
    ],
    arrived: [
      { label: "Start session", next: "in_session", primary: true },
    ],
    in_session: [
      { label: "Complete session", next: "completed", primary: true },
    ],
    completed: [],
    cancelled: [],
    no_show: [],
  };

  const actions = transitions[currentStatus] ?? [];
  if (actions.length === 0) return null;

  return (
    <form style={{ display: "flex", flexDirection: "column", gap: "8px" }} action={async (formData: FormData) => {
      "use server";
      const next = formData.get("next") as string;
      if (!next) return;
      const { createServiceClient } = await import("@/lib/supabase/server");
      const supabase = await createServiceClient();

      await supabase.from("appointments").update({ status: next }).eq("id", appointmentId);

      if (next === "confirmed" && clientId) {
        const { data: existing } = await supabase
          .from("intakes")
          .select("id")
          .eq("appointment_id", appointmentId)
          .single();

        if (!existing) {
          await supabase.from("intakes").insert({
            appointment_id: appointmentId,
            client_id: clientId,
            status: "sent",
            form_version: 1,
          });
        }

        await supabase
          .from("appointments")
          .update({ intake_status: "sent" })
          .eq("id", appointmentId);
      }

      const { revalidatePath } = await import("next/cache");
      revalidatePath(`/admin/appointments/${appointmentId}`);
      revalidatePath("/admin");
      revalidatePath("/admin/appointments");
    }}>
      {actions.map((action) => (
        <button
          key={action.next}
          type="submit"
          name="next"
          value={action.next}
          style={{
            width: "100%",
            padding: "11px 20px",
            background: action.primary ? brand.forest : "transparent",
            color: action.primary ? "#F0EBE0" : "#c0392b",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            border: action.primary ? "none" : "1px solid rgba(192,57,43,0.3)",
            borderRadius: "2px",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {action.label}
        </button>
      ))}
    </form>
  );
}

function IntakeLinkPanel({ appointmentId, intake }: { appointmentId: string; intake: any }) {
  if (!intake) return null;
  if (!hasIntakeTokenSecret()) return null;

  const token = createIntakeToken({
    intakeId: intake.id,
    appointmentId,
    createdAt: intake.created_at,
  });
  const path = getIntakeTokenPath(token);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const fullUrl = `${appUrl}${path}`;

  return (
    <div style={{ padding: "20px 24px", background: brand.goldPale, border: `1px solid ${brand.borderGold}`, borderRadius: "2px" }}>
      <p style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: brand.gold, fontFamily: "'DM Sans', sans-serif", marginBottom: "8px" }}>
        Intake link
      </p>
      <p style={{ fontSize: "13px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, marginBottom: "12px" }}>
        Send this to the client to complete their health history before the session.
      </p>
      <div style={{ fontSize: "11px", background: "rgba(255,255,255,0.7)", padding: "10px 12px", borderRadius: "2px", border: `1px solid ${brand.borderGold}`, color: brand.textMuted, wordBreak: "break-all", fontFamily: "monospace", marginBottom: "12px" }}>
        {fullUrl}
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <a
          href={`mailto:?subject=Please complete your intake form&body=Hi, please complete your health history form before your upcoming session at Guided Rhythms:%0A%0A${encodeURIComponent(fullUrl)}`}
          style={{ fontSize: "12px", padding: "9px 18px", background: brand.forest, color: "#F0EBE0", borderRadius: "2px", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}
        >
          Email to client
        </a>
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "12px", padding: "9px 18px", border: `1px solid ${brand.borderGold}`, color: brand.gold, borderRadius: "2px", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}
        >
          Preview form
        </a>
      </div>
    </div>
  );
}
