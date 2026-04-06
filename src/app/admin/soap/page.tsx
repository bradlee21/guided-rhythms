import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPlaceholderCard } from "@/components/admin/AdminPlaceholderCard";

export default function AdminSoapPage() {
  return (
    <AdminPageShell
      eyebrow="Admin"
      title="SOAP notes"
      description="This route reserves the charting area for future SOAP note workflows. Documentation logic is not implemented yet."
    >
      <AdminPlaceholderCard
        title="SOAP scaffold"
        body="Templates, note editing, and note review are intentionally deferred in this foundation slice."
      />
    </AdminPageShell>
  );
}
