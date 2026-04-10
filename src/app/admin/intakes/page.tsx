import { createServiceClient } from "@/lib/supabase/server";
import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import Link from "next/link";
import { brand } from "@/lib/brand";

export const dynamic = "force-dynamic";

function formatDateTime(iso: string | null) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

const statusColor: Record<string, string> = {
  not_sent: brand.textSoft,
  sent: "#C8881A",
  in_progress: "#C8881A",
  completed: "#2E4A30",
  reviewed: "#6F8F55",
  needs_update: "#c0392b",
};

export default async function AdminIntakesPage() {
  await requireApprovedAdminUser();
  const supabase = await createServiceClient();

  const { data: intakes } = await supabase
    .from("intakes")
    .select(`
      id,
      status,
      completed_at,
      reviewed_at,
      appointments (
        id,
        appointment_date,
        therapist_id,
        clients ( first_name, last_name, preferred_name )
      )
    `)
    .order("completed_at", { ascending: false, nullsFirst: false });

  return (
    <AdminPageShell
      eyebrow="Health records"
      title="Intakes"
      description="Client health history forms and review status."
    >
      {!intakes || intakes.length === 0 ? (
        <div style={{ padding: "48px", textAlign: "center", border: `1px solid ${brand.border}`, borderRadius: "2px", color: brand.textSoft, fontSize: "15px", fontFamily: "'DM Sans', sans-serif", background: brand.backgroundSoft }}>
          No intake forms yet.
        </div>
      ) : (
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" as const }}>
        <div style={{ border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden", minWidth: "600px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 180px 120px", padding: "12px 24px", background: brand.backgroundSoft, borderBottom: `1px solid ${brand.border}`, gap: "16px" }}>
            {["Client", "Appointment", "Completed", "Status"].map((h) => (
              <span key={h} style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>{h}</span>
            ))}
          </div>
          {intakes.map((intake: any, i: number) => {
            const appt = intake.appointments;
            const client = appt?.clients;
            const name = client?.preferred_name
              ? `${client.preferred_name} ${client.last_name}`
              : client ? `${client.first_name} ${client.last_name}` : "—";
            const apptDate = appt?.appointment_date
              ? new Date(appt.appointment_date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
              : "—";

            return (
              <Link
                key={intake.id}
                href={`/admin/intakes/${intake.id}`}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr 180px 120px", alignItems: "center", padding: "16px 24px", borderBottom: i < intakes.length - 1 ? `1px solid ${brand.border}` : "none", background: i % 2 === 0 ? "#ffffff" : brand.background, textDecoration: "none", gap: "16px" }}
              >
                <span style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>{name}</span>
                <span style={{ fontSize: "14px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{apptDate}</span>
                <span style={{ fontSize: "13px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{formatDateTime(intake.completed_at)}</span>
                <span style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: statusColor[intake.status] ?? brand.textSoft, fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>{intake.status.replace(/_/g, " ")}</span>
              </Link>
            );
          })}
        </div>
        </div>
      )}
    </AdminPageShell>
  );
}
