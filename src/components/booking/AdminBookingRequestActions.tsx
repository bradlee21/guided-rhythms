"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { BookingRequestStatusBadge } from "@/components/booking/BookingRequestStatusBadge";
import { brand } from "@/lib/brand";
import {
  updateBookingRequestAdminNotes,
  updateBookingRequestStatus,
} from "@/server/booking/actions";
import type { BookingRequestStatus } from "@/types/booking";

const reviewStatuses: BookingRequestStatus[] = [
  "under_review",
  "approved",
  "declined",
  "expired",
];

export function AdminBookingRequestActions({
  id,
  status,
  adminNotes,
}: {
  id: string;
  status: BookingRequestStatus;
  adminNotes: string | null;
}) {
  const router = useRouter();
  const [notes, setNotes] = useState(adminNotes ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [isStatusPending, startStatusTransition] = useTransition();
  const [isNotesPending, startNotesTransition] = useTransition();

  return (
    <section
      className="rounded-[1.75rem] p-6"
      style={{
        backgroundColor: "rgba(255,255,255,0.68)",
        border: `1px solid ${brand.border}`,
      }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p
            className="text-sm uppercase tracking-[0.24em]"
            style={{ color: brand.secondary }}
          >
            Review actions
          </p>
          <div className="mt-3">
            <BookingRequestStatusBadge status={status} />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {reviewStatuses.map((nextStatus) => (
            <button
              key={nextStatus}
              type="button"
              disabled={isStatusPending || status === nextStatus}
              onClick={() =>
                startStatusTransition(async () => {
                  setMessage(null);
                  try {
                    await updateBookingRequestStatus({ id, status: nextStatus });
                    setMessage("Status updated.");
                    router.refresh();
                  } catch {
                    setMessage("Unable to update the request status right now.");
                  }
                })
              }
              className="rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-60"
              style={{
                backgroundColor: "rgba(255,255,255,0.82)",
                border: `1px solid ${brand.border}`,
              }}
            >
              Mark {nextStatus.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium" htmlFor="admin_notes">
          Admin notes
        </label>
        <textarea
          id="admin_notes"
          rows={6}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="mt-2 w-full rounded-2xl px-4 py-3 outline-none"
          style={{
            backgroundColor: "rgba(255,255,255,0.82)",
            border: `1px solid ${brand.border}`,
          }}
        />
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm leading-6" style={{ color: brand.textMuted }}>
            {message ?? "Admin notes are stored on the booking request record."}
          </p>
          <button
            type="button"
            disabled={isNotesPending}
            onClick={() =>
              startNotesTransition(async () => {
                setMessage(null);
                try {
                  await updateBookingRequestAdminNotes({ id, admin_notes: notes });
                  setMessage("Admin notes saved.");
                  router.refresh();
                } catch {
                  setMessage("Unable to save admin notes right now.");
                }
              })
            }
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            style={{
              background: `linear-gradient(to right, ${brand.primary}, ${brand.accent})`,
            }}
          >
            {isNotesPending ? "Saving..." : "Save admin notes"}
          </button>
        </div>
      </div>
    </section>
  );
}
