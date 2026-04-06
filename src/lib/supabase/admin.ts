import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getServiceRoleSupabaseEnv } from "@/lib/supabase/env";

export function createAdminClient() {
  const env = getServiceRoleSupabaseEnv();

  return createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
