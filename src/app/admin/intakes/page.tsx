import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminIntakeList } from "@/components/intake/AdminIntakeList";
import { listIntakes } from "@/server/intakes/queries";

export const dynamic = "force-dynamic";

export default async function AdminIntakesPage() {
  const result = await listIntakes();

  return (
    <AdminPageShell
      eyebrow="Admin"
      title="Intakes"
      description="Review intake completion, identify health and safety notes, and mark submitted forms as reviewed."
    >
      {result.connection === "connected" ? (
        <AdminIntakeList intakes={result.data} />
      ) : (
        <PlaceholderPanel
          title={
            result.connection === "not_configured"
              ? "Database not connected"
              : "Unable to load intakes"
          }
          body={result.message ?? "Guided Rhythms could not load intakes right now."}
        />
      )}
    </AdminPageShell>
  );
}
