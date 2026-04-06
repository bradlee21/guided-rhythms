import Link from "next/link";

import { BookingRequestStatusBadge } from "@/components/booking/BookingRequestStatusBadge";
import { brand } from "@/lib/brand";
import type { BookingRequestListItem } from "@/types/booking";

function formatSubmittedDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function BookingRequestList({
  requests,
}: {
  requests: BookingRequestListItem[];
}) {
  if (!requests.length) {
    return (
      <section
        className="rounded-[1.75rem] p-6"
        style={{
          backgroundColor: "rgba(255,255,255,0.68)",
          border: `1px solid ${brand.border}`,
        }}
      >
        <p className="text-base leading-7" style={{ color: brand.textMuted }}>
          No booking requests have been submitted yet.
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Link
          key={request.id}
          href={`/admin/booking-requests/${request.id}`}
          className="block rounded-[1.75rem] p-5 transition hover:translate-y-[-1px]"
          style={{
            backgroundColor: "rgba(255,255,255,0.72)",
            border: `1px solid ${brand.border}`,
            boxShadow: "0 18px 40px rgba(47,58,44,0.05)",
          }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xl font-semibold tracking-[-0.03em]">
                {request.first_name} {request.last_name}
              </p>
              <p className="text-sm leading-6" style={{ color: brand.textMuted }}>
                {request.requested_service?.name ?? "No service selected"} •{" "}
                {request.is_new_client ? "New client" : "Returning client"}
              </p>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              <BookingRequestStatusBadge status={request.status} />
              <p className="text-sm leading-6" style={{ color: brand.textMuted }}>
                Submitted {formatSubmittedDate(request.created_at)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
