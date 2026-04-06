"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { brand } from "@/lib/brand";
import { markIntakeReviewed } from "@/server/intakes/actions";
import { IntakeStatusBadge } from "@/components/intake/IntakeStatusBadge";
import type { IntakeStatus } from "@/types/intake";

export function AdminIntakeActions({
  id,
  status,
}: {
  id: string;
  status: IntakeStatus;
}) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <section
      className="rounded-[1.75rem] p-6"
      style={{
        backgroundColor: "rgba(255,255,255,0.68)",
        border: `1px solid ${brand.border}`,
      }}
    >
      <p className="text-sm uppercase tracking-[0.24em]" style={{ color: brand.secondary }}>
        Intake review
      </p>
      <div className="mt-3">
        <IntakeStatusBadge status={status} />
      </div>
      <p className="mt-4 text-sm leading-6" style={{ color: brand.textMuted }}>
        {message ?? "Once you have reviewed the answers, mark this intake as reviewed so the appointment reflects that status."}
      </p>
      <button
        type="button"
        disabled={isPending || status === "reviewed" || status !== "completed"}
        onClick={() =>
          startTransition(async () => {
            setMessage(null);
            try {
              await markIntakeReviewed({ id });
              setMessage("Intake marked as reviewed.");
              router.refresh();
            } catch {
              setMessage("Unable to mark this intake as reviewed right now.");
            }
          })
        }
        className="mt-5 rounded-full px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        style={{
          background: `linear-gradient(to right, ${brand.primary}, ${brand.accent})`,
        }}
      >
        {isPending ? "Saving..." : "Mark reviewed"}
      </button>
    </section>
  );
}
