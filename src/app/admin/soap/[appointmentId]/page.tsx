import { createServiceClient } from "@/lib/supabase/server";
import { requireApprovedAdminUser } from "@/lib/auth/admin";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { notFound } from "next/navigation";
import SoapNoteEditor from "@/components/admin/SoapNoteEditor";

export const dynamic = "force-dynamic";

export default async function SoapNotePage({
  params,
}: {
  params: Promise<{ appointmentId: string }>;
}) {
  const { appointmentId } = await params;
  const user = await requireApprovedAdminUser();
  const supabase = await createServiceClient();

  const { data: appointment } = await supabase
    .from("appointments")
    .select(`
      id,
      appointment_date,
      start_time,
      end_time,
      therapist_id,
      clients ( id, first_name, last_name, preferred_name ),
      services ( name, hands_on_minutes )
    `)
    .eq("id", appointmentId)
    .eq("therapist_id", user.id)
    .single();

  if (!appointment) notFound();

  const client = appointment.clients as unknown as
    { id: string; first_name: string; last_name: string; preferred_name: string | null } | null;
  const service = appointment.services as unknown as
    { name: string; hands_on_minutes: number | null } | null;

  const { data: existingNote } = await supabase
    .from("soap_notes")
    .select("*")
    .eq("appointment_id", appointmentId)
    .single();

  return (
    <AdminPageShell
      eyebrow="SOAP Notes"
      title={client
        ? `${client.preferred_name ?? client.first_name} ${client.last_name}`
        : "Session notes"}
      description={`${new Date(appointment.appointment_date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · ${service?.name ?? ""}`}
    >
      <SoapNoteEditor
        appointmentId={appointmentId}
        therapistId={user.id}
        clientId={client?.id ?? ""}
        initialNote={existingNote ?? null}
      />
    </AdminPageShell>
  );
}
