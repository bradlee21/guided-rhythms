import { redirect } from "next/navigation";

import { PageShell } from "@/components/app/PageShell";
import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";
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
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const nextPath = getSafeNextPath(next);

  if (hasPublicSupabaseEnv()) {
    const user = await getAuthenticatedAdminUser();

    if (user) {
      redirect(nextPath);
    }
  }

  return (
    <PageShell
      eyebrow="Admin Access"
      title="Admin sign in"
      description="Sign in with your Guided Rhythms admin account to access the protected admin area."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <PlaceholderPanel
          title="Sign in"
          body="Use your Supabase-authenticated admin credentials. The admin area is now protected and unauthenticated visitors are redirected here."
        >
          {hasPublicSupabaseEnv() ? (
            <AdminLoginForm nextPath={nextPath} />
          ) : (
            <p className="text-base leading-7">
              Supabase auth is not configured yet. Add the public Supabase
              environment variables to enable admin sign in.
            </p>
          )}
        </PlaceholderPanel>

        <PlaceholderPanel
          title="What happens next"
          body="After sign-in you will be redirected into the admin area. Public booking routes continue to work without admin authentication."
        />
      </div>
    </PageShell>
  );
}
