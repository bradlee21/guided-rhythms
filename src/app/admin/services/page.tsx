import { createServiceClient } from "@/lib/supabase/server";
import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import ServicesManager from "@/components/admin/ServicesManager";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  await requireApprovedAdminUser();
  const supabase = await createServiceClient();

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("sort_order");

  return (
    <AdminPageShell
      eyebrow="Configuration"
      title="Services"
      description="Manage your service offerings and pricing."
    >
      <ServicesManager services={services ?? []} />
    </AdminPageShell>
  );
}
