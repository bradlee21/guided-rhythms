import type { ReactNode } from "react";

import { brand } from "@/lib/brand";

type PlaceholderPanelProps = {
  title: string;
  body: string;
  children?: ReactNode;
};

export function PlaceholderPanel({
  title,
  body,
  children,
}: PlaceholderPanelProps) {
  return (
    <section
      className="rounded-[1.75rem] p-6 md:p-8"
      style={{
        backgroundColor: "rgba(255,255,255,0.64)",
        border: `1px solid ${brand.border}`,
        boxShadow: "0 18px 40px rgba(47,58,44,0.05)",
      }}
    >
      <h2 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h2>
      <p className="mt-3 max-w-2xl text-base leading-7" style={{ color: brand.textMuted }}>
        {body}
      </p>
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}
