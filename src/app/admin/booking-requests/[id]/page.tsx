import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPlaceholderCard } from "@/components/admin/AdminPlaceholderCard";

export default async function AdminBookingRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AdminPageShell
      eyebrow="Admin"
      title={`Booking request ${id}`}
      description="This detail route is scaffolded for future request review and action handling. It does not load request data yet."
    >
      <AdminPlaceholderCard
        title="Detail shell"
        body="Review, approval, decline, and scheduling actions are intentionally not implemented in this foundation slice."
      />
    </AdminPageShell>
  );
}
