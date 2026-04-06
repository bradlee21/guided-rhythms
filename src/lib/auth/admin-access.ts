function parseAdminEmailAllowlist(value: string | undefined) {
  if (!value) {
    return [] as string[];
  }

  return value
    .split(/[\n,;]+/)
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function normalizeAdminEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() ?? null;
}

export function getAdminEmailAllowlist() {
  return parseAdminEmailAllowlist(process.env.ADMIN_EMAIL_ALLOWLIST);
}

export function isApprovedAdminEmail(email: string | null | undefined) {
  const normalizedEmail = normalizeAdminEmail(email);

  if (!normalizedEmail) {
    return false;
  }

  return getAdminEmailAllowlist().includes(normalizedEmail);
}
