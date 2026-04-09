import { createServiceClient } from "@/lib/supabase/server";
import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import Link from "next/link";
import { brand } from "@/lib/brand";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  await requireApprovedAdminUser();
  const supabase = await createServiceClient();

  const { data: clients } = await supabase
    .from("clients")
    .select(`
      id,
      first_name,
      last_name,
      preferred_name,
      email,
      phone,
      created_at,
      appointments ( id, appointment_date, status )
    `)
    .order("last_name", { ascending: true });

  return (
    <AdminPageShell
      eyebrow="Records"
      title="Clients"
      description="All client profiles and history."
    >
      {!clients || clients.length === 0 ? (
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
          No clients yet. They'll appear here after their first booking.
        </div>
      ) : (
        <div style={{ border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden" }}>
          {/* Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 140px 100px",
            padding: "12px 24px",
            background: brand.backgroundSoft,
            borderBottom: `1px solid ${brand.border}`,
            gap: "16px",
          }}>
            {["Client", "Contact", "Member since", "Sessions"].map((h) => (
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

          {/* Rows */}
          {clients.map((client: any, i: number) => {
            const displayName = client.preferred_name
              ? `${client.preferred_name} ${client.last_name}`
              : `${client.first_name} ${client.last_name}`;
            const sessionCount = client.appointments?.filter(
              (a: any) => a.status === "completed"
            ).length ?? 0;
            const memberSince = new Date(client.created_at).toLocaleDateString("en-US", {
              month: "short", year: "numeric",
            });

            return (
              <Link
                key={client.id}
                href={`/admin/clients/${client.id}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 140px 100px",
                  alignItems: "center",
                  padding: "16px 24px",
                  borderBottom: i < clients.length - 1 ? `1px solid ${brand.border}` : "none",
                  background: i % 2 === 0 ? "#ffffff" : brand.background,
                  textDecoration: "none",
                  gap: "16px",
                }}
              >
                <div>
                  <div style={{ fontSize: "15px", color: brand.text, fontFamily: "'DM Sans', sans-serif", marginBottom: "2px" }}>
                    {displayName}
                  </div>
                  {client.preferred_name && (
                    <div style={{ fontSize: "12px", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>
                      Legal: {client.first_name} {client.last_name}
                    </div>
                  )}
                </div>
                <div>
                  <div style={{ fontSize: "14px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif", marginBottom: "2px" }}>
                    {client.email}
                  </div>
                  <div style={{ fontSize: "13px", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>
                    {client.phone}
                  </div>
                </div>
                <span style={{ fontSize: "14px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                  {memberSince}
                </span>
                <span style={{ fontSize: "14px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                  {sessionCount}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </AdminPageShell>
  );
}
