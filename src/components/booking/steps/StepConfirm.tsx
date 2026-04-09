"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookingState } from "../BookingFlow";

interface Props {
  state: BookingState;
  onBack: () => void;
}

function formatDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function formatTime(t: string) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(0)}`;
}

export default function StepConfirm({ state, onBack }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleConfirm() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/booking/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          therapistId: state.therapistId,
          serviceId: state.serviceId,
          date: state.date,
          startTime: state.startTime,
          endTime: state.endTime,
          durationMinutes: state.durationMinutes,
          priceCents: state.priceCents,
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          phone: state.phone,
          notes: state.notes,
        }),
      });
      if (!res.ok) {
        const body = await res.json();
        setError(body.error ?? "Something went wrong. Please try again.");
        return;
      }
      router.push("/booking/success");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const rows = [
    ["Therapist", state.therapistName],
    ["Service", state.serviceName],
    ["Duration", `${state.durationMinutes} min`],
    ["Date", formatDate(state.date)],
    ["Time", `${formatTime(state.startTime)} – ${formatTime(state.endTime)}`],
    ["Price", formatPrice(state.priceCents)],
    ["Name", `${state.firstName} ${state.lastName}`],
    ["Email", state.email],
    ["Phone", state.phone],
    ...(state.notes ? [["Notes", state.notes]] : []),
  ];

  return (
    <div>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-soft)", marginBottom: 8 }}>
        Step 5
      </p>
      <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--text)", marginBottom: "2rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
        Confirm your booking
      </h2>

      {/* Summary table */}
      <div style={{ border: "1px solid rgba(30,40,32,0.12)", borderRadius: 2, overflow: "hidden", marginBottom: "2rem" }}>
        {rows.map(([label, value], i) => (
          <div key={label} style={{
            display: "grid",
            gridTemplateColumns: "130px 1fr",
            padding: "0.85rem 1.25rem",
            background: i % 2 === 0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)",
            borderBottom: i < rows.length - 1 ? "1px solid rgba(30,40,32,0.06)" : "none",
          }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-soft)", paddingTop: 2 }}>
              {label}
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text)", fontWeight: 300, lineHeight: 1.6 }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#c0392b", marginBottom: "1rem" }}>
          {error}
        </p>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={onBack} disabled={submitting} style={backBtnStyle}>← Back</button>
        <button onClick={handleConfirm} disabled={submitting} style={submitBtnStyle}>
          {submitting ? "Booking…" : "Confirm booking"}
        </button>
      </div>

      <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-soft)", marginTop: "1.5rem", lineHeight: 1.7 }}>
        By confirming you agree to our cancellation policy. A confirmation email will be sent to {state.email}.
      </p>
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
