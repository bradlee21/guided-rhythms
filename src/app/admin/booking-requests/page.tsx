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
  submitted: "#C8881A",
  under_review: "#C8881A",
  approved: "#2E4A30",
  declined: "#c0392b",
  expired: "#9A8A72",
  converted: "#6F8F55",
};

export default async function AdminBookingRequestsPage() {
  await requireApprovedAdminUser();
  const supabase = await createServiceClient();

  const { data: requests } = await supabase
    .from("booking_requests")
    .select(`
      id,
      first_name,
      last_name,
      email,
      status,
      created_at,
      services ( name )
    `)
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <AdminPageShell
      eyebrow="Bookings"
      title="Booking requests"
      description="Review and confirm incoming booking requests."
    >
      {!requests || requests.length === 0 ? (
        <div style={{ padding: "48px", textAlign: "center", border: `1px solid ${brand.border}`, borderRadius: "2px", color: brand.textSoft, fontSize: "15px", fontFamily: "'DM Sans', sans-serif", background: brand.backgroundSoft }}>
          No booking requests yet.
        </div>
      ) : (
        <div style={{ border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 180px 120px", padding: "12px 24px", background: brand.backgroundSoft, borderBottom: `1px solid ${brand.border}`, gap: "16px" }}>
            {["Client", "Email", "Service", "Submitted", "Status"].map((h) => (
              <span key={h} style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>{h}</span>
            ))}
          </div>
          {requests.map((req: any, i: number) => (
            <Link
              key={req.id}
              href={`/admin/booking-requests/${req.id}`}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 180px 120px", alignItems: "center", padding: "16px 24px", borderBottom: i < requests.length - 1 ? `1px solid ${brand.border}` : "none", background: i % 2 === 0 ? "#ffffff" : brand.background, textDecoration: "none", gap: "16px" }}
            >
              <span style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>{req.first_name} {req.last_name}</span>
              <span style={{ fontSize: "14px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{req.email}</span>
              <span style={{ fontSize: "14px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{(req.services as any)?.name ?? "—"}</span>
              <span style={{ fontSize: "13px", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>{formatDateTime(req.created_at)}</span>
              <span style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: statusColor[req.status] ?? brand.textSoft, fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>{req.status.replace(/_/g, " ")}</span>
            </Link>
          ))}
        </div>
      )}
    </AdminPageShell>
  );
}
