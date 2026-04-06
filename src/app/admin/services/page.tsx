import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPlaceholderCard } from "@/components/admin/AdminPlaceholderCard";

export default function AdminServicesPage() {
  return (
    <AdminPageShell
      eyebrow="Admin"
      title="Services"
      description="This route is reserved for practice service configuration and future public-service content management."
    >
      <AdminPlaceholderCard
        title="Service configuration scaffold"
        body="Editable service definitions, pricing, durations, and display settings will be built later."
      />
    </AdminPageShell>
  );
}
