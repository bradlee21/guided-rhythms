import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPlaceholderCard } from "@/components/admin/AdminPlaceholderCard";

export default async function AdminIntakeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AdminPageShell
      eyebrow="Admin"
      title={`Intake ${id}`}
      description="This detail route is reserved for future intake review. It currently exists only as a stable scaffold."
    >
      <AdminPlaceholderCard
        title="Detail shell"
        body="Clinical review, client confirmation, and intake-to-appointment connections are deferred."
      />
    </AdminPageShell>
  );
}
