import Link from "next/link";
import { notFound } from "next/navigation";

import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminAppointmentActions } from "@/components/appointments/AdminAppointmentActions";
import { AppointmentStatusBadge } from "@/components/appointments/AppointmentStatusBadge";
import { brand } from "@/lib/brand";
import { formatDateOnly } from "@/lib/dates";
import { formatCentsAsDollars } from "@/lib/format/money";
import { followUpStatusMeta, intakeStatusMeta } from "@/lib/status/appointment";
import { getAppointmentById } from "@/server/appointments/queries";

export const dynamic = "force-dynamic";

function formatDateTime(value: string | null) {
  if (!value) {
    return "Not provided";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.22em]" style={{ color: brand.secondary }}>
        {label}
      </p>
      <p className="mt-2 text-base leading-7" style={{ color: brand.textMuted }}>
        {value}
      </p>
    </div>
  );
}

export default async function AdminAppointmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const appointmentResult = await getAppointmentById(id);

  if (appointmentResult.connection === "connected" && !appointmentResult.data) {
    notFound();
  }

  if (appointmentResult.connection !== "connected") {
    return (
      <AdminPageShell
        eyebrow="Admin"
        title="Appointment"
        description="The detail route is in place, but the appointment could not be loaded from Supabase."
      >
        <PlaceholderPanel
          title={
            appointmentResult.connection === "not_configured"
              ? "Database not connected"
              : "Unable to load appointment"
          }
          body={
            appointmentResult.message ??
            "Guided Rhythms could not load this appointment right now."
          }
        />
      </AdminPageShell>
    );
  }

  if (!appointmentResult.data) {
    notFound();
  }

  const appointment = appointmentResult.data;

  return (
    <AdminPageShell
      eyebrow="Admin"
      title={`${appointment.client?.preferred_name || appointment.client?.first_name || "Appointment"} ${appointment.client?.last_name || ""}`.trim()}
      description="Review the scheduled appointment, confirm its linked booking request and service details, and update visit status or internal notes."
    >
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div
          className="rounded-[1.75rem] p-6"
          style={{
            backgroundColor: "rgba(255,255,255,0.7)",
            border: `1px solid ${brand.border}`,
          }}
        >
          <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between" style={{ borderColor: brand.border }}>
            <div>
              <p className="text-sm uppercase tracking-[0.22em]" style={{ color: brand.secondary }}>
                Appointment summary
              </p>
              <p className="mt-3 text-sm leading-6" style={{ color: brand.textMuted }}>
                Created {formatDateTime(appointment.created_at)}
              </p>
            </div>
            <AppointmentStatusBadge status={appointment.status} />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <DetailRow
              label="Client"
              value={
                appointment.client
                  ? `${appointment.client.preferred_name || appointment.client.first_name} ${appointment.client.last_name}`
                  : "Not available"
              }
            />
            <DetailRow label="Client email" value={appointment.client?.email || "Not available"} />
            <DetailRow label="Client phone" value={appointment.client?.phone || "Not available"} />
            <DetailRow label="Service" value={appointment.service?.name || "Not available"} />
            <DetailRow
              label="Appointment date"
              value={formatDateOnly(appointment.appointment_date)}
            />
            <DetailRow label="Time" value={`${appointment.start_time} - ${appointment.end_time}`} />
            <DetailRow label="Timezone" value={appointment.timezone} />
            <DetailRow label="Location type" value={appointment.location_type} />
            <DetailRow label="Location label" value={appointment.location_label || "Not provided"} />
            <DetailRow
              label="Price"
              value={formatCentsAsDollars(appointment.price_cents)}
            />
            <DetailRow label="Intake status" value={intakeStatusMeta[appointment.intake_status]} />
            <DetailRow label="Follow-up status" value={followUpStatusMeta[appointment.follow_up_status]} />
            <DetailRow
              label="Linked booking request"
              value={appointment.booking_request?.id || "Not linked"}
            />
            <DetailRow label="Confirmed at" value={formatDateTime(appointment.confirmation_sent_at)} />
            <DetailRow label="Reminder sent at" value={formatDateTime(appointment.reminder_sent_at)} />
            <DetailRow label="Cancelled at" value={formatDateTime(appointment.cancelled_at)} />
            <DetailRow label="Cancelled reason" value={appointment.cancelled_reason || "Not cancelled"} />
            <DetailRow label="Updated at" value={formatDateTime(appointment.updated_at)} />
          </div>

          {appointment.booking_request ? (
            <div className="mt-6">
              <Link
                href={`/admin/booking-requests/${appointment.booking_request.id}`}
                className="inline-flex rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.82)",
                  border: `1px solid ${brand.border}`,
                }}
              >
                View linked booking request
              </Link>
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          <AdminAppointmentActions
            id={appointment.id}
            status={appointment.status}
            internalNotes={appointment.internal_notes}
          />
        </div>
      </section>
    </AdminPageShell>
  );
}
