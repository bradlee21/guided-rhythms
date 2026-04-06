import { brand } from "@/lib/brand";
import { intakeStatusMeta } from "@/lib/status/intake";
import type { IntakeStatus } from "@/types/intake";

export function IntakeStatusBadge({ status }: { status: IntakeStatus }) {
  const meta = intakeStatusMeta[status];

  return (
    <span
      className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
      style={{
        backgroundColor: meta.tone,
        border: `1px solid ${brand.border}`,
      }}
    >
      {meta.label}
    </span>
  );
}
