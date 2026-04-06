import type { ReactNode } from "react";

import { brand } from "@/lib/brand";

type BookingFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export function BookingField({
  label,
  htmlFor,
  error,
  hint,
  children,
}: BookingFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium" htmlFor={htmlFor}>
        {label}
      </label>
      {hint ? (
        <p className="mt-1 text-sm leading-6" style={{ color: brand.textMuted }}>
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p className="mt-2 text-sm" style={{ color: "#8A5A36" }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
