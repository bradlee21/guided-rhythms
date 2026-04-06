"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { AppointmentStatusBadge } from "@/components/appointments/AppointmentStatusBadge";
import { brand } from "@/lib/brand";
import {
  updateAppointmentInternalNotes,
  updateAppointmentStatus,
} from "@/server/appointments/actions";
import type { AppointmentStatus } from "@/types/appointment";

const statusOptions: AppointmentStatus[] = [
  "pending_confirmation",
  "confirmed",
  "intake_pending",
  "ready_for_visit",
  "arrived",
  "in_session",
  "completed",
  "cancelled",
  "no_show",
  "rescheduled",
];

export function AdminAppointmentActions({
  id,
  status,
  internalNotes,
}: {
  id: string;
  status: AppointmentStatus;
  internalNotes: string | null;
}) {
  const router = useRouter();
  const [notes, setNotes] = useState(internalNotes ?? "");
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
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em]" style={{ color: brand.secondary }}>
            Appointment actions
          </p>
          <div className="mt-3">
            <AppointmentStatusBadge status={status} />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {statusOptions.map((nextStatus) => (
            <button
              key={nextStatus}
              type="button"
              disabled={isStatusPending || status === nextStatus}
              onClick={() =>
                startStatusTransition(async () => {
                  setMessage(null);
                  try {
                    await updateAppointmentStatus({ id, status: nextStatus });
                    setMessage("Appointment status updated.");
                    router.refresh();
                  } catch {
                    setMessage("Unable to update appointment status right now.");
                  }
                })
              }
              className="rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-60"
              style={{
                backgroundColor: "rgba(255,255,255,0.82)",
                border: `1px solid ${brand.border}`,
              }}
            >
              Mark {nextStatus.replaceAll("_", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium" htmlFor="appointment_internal_notes">
          Internal notes
        </label>
        <textarea
          id="appointment_internal_notes"
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
            {message ?? "Internal notes stay on the appointment record only."}
          </p>
          <button
            type="button"
            disabled={isNotesPending}
            onClick={() =>
              startNotesTransition(async () => {
                setMessage(null);
                try {
                  await updateAppointmentInternalNotes({
                    id,
                    internal_notes: notes,
                  });
                  setMessage("Internal notes saved.");
                  router.refresh();
                } catch {
                  setMessage("Unable to save internal notes right now.");
                }
              })
            }
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            style={{
              background: `linear-gradient(to right, ${brand.primary}, ${brand.accent})`,
            }}
          >
            {isNotesPending ? "Saving..." : "Save internal notes"}
          </button>
        </div>
      </div>
    </section>
  );
}
