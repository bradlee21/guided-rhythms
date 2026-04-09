import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { brand } from "@/lib/brand";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const user = await requireApprovedAdminUser();

  const rows = [
    { label: "Signed in as", value: user.email ?? "—" },
    { label: "Display name", value: user.fullName },
    { label: "Max sessions/day", value: "4" },
    { label: "Buffer between sessions", value: "30 minutes" },
    { label: "Working hours", value: "Mon–Fri, 9:00 am – 5:00 pm" },
    { label: "Payment", value: "Pay in person (Stripe coming soon)" },
  ];

  return (
    <AdminPageShell
      eyebrow="Configuration"
      title="Settings"
      description="Practice-level configuration and account details."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Account
          </h2>
          <div style={{ border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden" }}>
            {rows.map((row, i) => (
              <div key={row.label} style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                padding: "14px 24px",
                borderBottom: i < rows.length - 1 ? `1px solid ${brand.border}` : "none",
                background: i % 2 === 0 ? "#ffffff" : brand.background,
              }}>
                <span style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", paddingTop: "2px" }}>
                  {row.label}
                </span>
                <span style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", marginBottom: "8px" }}>
            Adding Josh Green
          </h2>
          <p style={{ fontSize: "14px", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, marginBottom: "16px" }}>
            When Josh is ready to join, add his email to the <code style={{ fontSize: "13px", background: brand.backgroundSoft, padding: "2px 6px", borderRadius: "2px" }}>ADMIN_EMAIL_ALLOWLIST</code> environment variable in Vercel, then have him sign up at <code style={{ fontSize: "13px", background: brand.backgroundSoft, padding: "2px 6px", borderRadius: "2px" }}>/login</code>.
          </p>
          <div style={{ padding: "16px 24px", background: brand.goldPale, border: `1px solid ${brand.borderGold}`, borderRadius: "2px" }}>
            <p style={{ fontSize: "13px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, margin: 0 }}>
              Current allowlist: <strong>{process.env.ADMIN_EMAIL_ALLOWLIST ?? "Not set"}</strong>
            </p>
          </div>
        </div>
      </div>
    </AdminPageShell>
  );
}
