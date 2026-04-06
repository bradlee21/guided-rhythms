import type { ReactNode } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
import { requireAuthenticatedAdminUser } from "@/lib/auth/admin";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const adminUser = await requireAuthenticatedAdminUser();

  return <AdminShell adminEmail={adminUser.email}>{children}</AdminShell>;
}
