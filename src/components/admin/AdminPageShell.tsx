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
    <section style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <div>
        {eyebrow && (
          <p style={{
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: brand.textSoft,
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: "12px",
          }}>
            {eyebrow}
          </p>
        )}
        <div style={{ width: "40px", height: "1px", background: brand.gold, marginBottom: "16px" }} />
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(32px, 4vw, 48px)",
          fontWeight: 300,
          color: brand.text,
          letterSpacing: "-0.02em",
          lineHeight: 1.08,
          marginBottom: "12px",
        }}>
          {title}
        </h1>
        <p style={{
          fontSize: "15px",
          lineHeight: 1.7,
          color: brand.textMuted,
          fontFamily: "'DM Sans', sans-serif",
          maxWidth: "600px",
        }}>
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}
