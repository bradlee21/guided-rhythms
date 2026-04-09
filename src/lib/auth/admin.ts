import "server-only";
import { redirect } from "next/navigation";
import { isApprovedAdminEmail } from "@/lib/auth/admin-access";
import { hasPublicSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export type AdminUser = {
  id: string;
  email: string | null;
  fullName: string;
  isApprovedAdmin: boolean;
};

function deriveFirstName(email: string | null | undefined, metadata: Record<string, string> | null): string {
  if (metadata?.full_name) return metadata.full_name.split(" ")[0];
  if (metadata?.first_name) return metadata.first_name;
  if (email) {
    const local = email.split("@")[0];
    return local.charAt(0).toUpperCase() + local.slice(1);
  }
  return "there";
}

export async function getAuthenticatedAdminUser() {
  if (!hasPublicSupabaseEnv()) {
    return null satisfies AdminUser | null;
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return null satisfies AdminUser | null;
  }
  const meta = (user.user_metadata ?? {}) as Record<string, string>;
  return {
    id: user.id,
    email: user.email ?? null,
    fullName: deriveFirstName(user.email, meta),
    isApprovedAdmin: isApprovedAdminEmail(user.email),
  } satisfies AdminUser;
}

export async function requireApprovedAdminUser() {
  const user = await getAuthenticatedAdminUser();
  if (!user) {
    redirect("/login?next=%2Fadmin");
  }
  if (!user.isApprovedAdmin) {
    redirect("/login?denied=1&next=%2Fadmin");
  }
  return user;
}
