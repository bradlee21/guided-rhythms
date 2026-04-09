"use client";

import { useState, useCallback } from "react";
import { brand } from "@/lib/brand";

interface SoapNote {
  id?: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  private_notes: string;
}

interface Props {
  appointmentId: string;
  therapistId: string;
  clientId: string;
  initialNote: SoapNote | null;
}

const FIELDS: { key: keyof SoapNote; label: string; description: string }[] = [
  {
    key: "subjective",
    label: "Subjective",
    description: "What the client reports — symptoms, pain levels, goals for today, how they've been feeling since last session.",
  },
  {
    key: "objective",
    label: "Objective",
    description: "What you observed and assessed — tissue quality, range of motion, postural findings, areas of tension.",
  },
  {
    key: "assessment",
    label: "Assessment",
    description: "Your clinical interpretation — what's contributing to their presentation, progress toward goals, response to treatment.",
  },
  {
    key: "plan",
    label: "Plan",
    description: "Treatment plan going forward — techniques used today, recommendations, follow-up frequency, home care.",
  },
  {
    key: "private_notes",
    label: "Private notes",
    description: "Internal notes not shared with the client. Observations, reminders, anything you want to remember.",
  },
];

export default function SoapNoteEditor({
  appointmentId,
  therapistId,
  clientId,
  initialNote,
}: Props) {
  const [note, setNote] = useState<SoapNote>(
    initialNote ?? {
      subjective: "",
      objective: "",
      assessment: "",
      plan: "",
      private_notes: "",
    }
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(
    initialNote ? new Date() : null
  );

  const update = useCallback((key: keyof SoapNote, value: string) => {
    setNote((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }, []);

  async function save() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/soap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId,
          therapistId,
          clientId,
          ...note,
        }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "Failed to save");
      }
      const { soapNote } = await res.json();
      setNote(soapNote);
      setSaved(true);
      setLastSaved(new Date());
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const textareaStyle = {
    width: "100%",
    minHeight: "120px",
    padding: "14px 16px",
    border: `1px solid ${brand.borderMed}`,
    borderRadius: "2px",
    fontSize: "15px",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 300,
    color: brand.text,
    background: "#ffffff",
    resize: "vertical" as const,
    lineHeight: 1.7,
    outline: "none",
  };

  return (
    <div>
      {/* Save bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "32px",
        padding: "16px 24px",
        background: brand.backgroundSoft,
        border: `1px solid ${brand.border}`,
        borderRadius: "2px",
      }}>
        <div style={{ fontSize: "13px", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>
          {lastSaved
            ? `Last saved ${lastSaved.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`
            : "Not yet saved"}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {error && (
            <span style={{ fontSize: "13px", color: "#c0392b", fontFamily: "'DM Sans', sans-serif" }}>
              {error}
            </span>
          )}
          <button
            onClick={save}
            disabled={saving}
            style={{
              padding: "10px 28px",
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
            {saving ? "Saving…" : saved ? "Saved" : "Save notes"}
          </button>
        </div>
      </div>

      {/* SOAP fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {FIELDS.map((field) => (
          <div key={field.key}>
            <div style={{ marginBottom: "10px" }}>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "22px",
                fontWeight: 400,
                color: field.key === "private_notes" ? brand.textMuted : brand.text,
                marginBottom: "4px",
              }}>
                {field.label}
                {field.key === "private_notes" && (
                  <span style={{
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: brand.gold,
                    fontFamily: "'DM Sans', sans-serif",
                    marginLeft: "12px",
                    verticalAlign: "middle",
                  }}>
                    Private
                  </span>
                )}
              </h3>
              <p style={{
                fontSize: "13px",
                color: brand.textSoft,
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.6,
              }}>
                {field.description}
              </p>
            </div>
            <textarea
              value={note[field.key] as string}
              onChange={(e) => update(field.key, e.target.value)}
              placeholder={`${field.label}…`}
              style={{
                ...textareaStyle,
                borderColor: field.key === "private_notes" ? brand.borderGold : brand.borderMed,
                background: field.key === "private_notes" ? brand.goldPale : "#ffffff",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
