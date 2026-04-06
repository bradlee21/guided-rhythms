import { redirect } from "next/navigation";

import { PageShell } from "@/components/app/PageShell";
import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";
import { AdminLoginForm } from "@/components/auth/AdminLoginForm";
import { getAuthenticatedAdminUser } from "@/lib/auth/admin";
import { hasPublicSupabaseEnv } from "@/lib/supabase/env";

function getSafeNextPath(nextPath: string | undefined) {
  if (!nextPath || !nextPath.startsWith("/")) {
    return "/admin";
  }

  if (nextPath.startsWith("//")) {
    return "/admin";
  }

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
  const user = hasPublicSupabaseEnv()
    ? await getAuthenticatedAdminUser()
    : null;

  if (user?.isApprovedAdmin) {
    redirect(nextPath);
  }

  return (
    <PageShell
      eyebrow="Admin Access"
      title="Admin sign in"
      description="Sign in with your Guided Rhythms admin account to access the protected admin area."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <PlaceholderPanel
          title={user ? "Access denied" : "Sign in"}
          body={
            user
              ? "Your account is authenticated, but it is not approved for Guided Rhythms admin access."
              : isDenied
                ? "That account is not approved for the Guided Rhythms admin area. Sign in with an approved admin account."
                : "Use your Supabase-authenticated admin credentials. The admin area is now protected and unauthenticated visitors are redirected here."
          }
        >
          {!hasPublicSupabaseEnv() ? (
            <p className="text-base leading-7">
              Supabase auth is not configured yet. Add the public Supabase
              environment variables to enable admin sign in.
            </p>
          ) : user ? (
            <div className="space-y-4">
              <p className="text-sm leading-6">
                Signed in as {user.email ?? "an authenticated user"}.
              </p>
              <AdminSignOutButton />
            </div>
          ) : (
            <AdminLoginForm nextPath={nextPath} />
          )}
        </PlaceholderPanel>

        <PlaceholderPanel
          title="What happens next"
          body={
            user
              ? "Ask an approved admin to add your email to the admin allowlist, or sign out and return to the public site."
              : "After sign-in you will be redirected into the admin area if your email is approved. Public booking routes continue to work without admin authentication."
          }
        />
      </div>
    </PageShell>
  );
}
