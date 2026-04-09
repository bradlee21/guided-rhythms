"use client";
import { useState } from "react";
import { brand } from "@/lib/brand";

interface DaySchedule {
  day_of_week: number;
  name: string;
  is_active: boolean;
  start_time: string;
  end_time: string;
}

interface BlockedTime {
  id: string;
  blocked_date: string;
  start_time: string | null;
  end_time: string | null;
  is_full_day: boolean;
  reason: string | null;
}

interface Props {
  therapistId: string;
  schedule: DaySchedule[];
  blocks: BlockedTime[];
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  });
}

export default function AvailabilityManager({ therapistId, schedule, blocks }: Props) {
  const [days, setDays] = useState<DaySchedule[]>(schedule);
  const [blockedList, setBlockedList] = useState<BlockedTime[]>(blocks);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [scheduleError, setScheduleError] = useState("");

  // New block form state
  const [blockDate, setBlockDate] = useState("");
  const [blockFullDay, setBlockFullDay] = useState(true);
  const [blockStart, setBlockStart] = useState("09:00");
  const [blockEnd, setBlockEnd] = useState("17:00");
  const [blockReason, setBlockReason] = useState("");
  const [addingBlock, setAddingBlock] = useState(false);
  const [blockError, setBlockError] = useState("");

  function toggleDay(i: number) {
    setDays((prev) => prev.map((d) => d.day_of_week === i ? { ...d, is_active: !d.is_active } : d));
  }

  function updateTime(i: number, field: "start_time" | "end_time", value: string) {
    setDays((prev) => prev.map((d) => d.day_of_week === i ? { ...d, [field]: value } : d));
  }

  async function saveSchedule() {
    setSaving(true);
    setSaved(false);
    setScheduleError("");
    try {
      const res = await fetch("/api/admin/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ therapistId, days }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setScheduleError("Failed to save schedule. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function addBlock() {
    if (!blockDate) { setBlockError("Please select a date."); return; }
    setAddingBlock(true);
    setBlockError("");
    try {
      const res = await fetch("/api/admin/blocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          therapistId,
          blocked_date: blockDate,
          is_full_day: blockFullDay,
          start_time: blockFullDay ? null : blockStart,
          end_time: blockFullDay ? null : blockEnd,
          reason: blockReason || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to add block");
      const { block } = await res.json();
      setBlockedList((prev) => [...prev, block].sort((a, b) => a.blocked_date.localeCompare(b.blocked_date)));
      setBlockDate("");
      setBlockReason("");
      setBlockFullDay(true);
    } catch {
      setBlockError("Failed to add block. Please try again.");
    } finally {
      setAddingBlock(false);
    }
  }

  async function removeBlock(id: string) {
    try {
      await fetch(`/api/admin/blocks?id=${id}`, { method: "DELETE" });
      setBlockedList((prev) => prev.filter((b) => b.id !== id));
    } catch {
      // silent fail — user can refresh
    }
  }

  const inputStyle = {
    padding: "8px 12px",
    border: `1px solid ${brand.borderMed}`,
    borderRadius: "2px",
    fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif",
    color: brand.text,
    background: "#ffffff",
    outline: "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      {/* Weekly schedule */}
      <div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em" }}>
            Weekly hours
          </h2>
          <button
            onClick={saveSchedule}
            disabled={saving}
            style={{
              padding: "9px 24px",
              background: saved ? brand.sage : brand.forest,
              color: "#F0EBE0",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: "none",
              borderRadius: "2px",
              cursor: saving ? "not-allowed" : "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "background 0.2s",
            }}
          >
            {saving ? "Saving…" : saved ? "Saved" : "Save hours"}
          </button>
        </div>

        {scheduleError && (
          <p style={{ fontSize: "14px", color: "#c0392b", marginBottom: "16px", fontFamily: "'DM Sans', sans-serif" }}>{scheduleError}</p>
        )}

        <div style={{ border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden" }}>
          {days.map((day, i) => (
            <div
              key={day.day_of_week}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                alignItems: "center",
                padding: "16px 24px",
                borderBottom: i < days.length - 1 ? `1px solid ${brand.border}` : "none",
                background: day.is_active ? "#ffffff" : brand.backgroundSoft,
              }}
            >
              {/* Day toggle */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  onClick={() => toggleDay(day.day_of_week)}
                  style={{
                    width: "36px",
                    height: "20px",
                    borderRadius: "10px",
                    background: day.is_active ? brand.forest : brand.borderMed,
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: "2px",
                    left: day.is_active ? "18px" : "2px",
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "#ffffff",
                    transition: "left 0.2s",
                  }} />
                </button>
                <span style={{
                  fontSize: "14px",
                  color: day.is_active ? brand.text : brand.textSoft,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: day.is_active ? 400 : 300,
                }}>
                  {day.name}
                </span>
              </div>

              {/* Time inputs */}
              {day.is_active ? (
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <input
                    type="time"
                    value={day.start_time}
                    onChange={(e) => updateTime(day.day_of_week, "start_time", e.target.value)}
                    style={inputStyle}
                  />
                  <span style={{ fontSize: "14px", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>to</span>
                  <input
                    type="time"
                    value={day.end_time}
                    onChange={(e) => updateTime(day.day_of_week, "end_time", e.target.value)}
                    style={inputStyle}
                  />
                </div>
              ) : (
                <span style={{ fontSize: "13px", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em" }}>
                  Unavailable
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Block time off */}
      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", marginBottom: "20px" }}>
          Block time off
        </h2>

        {/* Add block form */}
        <div style={{ padding: "24px", background: brand.backgroundSoft, border: `1px solid ${brand.border}`, borderRadius: "2px", marginBottom: "20px" }}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>Date</label>
              <input
                type="date"
                value={blockDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setBlockDate(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>Type</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => setBlockFullDay(true)}
                  style={{
                    padding: "8px 16px",
                    fontSize: "13px",
                    border: `1px solid ${blockFullDay ? brand.forest : brand.borderMed}`,
                    background: blockFullDay ? brand.forest : "#ffffff",
                    color: blockFullDay ? "#F0EBE0" : brand.textMuted,
                    borderRadius: "2px",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Full day
                </button>
                <button
                  onClick={() => setBlockFullDay(false)}
                  style={{
                    padding: "8px 16px",
                    fontSize: "13px",
                    border: `1px solid ${!blockFullDay ? brand.forest : brand.borderMed}`,
                    background: !blockFullDay ? brand.forest : "#ffffff",
                    color: !blockFullDay ? "#F0EBE0" : brand.textMuted,
                    borderRadius: "2px",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Time range
                </button>
              </div>
            </div>

            {!blockFullDay && (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>From</label>
                  <input type="time" value={blockStart} onChange={(e) => setBlockStart(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>To</label>
                  <input type="time" value={blockEnd} onChange={(e) => setBlockEnd(e.target.value)} style={inputStyle} />
                </div>
              </>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: "160px" }}>
              <label style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>Reason (optional)</label>
              <input
                type="text"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="e.g. Vacation, personal"
                style={{ ...inputStyle, width: "100%" }}
              />
            </div>

            <button
              onClick={addBlock}
              disabled={addingBlock}
              style={{
                padding: "9px 24px",
                background: brand.forest,
                color: "#F0EBE0",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "none",
                borderRadius: "2px",
                cursor: addingBlock ? "not-allowed" : "pointer",
                fontFamily: "'DM Sans', sans-serif",
                alignSelf: "flex-end",
              }}
            >
              {addingBlock ? "Adding…" : "Add block"}
            </button>
          </div>
          {blockError && (
            <p style={{ fontSize: "14px", color: "#c0392b", marginTop: "12px", fontFamily: "'DM Sans', sans-serif" }}>{blockError}</p>
          )}
        </div>

        {/* Existing blocks */}
        {blockedList.length === 0 ? (
          <div style={{ padding: "32px", textAlign: "center", border: `1px solid ${brand.border}`, borderRadius: "2px", color: brand.textSoft, fontSize: "14px", fontFamily: "'DM Sans', sans-serif", background: brand.backgroundSoft }}>
            No upcoming blocks.
          </div>
        ) : (
          <div style={{ border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden" }}>
            {blockedList.map((block, i) => (
              <div key={block.id} style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr 1fr auto",
                alignItems: "center",
                padding: "16px 24px",
                borderBottom: i < blockedList.length - 1 ? `1px solid ${brand.border}` : "none",
                background: i % 2 === 0 ? "#ffffff" : brand.background,
                gap: "16px",
              }}>
                <span style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>
                  {formatDate(block.blocked_date)}
                </span>
                <span style={{ fontSize: "14px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                  {block.is_full_day ? "Full day" : `${block.start_time?.slice(0, 5)} – ${block.end_time?.slice(0, 5)}`}
                </span>
                <span style={{ fontSize: "14px", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>
                  {block.reason ?? "—"}
                </span>
                <button
                  onClick={() => removeBlock(block.id)}
                  style={{
                    fontSize: "12px",
                    padding: "6px 14px",
                    border: "1px solid rgba(192,57,43,0.3)",
                    color: "#c0392b",
                    background: "transparent",
                    borderRadius: "2px",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
