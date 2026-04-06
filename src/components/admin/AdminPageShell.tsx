import type { ReactNode } from "react";

import { brand } from "@/lib/brand";

type AdminPageShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function AdminPageShell({
  eyebrow,
  title,
  description,
  children,
}: AdminPageShellProps) {
  return (
    <section className="space-y-6">
      <div>
        {eyebrow ? (
          <p
            className="text-xs uppercase tracking-[0.32em]"
            style={{ color: brand.secondary }}
          >
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7" style={{ color: brand.textMuted }}>
          {description}
        </p>
      </div>

      {children ? children : null}
    </section>
  );
}
