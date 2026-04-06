import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPlaceholderCard } from "@/components/admin/AdminPlaceholderCard";

export default function AdminIntakesPage() {
  return (
    <AdminPageShell
      eyebrow="Admin"
      title="Intakes"
      description="This route is reserved for intake review and processing. Intake form rendering and submission are not part of this slice."
    >
      <AdminPlaceholderCard
        title="Intake scaffold"
        body="Submission review, completeness checks, and staff actions will be added once intake workflows are implemented."
      />
    </AdminPageShell>
  );
}
