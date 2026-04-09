"use client";

import { useState } from "react";
import StepTherapist from "./steps/StepTherapist";
import StepService from "./steps/StepService";
import StepDateTime from "./steps/StepDateTime";
import StepContact from "./steps/StepContact";
import StepConfirm from "./steps/StepConfirm";

export interface BookingState {
  therapistId: string;
  therapistName: string;
  serviceId: string;
  serviceName: string;
  durationMinutes: number;
  priceCents: number;
  date: string;       // "YYYY-MM-DD"
  startTime: string;  // "HH:MM"
  endTime: string;    // "HH:MM"
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

const EMPTY: BookingState = {
  therapistId: "", therapistName: "",
  serviceId: "", serviceName: "", durationMinutes: 0, priceCents: 0,
  date: "", startTime: "", endTime: "",
  firstName: "", lastName: "", email: "", phone: "", notes: "",
};

const STEPS = ["Therapist", "Service", "Date & Time", "Your Info", "Confirm"];

interface Props {
  therapists: { id: string; full_name: string; bio: string; specialty: string }[];
  services: { id: string; name: string; description: string; hands_on_minutes: number; base_price_cents: number; slug: string }[];
}

export default function BookingFlow({ therapists, services }: Props) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<BookingState>(EMPTY);

  function update(patch: Partial<BookingState>) {
    setState((s) => ({ ...s, ...patch }));
  }

  function next() { setStep((s) => Math.min(s + 1, STEPS.length - 1)); }
  function back() { setStep((s) => Math.max(s - 1, 0)); }

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", paddingTop: "6rem", paddingBottom: "6rem" }}>
      {/* Progress bar */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 1.5rem 3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {STEPS.map((label, i) => (
            <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: i <= step ? "var(--gold)" : "var(--border-med, rgba(30,40,32,0.12))",
                color: i <= step ? "#fff" : "var(--text-soft)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 500, transition: "background 0.3s",
                zIndex: 1, position: "relative",
              }}>
                {i < step ? "✓" : i + 1}
              </div>
              <span style={{
                marginTop: 6, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
                color: i === step ? "var(--gold)" : "var(--text-soft)",
                fontFamily: "var(--font-sans)",
              }}>
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div style={{
                  position: "absolute",
                  height: 1,
                  background: i < step ? "var(--gold)" : "var(--border)",
                  transition: "background 0.3s",
                }} />
              )}
            </div>
          ))}
        </div>
        {/* Connector line */}
        <div style={{ position: "relative", marginTop: -42, height: 1, display: "flex" }}>
          {STEPS.slice(0, -1).map((_, i) => (
            <div key={i} style={{
              flex: 1,
              height: 1,
              marginTop: 14,
              background: i < step ? "var(--gold)" : "rgba(30,40,32,0.12)",
              transition: "background 0.3s",
            }} />
          ))}
        </div>
      </div>

      {/* Step content */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 1.5rem" }}>
        {step === 0 && <StepTherapist therapists={therapists} state={state} update={update} onNext={next} />}
        {step === 1 && <StepService services={services} state={state} update={update} onNext={next} onBack={back} />}
        {step === 2 && <StepDateTime state={state} update={update} onNext={next} onBack={back} />}
        {step === 3 && <StepContact state={state} update={update} onNext={next} onBack={back} />}
        {step === 4 && <StepConfirm state={state} onBack={back} />}
      </div>
    </div>
  );
}
