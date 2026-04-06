import type { BookingRequestStatus } from "@/types/booking";

export const bookingRequestStatusMeta: Record<
  BookingRequestStatus,
  { label: string; tone: string }
> = {
  submitted: {
    label: "Submitted",
    tone: "rgba(201,146,46,0.16)",
  },
  under_review: {
    label: "Under Review",
    tone: "rgba(111,143,85,0.18)",
  },
  approved: {
    label: "Approved",
    tone: "rgba(68,110,73,0.18)",
  },
  declined: {
    label: "Declined",
    tone: "rgba(156,106,42,0.18)",
  },
  expired: {
    label: "Expired",
    tone: "rgba(111,106,92,0.18)",
  },
  converted: {
    label: "Converted",
    tone: "rgba(47,58,44,0.14)",
  },
};

export function getBookingRequestStatusLabel(status: BookingRequestStatus) {
  return bookingRequestStatusMeta[status].label;
}
