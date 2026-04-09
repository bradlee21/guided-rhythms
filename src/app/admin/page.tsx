export const dynamic = "force-dynamic";

import { createServiceClient } from "@/lib/supabase/server";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { brand } from "@/lib/brand";

async function getDashboardStats() {
  const supabase = await createServiceClient();
  const today = new Date().toISOString().split("T")[0];

  const [
    { count: todayCount },
    { count: weekCount },
    { count: pendingCount },
    { count: clientCount },
    { count: intakePendingCount },
    { data: upcomingAppointments },
  ] = await Promise.all([
    supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .eq("appointment_date", today)
      .not("status", "in", '("cancelled","no_show")'),
    supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .gte("appointment_date", today)
      .lte("appointment_date", new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0])
      .not("status", "in", '("cancelled","no_show")'),
    supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending_confirmation"),
    supabase
      .from("clients")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("intakes")
      .select("*", { count: "exact", head: true })
      .eq("status", "completed")
      .is("reviewed_at", null),
    supabase
      .from("appointments")
      .select(`
        id,
        appointment_date,
        start_time,
        end_time,
        status,
        clients ( first_name, last_name ),
        services ( name, hands_on_minutes )
      `)
      .gte("appointment_date", today)
      .not("status", "in", '("cancelled","no_show")')
      .order("appointment_date", { ascending: true })
      .order("start_time", { ascending: true })
      .limit(8),
  ]);

  return {
    todayCount: todayCount ?? 0,
    weekCount: weekCount ?? 0,
    pendingCount: pendingCount ?? 0,
    clientCount: clientCount ?? 0,
    intakePendingCount: intakePendingCount ?? 0,
    upcomingAppointments: upcomingAppointments ?? [],
  };
}

function formatTime(t: string) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
}

function formatDate(iso: string) {
  if (!iso) return "";
  const [y, mo, d] = iso.split("-").map(Number);
  return new Date(y, mo - 1, d).toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  });
}

const statusColors: Record<string, string> = {
  pending_confirmation: brand.gold,
  confirmed: brand.forest,
  intake_pending: brand.goldLight,
  ready_for_visit: brand.sage,
  arrived: brand.forestMid,
  in_session: brand.forest,
  completed: brand.sageLight,
};

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const metrics = [
    { label: "Today's sessions", value: stats.todayCount },
    { label: "This week", value: stats.weekCount },
    { label: "Pending confirmation", value: stats.pendingCount, alert: stats.pendingCount > 0 },
    { label: "Total clients", value: stats.clientCount },
    { label: "Intakes to review", value: stats.intakePendingCount, alert: stats.intakePendingCount > 0 },
  ];

  return (
    <AdminPageShell
      eyebrow="Overview"
      title="Dashboard"
      description="Your practice at a glance."
    >
      {/* Metric row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "16px",
        marginBottom: "48px",
      }}>
        {metrics.map((m) => (
          <div key={m.label} style={{
            background: m.alert ? brand.goldPale : brand.backgroundSoft,
            border: `1px solid ${m.alert ? brand.borderGold : brand.border}`,
            borderRadius: "2px",
            padding: "20px 24px",
          }}>
            <div style={{
              fontSize: "32px",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              color: m.alert ? brand.gold : brand.text,
              lineHeight: 1,
              marginBottom: "8px",
            }}>
              {m.value}
            </div>
            <div style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: brand.textSoft,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming appointments */}
      <div style={{ marginBottom: "16px", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "26px",
          fontWeight: 300,
          color: brand.text,
          letterSpacing: "-0.02em",
        }}>
          Upcoming appointments
        </h2>
        <a href="/admin/appointments" style={{
          fontSize: "12px",
          color: brand.gold,
          textDecoration: "none",
          letterSpacing: "0.06em",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          View all →
        </a>
      </div>

      {stats.upcomingAppointments.length === 0 ? (
        <div style={{
          padding: "48px",
          textAlign: "center",
          border: `1px solid ${brand.border}`,
          borderRadius: "2px",
          color: brand.textSoft,
          fontSize: "15px",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          No upcoming appointments.
        </div>
      ) : (
        <div style={{ border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden" }}>
          {/* Table header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "140px 1fr 1fr 120px 100px",
            padding: "12px 24px",
            background: brand.backgroundSoft,
            borderBottom: `1px solid ${brand.border}`,
          }}>
            {["Date", "Client", "Service", "Time", "Status"].map((h) => (
              <span key={h} style={{
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: brand.textSoft,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {h}
              </span>
            ))}
          </div>

          {/* Table rows */}
          {stats.upcomingAppointments.map((appt: any, i: number) => {
            const client = appt.clients;
            const service = appt.services;
            const statusColor = statusColors[appt.status] ?? brand.textSoft;
            return (
              <a
                key={appt.id}
                href={`/admin/appointments/${appt.id}`}
                className="hover:bg-[#F2EDE2]"
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 1fr 1fr 120px 100px",
                  padding: "16px 24px",
                  borderBottom: i < stats.upcomingAppointments.length - 1
                    ? `1px solid ${brand.border}` : "none",
                  background: i % 2 === 0 ? "#ffffff" : brand.background,
                  textDecoration: "none",
                  transition: "background 0.15s",
                }}
              >
                <span style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>
                  {formatDate(appt.appointment_date)}
                </span>
                <span style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>
                  {client ? `${client.first_name} ${client.last_name}` : "—"}
                </span>
                <span style={{ fontSize: "14px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                  {service?.name ?? "—"}
                </span>
                <span style={{ fontSize: "14px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                  {formatTime(appt.start_time)}
                </span>
                <span style={{
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: statusColor,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                }}>
                  {appt.status.replace(/_/g, " ")}
                </span>
              </a>
            );
          })}
        </div>
      )}
    </AdminPageShell>
  );
}
