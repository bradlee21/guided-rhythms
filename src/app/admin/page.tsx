export const dynamic = "force-dynamic";

import { createServiceClient } from "@/lib/supabase/server";
import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { brand } from "@/lib/brand";

async function getDashboardData(therapistId: string) {
  const supabase = await createServiceClient();
  const today = new Date().toISOString().split("T")[0];
  const weekEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const [
    { data: todaySessions },
    { count: pendingCount },
    { count: intakeCount },
    { count: clientCount },
    { count: weekCount },
  ] = await Promise.all([
    supabase
      .from("appointments")
      .select(`
        id,
        appointment_date,
        start_time,
        end_time,
        status,
        clients ( id, first_name, last_name ),
        services ( name, hands_on_minutes ),
        intakes ( id, status )
      `)
      .eq("therapist_id", therapistId)
      .eq("appointment_date", today)
      .not("status", "in", '("cancelled","no_show")')
      .order("start_time", { ascending: true }),
    supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .eq("therapist_id", therapistId)
      .eq("status", "pending_confirmation"),
    supabase
      .from("intakes")
      .select("*", { count: "exact", head: true })
      .eq("status", "completed")
      .is("reviewed_at", null),
    supabase
      .from("clients")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .eq("therapist_id", therapistId)
      .gte("appointment_date", today)
      .lte("appointment_date", weekEnd)
      .not("status", "in", '("cancelled","no_show")'),
  ]);

  return {
    todaySessions: todaySessions ?? [],
    pendingCount: pendingCount ?? 0,
    intakeCount: intakeCount ?? 0,
    clientCount: clientCount ?? 0,
    weekCount: weekCount ?? 0,
  };
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function formatTime(t: string) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
}

const statusLabel: Record<string, string> = {
  pending_confirmation: "Pending",
  confirmed: "Confirmed",
  intake_pending: "Intake pending",
  ready_for_visit: "Ready",
  arrived: "Arrived",
  in_session: "In session",
  completed: "Completed",
};

const statusColor: Record<string, string> = {
  pending_confirmation: brand.gold,
  confirmed: brand.forest,
  intake_pending: brand.goldLight,
  ready_for_visit: brand.sage,
  arrived: brand.forestMid,
  in_session: brand.forest,
  completed: brand.sageLight,
};

