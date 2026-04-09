"use client";

import { useState } from "react";
import { BookingState } from "../BookingFlow";

interface Props {
  state: BookingState;
  update: (patch: Partial<BookingState>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

// Generate next 30 days (skipping Sundays) as selectable dates
function getSelectableDates(): string[] {
  const dates: string[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1); // start tomorrow
  while (dates.length < 30) {
    if (d.getDay() !== 0) { // skip Sundays
      dates.push(d.toISOString().slice(0, 10));
    }
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

function formatDate(iso: string) {
  const [y, m, day] = iso.split("-").map(Number);
  const d = new Date(y, m - 1, day);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

export default function StepDateTime({ state, update, onNext, onBack }: Props) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const dates = getSelectableDates();

  async function selectDate(date: string) {
    update({ date, startTime: "", endTime: "" });
    setLoading(true);
    try {
      const res = await fetch(
        `/api/booking/slots?therapistId=${state.therapistId}&date=${date}&duration=${state.durationMinutes}`
      );
      const data = await res.json();
      setSlots(data.slots ?? []);
    } catch {
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }

  function selectSlot(slot: TimeSlot) {
    update({ startTime: slot.start, endTime: slot.end });
    onNext();
  }

  return (
    <div>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-soft)", marginBottom: 8 }}>
        Step 3
      </p>
      <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--text)", marginBottom: "2rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
        Pick a date & time
      </h2>

      {/* Date picker */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={labelStyle}>Date</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {dates.map((d) => (
            <button
              key={d}
              onClick={() => selectDate(d)}
              style={{
                padding: "0.5rem 0.85rem",
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                border: state.date === d ? "1px solid var(--gold)" : "1px solid var(--border-med, rgba(30,40,32,0.12))",
                background: state.date === d ? "var(--gold-pale, rgba(200,136,26,0.06))" : "rgba(255,255,255,0.5)",
                color: state.date === d ? "var(--gold)" : "var(--text-muted)",
                borderRadius: 2,
                cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              {formatDate(d)}
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      {state.date && (
        <div style={{ marginBottom: "2rem" }}>
          <p style={labelStyle}>Available times</p>
          {loading ? (
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-soft)" }}>Loading…</p>
          ) : slots.filter(s => s.available).length === 0 ? (
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-muted)" }}>
              No available times for this date. Please choose another day.
            </p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {slots.filter(s => s.available).map((slot) => (
                <button
                  key={slot.start}
                  onClick={() => selectSlot(slot)}
                  style={{
                    padding: "0.5rem 1rem",
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    border: state.startTime === slot.start ? "1px solid var(--gold)" : "1px solid var(--border-med, rgba(30,40,32,0.12))",
                    background: state.startTime === slot.start ? "var(--gold-pale)" : "rgba(255,255,255,0.5)",
                    color: state.startTime === slot.start ? "var(--gold)" : "var(--text-muted)",
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                >
                  {formatTime(slot.start)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <button onClick={onBack} style={backBtnStyle}>← Back</button>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 11,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "var(--text-soft)",
  marginBottom: 10,
};

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
