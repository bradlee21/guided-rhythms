import { brand } from "@/lib/brand";
import { bookingRequestStatusMeta } from "@/lib/status/booking-request";
import type { BookingRequestStatus } from "@/types/booking";

export function BookingRequestStatusBadge({
  status,
}: {
  status: BookingRequestStatus;
}) {
  const meta = bookingRequestStatusMeta[status];

  return (
    <span
      className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
      style={{
        backgroundColor: meta.tone,
        border: `1px solid ${brand.border}`,
      }}
    >
      {meta.label}
    </span>
  );
}
