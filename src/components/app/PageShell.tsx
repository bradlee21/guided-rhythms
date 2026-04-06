import type { ReactNode } from "react";

import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
};

export function PageShell({
  eyebrow,
  title,
  description,
  children,
  className,
}: PageShellProps) {
  return (
    <main className={cn("min-h-screen px-6 py-16 md:px-10 lg:px-16", className)}>
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <section
          className="overflow-hidden rounded-[2rem] px-8 py-10 md:px-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.78), rgba(255,255,255,0.52))",
            border: `1px solid ${brand.border}`,
            boxShadow: "0 20px 50px rgba(47,58,44,0.06)",
          }}
        >
          {eyebrow ? (
            <p
              className="text-xs uppercase tracking-[0.32em]"
              style={{ color: brand.secondary }}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8" style={{ color: brand.textMuted }}>
            {description}
          </p>
        </section>

        {children ? children : null}
      </div>
    </main>
  );
}
