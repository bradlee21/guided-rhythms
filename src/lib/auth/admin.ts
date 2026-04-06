import "server-only";

import { redirect } from "next/navigation";

import { hasPublicSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export type AdminUser = {
  id: string;
  email: string | null;
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
  } satisfies AdminUser;
}

export async function requireAuthenticatedAdminUser() {
  const user = await getAuthenticatedAdminUser();

  if (!user) {
    redirect("/login?next=%2Fadmin");
  }

  return user;
}
