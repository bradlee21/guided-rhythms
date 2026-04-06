import Link from "next/link";

import { brand } from "@/lib/brand";
import { formatDateOnly } from "@/lib/dates";
import { IntakeStatusBadge } from "@/components/intake/IntakeStatusBadge";
import type { IntakeListItem } from "@/types/intake";

function formatDateTime(value: string | null) {
  if (!value) {
    return "Not completed";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function AdminIntakeList({ intakes }: { intakes: IntakeListItem[] }) {
  if (!intakes.length) {
    return (
      <section
        className="rounded-[1.75rem] p-6"
        style={{
          backgroundColor: "rgba(255,255,255,0.68)",
          border: `1px solid ${brand.border}`,
        }}
      >
        <p className="text-base leading-7" style={{ color: brand.textMuted }}>
          No intake records are available yet.
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      {intakes.map((intake) => (
        <Link
          key={intake.id}
          href={`/admin/intakes/${intake.id}`}
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
                {intake.client
                  ? `${intake.client.first_name} ${intake.client.last_name}`
                  : "Unknown client"}
              </p>
              <p className="text-sm leading-6" style={{ color: brand.textMuted }}>
                {intake.appointment
                  ? `Appointment ${formatDateOnly(intake.appointment.appointment_date)}`
                  : "Appointment not found"}
              </p>
              <p className="text-sm leading-6" style={{ color: brand.textMuted }}>
                Completed {formatDateTime(intake.completed_at)} | Reviewed{" "}
                {formatDateTime(intake.reviewed_at)}
              </p>
            </div>
            <IntakeStatusBadge status={intake.status} />
          </div>
        </Link>
      ))}
    </div>
  );
}
