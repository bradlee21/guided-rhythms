"use client";

import { useState, useRef } from "react";
import { brand } from "@/lib/brand";

interface Props {
  state: any;
  update: (patch: any) => void;
  onNext: () => void;
  onBack: () => void;
}

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

interface Week {
  label: string;
  days: { iso: string; label: string; dayName: string; dayNum: string; isWeekend: boolean }[];
}

function getWeeks(): Week[] {
  const weeks: Week[] = [];
  const start = new Date();
  start.setDate(start.getDate() + 1);

  // Advance to Monday if not already
  while (start.getDay() !== 1) start.setDate(start.getDate() + 1);

  for (let w = 0; w < 6; w++) {
    const weekDays = [];
    const weekStart = new Date(start);

    for (let d = 0; d < 5; d++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + d);
      const iso = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
      weekDays.push({
        iso,
        label: day.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        dayName: day.toLocaleDateString("en-US", { weekday: "short" }),
        dayNum: day.toLocaleDateString("en-US", { day: "numeric" }),
        isWeekend: false,
      });
    }

    const monthLabel = weekStart.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    weeks.push({ label: `Week of ${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · ${monthLabel}`, days: weekDays });
    start.setDate(start.getDate() + 7);
  }

  return weeks;
}

function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
}

export default function StepDateTime({ state, update, onNext, onBack }: Props) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [weekIndex, setWeekIndex] = useState(0);
  const weeks = getWeeks();
  const currentWeek = weeks[weekIndex];

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

  const availableSlots = slots.filter((s) => s.available);

  return (
    <div>
      <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "8px" }}>
        Step 3
      </p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: brand.text, marginBottom: "2rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
        Pick a date &amp; time
      </h2>

      {/* Week navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <button
          onClick={() => { setWeekIndex((i) => Math.max(0, i - 1)); update({ date: "", startTime: "", endTime: "" }); setSlots([]); }}
          disabled={weekIndex === 0}
          style={{ fontSize: "13px", color: weekIndex === 0 ? brand.textSoft : brand.text, background: "none", border: "none", cursor: weekIndex === 0 ? "default" : "pointer", fontFamily: "'DM Sans', sans-serif", padding: "0", letterSpacing: "0.04em" }}
        >
          ← Prev week
        </button>
        <p style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>
          {currentWeek.label}
        </p>
        <button
          onClick={() => { setWeekIndex((i) => Math.min(weeks.length - 1, i + 1)); update({ date: "", startTime: "", endTime: "" }); setSlots([]); }}
          disabled={weekIndex === weeks.length - 1}
          style={{ fontSize: "13px", color: weekIndex === weeks.length - 1 ? brand.textSoft : brand.text, background: "none", border: "none", cursor: weekIndex === weeks.length - 1 ? "default" : "pointer", fontFamily: "'DM Sans', sans-serif", padding: "0", letterSpacing: "0.04em" }}
        >
          Next week →
        </button>
      </div>

      {/* Week calendar grid — Mon–Fri only */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", marginBottom: "32px" }}>
        {currentWeek.days.map((day) => {
          const isSelected = state.date === day.iso;
          const isPast = day.iso < new Date().toISOString().slice(0, 10);
          return (
            <button
              key={day.iso}
              onClick={() => !isPast && selectDate(day.iso)}
              disabled={isPast}
              style={{
                padding: "16px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                border: isSelected ? `1px solid ${brand.gold}` : `1px solid ${brand.borderMed}`,
                background: isSelected ? brand.goldPale : isPast ? brand.backgroundSoft : "#ffffff",
                borderRadius: "2px",
                cursor: isPast ? "not-allowed" : "pointer",
                transition: "border-color 0.15s, background 0.15s",
                opacity: isPast ? 0.4 : 1,
              }}
            >
              <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: isSelected ? brand.gold : brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>
                {day.dayName}
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 300, color: isSelected ? brand.gold : brand.text, lineHeight: 1 }}>
                {day.dayNum}
              </span>
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      {state.date && (
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "12px" }}>
            Available times
          </p>
          {loading ? (
            <p style={{ fontSize: "14px", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>Loading…</p>
          ) : availableSlots.length === 0 ? (
            <p style={{ fontSize: "14px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif", padding: "20px 0" }}>
              No available times for this date. Try another day.
            </p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {availableSlots.map((slot) => {
                const isSelected = state.startTime === slot.start;
                return (
                  <button
                    key={slot.start}
                    onClick={() => selectSlot(slot)}
                    style={{
                      padding: "10px 20px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      border: isSelected ? `1px solid ${brand.gold}` : `1px solid ${brand.borderMed}`,
                      background: isSelected ? brand.goldPale : "#ffffff",
                      color: isSelected ? brand.gold : brand.textMuted,
                      borderRadius: "2px",
                      cursor: "pointer",
                      transition: "border-color 0.15s, background 0.15s",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {formatTime(slot.start)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      <button onClick={onBack} style={{ fontSize: "13px", color: brand.textMuted, background: "none", border: "none", cursor: "pointer", padding: "0", letterSpacing: "0.05em", fontFamily: "'DM Sans', sans-serif" }}>
        ← Back
      </button>
    </div>
  );
}