export default async function AdminDashboard() {
  const user = await requireApprovedAdminUser();
  const data = await getDashboardData(user.id);
  const greeting = getGreeting();
  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  return (
    <div>
      {/* Greeting header */}
      <div style={{
        background: "#1E2820",
        padding: "40px 48px 36px",
        marginBottom: "32px",
        borderRadius: "2px",
      }}>
        <p style={{
          fontSize: "13px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(168,188,142,0.7)",
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: "8px",
        }}>
          {todayFormatted}
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(32px, 4vw, 48px)",
          fontWeight: 300,
          color: "#F0EBE0",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          marginBottom: "24px",
        }}>
          {greeting}, {user.fullName}.
        </h1>

        {/* Inline stats */}
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
          {[
            { label: "Today", value: data.todaySessions.length, alert: false },
            { label: "This week", value: data.weekCount, alert: false },
            { label: "To confirm", value: data.pendingCount, alert: data.pendingCount > 0 },
            { label: "Intakes to review", value: data.intakeCount, alert: data.intakeCount > 0 },
            { label: "Total clients", value: data.clientCount, alert: false },
          ].map((s) => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "32px",
                fontWeight: 300,
                color: s.alert ? brand.goldLight : "#F0EBE0",
                lineHeight: 1,
                marginBottom: "4px",
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: s.alert ? brand.goldLight : "rgba(168,188,142,0.6)",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's sessions */}
      <div style={{ marginBottom: "12px", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "24px",
          fontWeight: 300,
          color: brand.text,
          letterSpacing: "-0.02em",
        }}>
          {data.todaySessions.length === 0
            ? "No sessions today"
            : `Today's sessions`}
        </h2>
        <a href="/admin/appointments" style={{
          fontSize: "13px",
          color: brand.gold,
          textDecoration: "none",
          letterSpacing: "0.04em",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          All appointments →
        </a>
      </div>

      {data.todaySessions.length === 0 ? (
        <div style={{
          padding: "48px",
          textAlign: "center",
          border: `1px solid ${brand.border}`,
          borderRadius: "2px",
          color: brand.textSoft,
          fontSize: "15px",
          fontFamily: "'DM Sans', sans-serif",
          background: brand.backgroundSoft,
        }}>
          Your schedule is clear today.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {data.todaySessions.map((appt: any) => {
            const client = appt.clients;
            const service = appt.services;
            const intake = appt.intakes?.[0];
            const hasUnreviewedIntake = intake && intake.status === "completed";
            return (
              <div key={appt.id} style={{
                background: "#ffffff",
                border: `1px solid ${brand.border}`,
                borderLeft: `3px solid ${brand.gold}`,
                borderRadius: "0 2px 2px 0",
                padding: "20px 24px",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "16px",
                alignItems: "center",
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "6px" }}>
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "22px",
                      fontWeight: 400,
                      color: brand.text,
                    }}>
                      {client ? `${client.first_name} ${client.last_name}` : "Unknown client"}
                    </h3>
                    <span style={{
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: statusColor[appt.status] ?? brand.textSoft,
                      fontFamily: "'DM Sans', sans-serif",
                    }}>
                      {statusLabel[appt.status] ?? appt.status}
                    </span>
                  </div>
                  <div style={{
                    fontSize: "14px",
                    color: brand.textMuted,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {service?.name ?? "—"} · {formatTime(appt.start_time)} – {formatTime(appt.end_time)}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {hasUnreviewedIntake && (
                    <a href={`/admin/intakes/${intake.id}`} style={{
                      fontSize: "12px",
                      padding: "8px 16px",
                      border: `1px solid ${brand.borderGold}`,
                      color: brand.gold,
                      borderRadius: "2px",
                      textDecoration: "none",
                      fontFamily: "'DM Sans', sans-serif",
                      letterSpacing: "0.06em",
                    }}>
                      Review intake
                    </a>
                  )}
                  <a href={`/admin/soap/${appt.id}`} style={{
                    fontSize: "12px",
                    padding: "8px 16px",
                    background: brand.forest,
                    color: "#F0EBE0",
                    borderRadius: "2px",
                    textDecoration: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.06em",
                  }}>
                    SOAP notes
                  </a>
                  <a href={`/admin/appointments/${appt.id}`} style={{
                    fontSize: "12px",
                    padding: "8px 16px",
                    border: `1px solid ${brand.borderMed}`,
                    color: brand.textMuted,
                    borderRadius: "2px",
                    textDecoration: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.06em",
                  }}>
                    View
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Action items */}
      {(data.pendingCount > 0 || data.intakeCount > 0) && (
        <div style={{ marginTop: "32px" }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "24px",
            fontWeight: 300,
            color: brand.text,
            letterSpacing: "-0.02em",
            marginBottom: "12px",
          }}>
            Needs attention
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {data.pendingCount > 0 && (
              <a href="/admin/appointments?filter=pending" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                background: brand.goldPale,
                border: `1px solid ${brand.borderGold}`,
                borderRadius: "2px",
                textDecoration: "none",
              }}>
                <span style={{ fontSize: "15px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>
                  {data.pendingCount} appointment{data.pendingCount > 1 ? "s" : ""} waiting for confirmation
                </span>
                <span style={{ fontSize: "13px", color: brand.gold, fontFamily: "'DM Sans', sans-serif" }}>
                  Review →
                </span>
              </a>
            )}
            {data.intakeCount > 0 && (
              <a href="/admin/intakes" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                background: brand.goldPale,
                border: `1px solid ${brand.borderGold}`,
                borderRadius: "2px",
                textDecoration: "none",
              }}>
                <span style={{ fontSize: "15px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>
                  {data.intakeCount} intake{data.intakeCount > 1 ? "s" : ""} ready to review
                </span>
                <span style={{ fontSize: "13px", color: brand.gold, fontFamily: "'DM Sans', sans-serif" }}>
                  Review →
                </span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
