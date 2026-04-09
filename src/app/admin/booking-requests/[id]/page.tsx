import { createServiceClient } from "@/lib/supabase/server";
import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { notFound } from "next/navigation";
import Link from "next/link";
import { brand } from "@/lib/brand";

export const dynamic = "force-dynamic";

function formatDateTime(iso: string | null) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

const statusColor: Record<string, string> = {
  submitted: "#C8881A",
  under_review: "#C8881A",
  approved: "#2E4A30",
  declined: "#c0392b",
  expired: "#9A8A72",
  converted: "#6F8F55",
};

export default async function BookingRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireApprovedAdminUser();
  const supabase = await createServiceClient();

  const { data: req } = await supabase
    .from("booking_requests")
    .select(`*, services ( name, hands_on_minutes )`)
    .eq("id", id)
    .single();

  if (!req) notFound();

  const service = req.services as any;

  const rows = [
    { label: "Name", value: `${req.first_name} ${req.last_name}` },
    { label: "Email", value: req.email ?? "—" },
    { label: "Phone", value: req.phone ?? "—" },
    { label: "Client type", value: req.is_new_client ? "New client" : "Returning client" },
    { label: "Service", value: service?.name ?? "—" },
    { label: "Preferred date 1", value: formatDate(req.preferred_date_1) },
    { label: "Preferred date 2", value: formatDate(req.preferred_date_2) },
    { label: "Preferred date 3", value: formatDate(req.preferred_date_3) },
    { label: "Preferred days", value: req.preferred_days?.join(", ") ?? "—" },
    { label: "Preferred times", value: req.preferred_times?.join(", ") ?? "—" },
    { label: "Pain points", value: req.pain_points ?? "—" },
    { label: "Goals", value: req.goals ?? "—" },
    { label: "Notes", value: req.notes ?? "—" },
    { label: "Referral source", value: req.referral_source ?? "—" },
    { label: "Status", value: req.status.replace(/_/g, " ") },
    { label: "Submitted", value: formatDateTime(req.created_at) },
  ];

  return (
    <AdminPageShell
      eyebrow="Booking request"
      title={`${req.first_name} ${req.last_name}`}
      description={`${service?.name ?? "Session"} · Submitted ${formatDateTime(req.created_at)}`}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "32px", alignItems: "start" }}>

        {/* Detail table */}
        <div style={{ border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden" }}>
          {rows.map((row, i) => (
            <div key={row.label} style={{ display: "grid", gridTemplateColumns: "180px 1fr", padding: "14px 24px", borderBottom: i < rows.length - 1 ? `1px solid ${brand.border}` : "none", background: i % 2 === 0 ? "#ffffff" : brand.background }}>
              <span style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", paddingTop: "2px" }}>{row.label}</span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                color: row.label === "Status" ? (statusColor[req.status] ?? brand.text) : brand.text,
                textTransform: row.label === "Status" ? "uppercase" : "none",
                letterSpacing: row.label === "Status" ? "0.08em" : "normal",
                fontSize: row.label === "Status" ? "11px" : "14px",
              } as any}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Actions sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ padding: "24px", background: "#ffffff", border: `1px solid ${brand.borderMed}`, borderRadius: "2px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "12px" }}>
              Current status
            </p>
            <div style={{ display: "inline-block", padding: "6px 14px", background: `${statusColor[req.status] ?? brand.textSoft}18`, border: `1px solid ${statusColor[req.status] ?? brand.textSoft}40`, borderRadius: "2px", marginBottom: "20px" }}>
              <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: statusColor[req.status] ?? brand.textSoft, fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>
                {req.status.replace(/_/g, " ")}
              </span>
            </div>
            <UpdateStatusForm requestId={id} currentStatus={req.status} />
          </div>

          {req.client_id && (
            <Link href={`/admin/clients/${req.client_id}`} style={{ display: "block", padding: "16px 20px", background: "#ffffff", border: `1px solid ${brand.borderMed}`, borderRadius: "2px", textDecoration: "none" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "4px" }}>Client profile</p>
              <p style={{ fontSize: "14px", color: brand.gold, fontFamily: "'DM Sans', sans-serif" }}>View profile →</p>
            </Link>
          )}
        </div>
      </div>
    </AdminPageShell>
  );
}

function UpdateStatusForm({ requestId, currentStatus }: { requestId: string; currentStatus: string }) {
  const statuses = ["submitted", "under_review", "approved", "declined", "expired", "converted"];
  return (
    <form action={async (formData: FormData) => {
      "use server";
      const newStatus = formData.get("status") as string;
      if (!newStatus) return;
      const { createServiceClient } = await import("@/lib/supabase/server");
      const supabase = await createServiceClient();
      await supabase.from("booking_requests").update({ status: newStatus, reviewed_at: new Date().toISOString() }).eq("id", requestId);
      const { revalidatePath } = await import("next/cache");
      revalidatePath(`/admin/booking-requests/${requestId}`);
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>Update status</label>
        <select name="status" defaultValue={currentStatus} style={{ padding: "8px 12px", border: `1px solid ${brand.borderMed}`, borderRadius: "2px", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", color: brand.text, background: "#ffffff", outline: "none" }}>
          {statuses.map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
          ))}
        </select>
        <button type="submit" style={{ padding: "10px 20px", background: brand.forest, color: "#F0EBE0", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: "2px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
          Update
        </button>
      </div>
    </form>
  );
}
