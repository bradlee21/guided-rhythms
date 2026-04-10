import { createServiceClient } from "@/lib/supabase/server";
import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import Link from "next/link";
import { brand } from "@/lib/brand";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
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
  intake_pending: "#C8881A",
  ready_for_visit: "#6F8F55",
  arrived: "#446E49",
  in_session: "#2E4A30",
  completed: "#6F8F55",
  cancelled: "#9A8A72",
  no_show: "#c0392b",
  rescheduled: "#9A8A72",
};

export default async function AdminAppointmentsPage() {
  const user = await requireApprovedAdminUser();
  const supabase = await createServiceClient();

  const { data: appointments } = await supabase
    .from("appointments")
    .select(`
      id,
      appointment_date,
      start_time,
      end_time,
      status,
      clients ( first_name, last_name, preferred_name ),
      services ( name )
    `)
    .eq("therapist_id", user.id)
    .order("appointment_date", { ascending: false })
    .order("start_time", { ascending: true })
    .limit(100);

  return (
    <AdminPageShell
      eyebrow="Schedule"
      title="Appointments"
      description="All scheduled sessions and their current status."
    >
      {!appointments || appointments.length === 0 ? (
        <div style={{ padding: "48px", textAlign: "center", border: `1px solid ${brand.border}`, borderRadius: "2px", color: brand.textSoft, fontSize: "15px", fontFamily: "'DM Sans', sans-serif", background: brand.backgroundSoft }}>
          No appointments yet.
        </div>
      ) : (
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" as const }}>
        <div style={{ border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden", minWidth: "700px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr 140px 120px", padding: "12px 24px", background: brand.backgroundSoft, borderBottom: `1px solid ${brand.border}`, gap: "16px" }}>
            {["Date", "Client", "Service", "Time", "Status"].map((h) => (
              <span key={h} style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>{h}</span>
            ))}
          </div>
          {appointments.map((appt: any, i: number) => {
            const client = appt.clients;
            const name = client?.preferred_name
              ? `${client.preferred_name} ${client.last_name}`
              : client ? `${client.first_name} ${client.last_name}` : "—";
            return (
              <Link
                key={appt.id}
                href={`/admin/appointments/${appt.id}`}
                style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr 140px 120px", alignItems: "center", padding: "16px 24px", borderBottom: i < appointments.length - 1 ? `1px solid ${brand.border}` : "none", background: i % 2 === 0 ? "#ffffff" : brand.background, textDecoration: "none", gap: "16px" }}
              >
                <span style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>{formatDate(appt.appointment_date)}</span>
                <span style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>{name}</span>
                <span style={{ fontSize: "14px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{appt.services?.name ?? "—"}</span>
                <span style={{ fontSize: "14px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{formatTime(appt.start_time)}</span>
                <span style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: statusColor[appt.status] ?? brand.textSoft, fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>{appt.status.replace(/_/g, " ")}</span>
              </Link>
            );
          })}
        </div>
        </div>
      )}
    </AdminPageShell>
  );
}
