import { brand } from "@/lib/brand";
import { appointmentStatusMeta } from "@/lib/status/appointment";
import type { AppointmentStatus } from "@/types/appointment";

export function AppointmentStatusBadge({
  status,
}: {
  status: AppointmentStatus;
}) {
  const meta = appointmentStatusMeta[status];

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
