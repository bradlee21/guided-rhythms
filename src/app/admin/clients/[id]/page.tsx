import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPlaceholderCard } from "@/components/admin/AdminPlaceholderCard";

export default async function AdminClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AdminPageShell
      eyebrow="Admin"
      title={`Client ${id}`}
      description="This detail route is scaffolded for future client profile and history views. No client data is wired yet."
    >
      <AdminPlaceholderCard
        title="Detail shell"
        body="Client demographics, session history, and intake access will be added in a later slice."
      />
    </AdminPageShell>
  );
}
