import { notFound } from "next/navigation";

import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AppointmentStatusBadge } from "@/components/appointments/AppointmentStatusBadge";
import { AppointmentConversionForm } from "@/components/appointments/AppointmentConversionForm";
import { AdminBookingRequestActions } from "@/components/booking/AdminBookingRequestActions";
import { BookingRequestStatusBadge } from "@/components/booking/BookingRequestStatusBadge";
import { brand } from "@/lib/brand";
import { formatDateOnly } from "@/lib/dates";
import { getBookingRequestById } from "@/server/booking/queries";
import type { AppointmentStatus } from "@/types/appointment";
import { isFirstVisitServiceSlug } from "@/types/booking";

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
      <p
        className="text-sm uppercase tracking-[0.22em]"
        style={{ color: brand.secondary }}
      >
        {label}
      </p>
      <p className="mt-2 text-base leading-7" style={{ color: brand.textMuted }}>
        {value}
      </p>
    </div>
  );
}

export default async function AdminBookingRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const requestResult = await getBookingRequestById(id);

  if (requestResult.connection === "connected" && !requestResult.data) {
    notFound();
  }

  if (requestResult.connection !== "connected") {
    return (
      <AdminPageShell
        eyebrow="Admin"
        title="Booking request"
        description="The detail route is in place, but the request could not be loaded from Supabase."
      >
        <PlaceholderPanel
          title={
            requestResult.connection === "not_configured"
              ? "Database not connected"
              : "Unable to load booking request"
          }
          body={
            requestResult.message ??
            "Guided Rhythms could not load this booking request right now."
          }
        />
      </AdminPageShell>
    );
  }

  const request = requestResult.data;
  const serviceBlockMinutes = request.requested_service?.total_block_minutes ?? 0;
  const hasClientTypeServiceMismatch =
    !request.is_new_client &&
    isFirstVisitServiceSlug(request.requested_service?.slug);

  return (
    <AdminPageShell
      eyebrow="Admin"
      title={`${request.first_name} ${request.last_name}`}
      description="Review the full booking request, update its status, and convert approved requests into real scheduled appointments."
    >
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div
          className="rounded-[1.75rem] p-6"
          style={{
            backgroundColor: "rgba(255,255,255,0.7)",
            border: `1px solid ${brand.border}`,
          }}
        >
          <div
            className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between"
            style={{ borderColor: brand.border }}
          >
            <div>
              <p
                className="text-sm uppercase tracking-[0.22em]"
                style={{ color: brand.secondary }}
              >
                Request details
              </p>
              <p className="mt-3 text-sm leading-6" style={{ color: brand.textMuted }}>
                Submitted {formatDateTime(request.created_at)}
              </p>
            </div>
            <BookingRequestStatusBadge status={request.status} />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <DetailRow label="Email" value={request.email} />
            <DetailRow label="Phone" value={request.phone} />
            <DetailRow
              label="Client type"
              value={request.is_new_client ? "New client" : "Returning client"}
            />
            <DetailRow
              label="Linked client id"
              value={request.client_id || "Not linked"}
            />
            <DetailRow
              label="Service"
              value={request.requested_service?.name ?? "No service selected"}
            />
            <DetailRow
              label="Requested service id"
              value={request.requested_service_id || "Not provided"}
            />
            <DetailRow
              label="Requested therapist id"
              value={request.requested_therapist_id || "Not provided"}
            />
            <DetailRow
              label="Preferred date 1"
              value={formatDateOnly(request.preferred_date_1)}
            />
            <DetailRow
              label="Preferred date 2"
              value={formatDateOnly(request.preferred_date_2)}
            />
            <DetailRow
              label="Preferred date 3"
              value={formatDateOnly(request.preferred_date_3)}
            />
            <DetailRow
              label="Preferred days"
              value={request.preferred_days?.join(", ") ?? "Not provided"}
            />
            <DetailRow
              label="Preferred times"
              value={request.preferred_times?.join(", ") ?? "Not provided"}
            />
            <DetailRow
              label="Referral source"
              value={request.referral_source || "Not provided"}
            />
            <DetailRow label="Pain points" value={request.pain_points || "Not provided"} />
            <DetailRow label="Goals" value={request.goals || "Not provided"} />
            <DetailRow label="Client notes" value={request.notes || "Not provided"} />
            <DetailRow label="Reviewed by" value={request.reviewed_by || "Not assigned"} />
            <DetailRow
              label="Review timestamp"
              value={formatDateTime(request.reviewed_at)}
            />
            <DetailRow label="Updated at" value={formatDateTime(request.updated_at)} />
            <DetailRow
              label="Linked appointment"
              value={request.appointment?.id || "Not created"}
            />
          </div>
        </div>

        <div className="space-y-6">
          {hasClientTypeServiceMismatch ? (
            <section
              className="rounded-[1.75rem] p-6"
              style={{
                backgroundColor: "rgba(255,245,234,0.86)",
                border: `1px solid ${brand.border}`,
              }}
            >
              <p
                className="text-sm uppercase tracking-[0.24em]"
                style={{ color: brand.secondary }}
              >
                Service mismatch
              </p>
              <p className="mt-3 text-sm leading-6" style={{ color: brand.textMuted }}>
                This request is marked as returning client but selected First Visit
                Therapeutic Massage, which is reserved for new clients. Review the
                request before moving forward.
              </p>
            </section>
          ) : null}

          <AdminBookingRequestActions
            id={request.id}
            status={request.status}
            adminNotes={request.admin_notes}
          />

          {request.appointment ? (
            <section
              className="rounded-[1.75rem] p-6"
              style={{
                backgroundColor: "rgba(255,255,255,0.68)",
                border: `1px solid ${brand.border}`,
              }}
            >
              <p
                className="text-sm uppercase tracking-[0.24em]"
                style={{ color: brand.secondary }}
              >
                Appointment created
              </p>
              <div className="mt-3">
                <AppointmentStatusBadge
                  status={request.appointment.status as AppointmentStatus}
                />
              </div>
              <p className="mt-4 text-sm leading-6" style={{ color: brand.textMuted }}>
                {formatDateOnly(request.appointment.appointment_date)} |{" "}
                {request.appointment.start_time} - {request.appointment.end_time}
              </p>
              <a
                href={`/admin/appointments/${request.appointment.id}`}
                className="mt-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.82)",
                  border: `1px solid ${brand.border}`,
                }}
              >
                View appointment
              </a>
            </section>
          ) : null}

          {request.status === "approved" && !request.appointment ? (
            <section
              className="rounded-[1.75rem] p-6"
              style={{
                backgroundColor: "rgba(255,255,255,0.68)",
                border: `1px solid ${brand.border}`,
              }}
            >
              <p
                className="text-sm uppercase tracking-[0.24em]"
                style={{ color: brand.secondary }}
              >
                Create appointment
              </p>
              <p className="mt-3 text-sm leading-6" style={{ color: brand.textMuted }}>
                Approved requests can be converted into one real scheduled
                appointment. End time is derived from the selected service block.
              </p>
              <div className="mt-6">
                <AppointmentConversionForm
                  bookingRequestId={request.id}
                  serviceBlockMinutes={serviceBlockMinutes}
                  defaultPriceCents={
                    request.requested_service?.base_price_cents ?? 0
                  }
                  defaultLocationType="office"
                />
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </AdminPageShell>
  );
}
