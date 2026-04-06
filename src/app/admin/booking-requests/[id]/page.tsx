import { notFound } from "next/navigation";

import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminBookingRequestActions } from "@/components/booking/AdminBookingRequestActions";
import { BookingRequestStatusBadge } from "@/components/booking/BookingRequestStatusBadge";
import { brand } from "@/lib/brand";
import { getBookingRequestById } from "@/server/booking/queries";

export const dynamic = "force-dynamic";

function formatDate(value: string | null) {
  if (!value) {
    return "Not provided";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "Not reviewed yet";
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

  return (
    <AdminPageShell
      eyebrow="Admin"
      title={`${request.first_name} ${request.last_name}`}
      description="Review the full booking request, update its status, and store internal notes for the next step in the scheduling process."
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
            <DetailRow label="Preferred date 1" value={formatDate(request.preferred_date_1)} />
            <DetailRow label="Preferred date 2" value={formatDate(request.preferred_date_2)} />
            <DetailRow label="Preferred date 3" value={formatDate(request.preferred_date_3)} />
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
            <DetailRow label="Review timestamp" value={formatDateTime(request.reviewed_at)} />
            <DetailRow label="Updated at" value={formatDateTime(request.updated_at)} />
          </div>
        </div>

        <div className="space-y-6">
          <AdminBookingRequestActions
            id={request.id}
            status={request.status}
            adminNotes={request.admin_notes}
          />
        </div>
      </section>
    </AdminPageShell>
  );
}
