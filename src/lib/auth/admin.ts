import "server-only";

import { redirect } from "next/navigation";

import { isApprovedAdminEmail } from "@/lib/auth/admin-access";
import { hasPublicSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export type AdminUser = {
  id: string;
  email: string | null;
  isApprovedAdmin: boolean;
};

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

  return {
    id: user.id,
    email: user.email ?? null,
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
