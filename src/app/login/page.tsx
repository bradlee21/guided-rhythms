import { redirect } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";
import { AdminLoginForm } from "@/components/auth/AdminLoginForm";
import { getAuthenticatedAdminUser } from "@/lib/auth/admin";
import { hasPublicSupabaseEnv } from "@/lib/supabase/env";
import { brand } from "@/lib/brand";

function getSafeNextPath(nextPath: string | undefined) {
  if (!nextPath || !nextPath.startsWith("/")) return "/admin";
  if (nextPath.startsWith("//")) return "/admin";
  return nextPath;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string; next?: string }>;
}) {
  const { denied, next } = await searchParams;
  const nextPath = getSafeNextPath(next);
  const isDenied = denied === "1";
  const user = hasPublicSupabaseEnv() ? await getAuthenticatedAdminUser() : null;

  if (user?.isApprovedAdmin) redirect(nextPath);

  return (
    <div style={{ minHeight: "100vh", background: brand.background, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
      <div style={{ maxWidth: "440px", width: "100%" }}>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "50%", border: `1px solid ${brand.borderGold}`, background: brand.goldPale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="3" y="8" width="12" height="9" rx="1" stroke={brand.gold} strokeWidth="1.2"/>
              <path d="M6 8V5.5a3 3 0 016 0V8" stroke={brand.gold} strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "12px" }}>
            Admin access
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "12px" }}>
            {user ? "Access denied" : "Sign in"}
          </h1>
          <p style={{ fontSize: "14px", lineHeight: 1.7, color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
            {user
              ? "Your account is not approved for admin access."
              : isDenied
              ? "That account is not approved. Sign in with an approved admin account."
              : "Sign in to access the Guided Rhythms admin area."}
          </p>
        </div>

        <div style={{ background: "#ffffff", border: `1px solid ${brand.borderMed}`, borderRadius: "2px", padding: "32px" }}>
          {!hasPublicSupabaseEnv() ? (
            <p style={{ fontSize: "14px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
              Supabase is not configured. Add environment variables to enable sign in.
            </p>
          ) : user ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <p style={{ fontSize: "14px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                Signed in as {user.email ?? "unknown"}.
              </p>
              <AdminSignOutButton />
            </div>
          ) : (
            <AdminLoginForm nextPath={nextPath} />
          )}
        </div>

      </div>
    </div>
  );
}
