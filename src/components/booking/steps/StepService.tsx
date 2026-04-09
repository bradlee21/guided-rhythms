"use client";

import { BookingState } from "../BookingFlow";

interface Service {
  id: string;
  name: string;
  description: string;
  hands_on_minutes: number;
  base_price_cents: number;
  slug: string;
}

interface Props {
  services: Service[];
  state: BookingState;
  update: (patch: Partial<BookingState>) => void;
  onNext: () => void;
  onBack: () => void;
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(0)}`;
}

export default function StepService({ services, state, update, onNext, onBack }: Props) {
  return (
    <div>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-soft)", marginBottom: 8 }}>
        Step 2
      </p>
      <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--text)", marginBottom: "2rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
        Select a service
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        {services.map((svc) => {
          const selected = state.serviceId === svc.id;
          return (
            <button
              key={svc.id}
              onClick={() => {
                update({
                  serviceId: svc.id,
                  serviceName: svc.name,
                  durationMinutes: svc.hands_on_minutes,
                  priceCents: svc.base_price_cents,
                });
                onNext();
              }}
              style={{
                textAlign: "left",
                padding: "1.5rem",
                border: selected ? "1px solid var(--gold)" : "1px solid var(--border-med, rgba(30,40,32,0.12))",
                background: selected ? "var(--gold-pale, rgba(200,136,26,0.06))" : "rgba(255,255,255,0.5)",
                borderRadius: 2,
                cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 400, color: "var(--text)" }}>
                  {svc.name}
                </span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--gold)", fontWeight: 400 }}>
                  {formatPrice(svc.base_price_cents)}
                </span>
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-soft)", letterSpacing: "0.08em", marginBottom: 8 }}>
                {svc.hands_on_minutes} min
              </div>
              {svc.description && (
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, fontWeight: 300 }}>
                  {svc.description}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <button onClick={onBack} style={backBtnStyle}>← Back</button>
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
