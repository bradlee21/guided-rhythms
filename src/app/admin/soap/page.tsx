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

export default async function SoapNotesPage() {
  const user = await requireApprovedAdminUser();
  const supabase = await createServiceClient();

  const { data: appointments } = await supabase
    .from("appointments")
    .select(`
      id,
      appointment_date,
      start_time,
      status,
      clients ( id, first_name, last_name ),
      services ( name ),
      soap_notes ( id, updated_at )
    `)
    .eq("therapist_id", user.id)
    .in("status", ["completed", "in_session", "ready_for_visit", "arrived", "confirmed"])
    .order("appointment_date", { ascending: false })
    .limit(50);

  const withNotes = appointments?.filter((a: any) => a.soap_notes?.length > 0) ?? [];
  const withoutNotes = appointments?.filter((a: any) => !a.soap_notes?.length) ?? [];

  return (
    <AdminPageShell
      eyebrow="Charting"
      title="SOAP Notes"
      description="Session notes and treatment records."
    >
      {/* Needs notes */}
      {withoutNotes.length > 0 && (
        <div style={{ marginBottom: "48px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Needs notes
          </h2>
          <div style={{ border: `1px solid ${brand.borderGold}`, borderRadius: "2px", overflow: "hidden" }}>
            {withoutNotes.map((appt: any, i: number) => (
              <Link
                key={appt.id}
                href={`/admin/soap/${appt.id}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr 1fr auto",
                  alignItems: "center",
                  padding: "16px 24px",
                  borderBottom: i < withoutNotes.length - 1 ? `1px solid ${brand.border}` : "none",
                  background: i % 2 === 0 ? brand.goldPale : "#ffffff",
                  textDecoration: "none",
                  gap: "16px",
                }}
              >
                <span style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>
                  {formatDate(appt.appointment_date)}
                </span>
                <span style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>
                  {appt.clients ? `${appt.clients.first_name} ${appt.clients.last_name}` : "—"}
                </span>
                <span style={{ fontSize: "14px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                  {appt.services?.name ?? "—"} · {formatTime(appt.start_time)}
                </span>
                <span style={{ fontSize: "12px", color: brand.gold, letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif" }}>
                  Write notes →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Completed notes */}
      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", marginBottom: "16px" }}>
          {withNotes.length === 0 ? "No notes yet" : "Completed notes"}
        </h2>
        {withNotes.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", border: `1px solid ${brand.border}`, borderRadius: "2px", color: brand.textSoft, fontSize: "15px", fontFamily: "'DM Sans', sans-serif", background: brand.backgroundSoft }}>
            Notes you write will appear here.
          </div>
        ) : (
          <div style={{ border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden" }}>
            {withNotes.map((appt: any, i: number) => (
              <Link
                key={appt.id}
                href={`/admin/soap/${appt.id}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr 1fr auto",
                  alignItems: "center",
                  padding: "16px 24px",
                  borderBottom: i < withNotes.length - 1 ? `1px solid ${brand.border}` : "none",
                  background: i % 2 === 0 ? "#ffffff" : brand.background,
                  textDecoration: "none",
                  gap: "16px",
                }}
              >
                <span style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>
                  {formatDate(appt.appointment_date)}
                </span>
                <span style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>
                  {appt.clients ? `${appt.clients.first_name} ${appt.clients.last_name}` : "—"}
                </span>
                <span style={{ fontSize: "14px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                  {appt.services?.name ?? "—"} · {formatTime(appt.start_time)}
                </span>
                <span style={{ fontSize: "12px", color: brand.sage, letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif" }}>
                  View →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AdminPageShell>
  );
}
