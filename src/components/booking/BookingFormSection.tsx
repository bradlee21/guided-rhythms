import type { ReactNode } from "react";

import { brand } from "@/lib/brand";

export function BookingFormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section
      className="rounded-[1.75rem] p-6 md:p-8"
      style={{
        backgroundColor: "rgba(255,255,255,0.64)",
        border: `1px solid ${brand.border}`,
        boxShadow: "0 18px 40px rgba(47,58,44,0.05)",
      }}
    >
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h2>
        <p className="mt-3 text-base leading-7" style={{ color: brand.textMuted }}>
          {description}
        </p>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
