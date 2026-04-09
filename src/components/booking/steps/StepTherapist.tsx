"use client";

import { BookingState } from "../BookingFlow";

interface Props {
  therapists: { id: string; full_name: string; bio: string; specialty: string }[];
  state: BookingState;
  update: (patch: Partial<BookingState>) => void;
  onNext: () => void;
}

export default function StepTherapist({ therapists, state, update, onNext }: Props) {
  return (
    <div>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-soft)", marginBottom: 8 }}>
        Step 1
      </p>
      <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--text)", marginBottom: "2rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
        Choose your therapist
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {therapists.map((t) => {
          const selected = state.therapistId === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                update({ therapistId: t.id, therapistName: t.full_name });
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
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 400, color: "var(--text)", marginBottom: 4 }}>
                {t.full_name}
              </div>
              {t.specialty && (
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>
                  {t.specialty}
                </div>
              )}
              {t.bio && (
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, fontWeight: 300 }}>
                  {t.bio}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
