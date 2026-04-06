import { z } from "zod";

export const publicSupabaseEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

export const serviceRoleSupabaseEnvSchema = publicSupabaseEnvSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
});

export function hasPublicSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function hasServiceRoleSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export function hasIntakeTokenSecret() {
  return Boolean(
    process.env.INTAKE_TOKEN_SECRET &&
      process.env.INTAKE_TOKEN_SECRET.length >= 32,
  );
}

function isValidServiceRoleKey(value: string) {
  if (value.startsWith("sb_secret_")) {
    return true;
  }

  const parts = value.split(".");
  if (parts.length !== 3) {
    return false;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(parts[1], "base64url").toString("utf8"),
    ) as { role?: string };

    return payload.role === "service_role";
  } catch {
    return false;
  }
}

export function getPublicSupabaseEnv() {
  return publicSupabaseEnvSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
}

export function getServiceRoleSupabaseEnv() {
  const env = serviceRoleSupabaseEnvSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });

  if (!isValidServiceRoleKey(env.SUPABASE_SERVICE_ROLE_KEY)) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is configured, but it is not a valid service-role key.",
    );
  }

  return env;
}
