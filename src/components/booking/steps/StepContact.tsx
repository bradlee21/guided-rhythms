"use client";

import { BookingState } from "../BookingFlow";

interface Props {
  state: BookingState;
  update: (patch: Partial<BookingState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepContact({ state, update, onNext, onBack }: Props) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!state.firstName || !state.lastName || !state.email || !state.phone) return;
    onNext();
  }

  return (
    <div>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-soft)", marginBottom: 8 }}>
        Step 4
      </p>
      <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--text)", marginBottom: "2rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
        Your information
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <Field label="First name" value={state.firstName} onChange={(v) => update({ firstName: v })} required />
          <Field label="Last name" value={state.lastName} onChange={(v) => update({ lastName: v })} required />
        </div>
        <Field label="Email" type="email" value={state.email} onChange={(v) => update({ email: v })} required />
        <Field label="Phone" type="tel" value={state.phone} onChange={(v) => update({ phone: v })} required />
        <Field label="Notes or requests (optional)" value={state.notes} onChange={(v) => update({ notes: v })} multiline />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
          <button type="button" onClick={onBack} style={backBtnStyle}>← Back</button>
          <button type="submit" style={submitBtnStyle}>
            Review booking →
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", required = false, multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const sharedStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.65rem 0.85rem",
    fontFamily: "var(--font-sans)",
    fontSize: 15,
    fontWeight: 300,
    color: "var(--text)",
    background: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(30,40,32,0.12)",
    borderRadius: 2,
    outline: "none",
    resize: "vertical",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-soft)" }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          style={sharedStyle}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          style={sharedStyle}
        />
      )}
    </div>
  );
}

const backBtnStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 13,
  color: "var(--text-muted)",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  letterSpacing: "0.05em",
};

const submitBtnStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 13,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#fff",
  background: "var(--gold)",
  border: "none",
  borderRadius: 2,
  padding: "0.75rem 1.75rem",
  cursor: "pointer",
};
