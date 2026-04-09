"use client";

import { useState } from "react";
import { brand } from "@/lib/brand";

interface Service {
  id: string;
  name: string;
  description: string | null;
  hands_on_minutes: number;
  base_price_cents: number;
  is_active: boolean;
  is_public: boolean;
  sort_order: number;
}

interface Props {
  services: Service[];
}

export default function ServicesManager({ services: initial }: Props) {
  const [services, setServices] = useState<Service[]>(initial);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function updateService(id: string, patch: Partial<Service>) {
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, ...patch } : s));
  }

  async function saveService(id: string) {
    const service = services.find((s) => s.id === id);
    if (!service) return;
    setSaving(id);
    setError("");
    try {
      const res = await fetch("/api/admin/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: service.name,
          description: service.description,
          hands_on_minutes: service.hands_on_minutes,
          base_price_cents: service.base_price_cents,
          is_active: service.is_active,
          is_public: service.is_public,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSaved(id);
      setTimeout(() => setSaved(null), 2000);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(null);
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
    <div style={{ display: "flex", flexDirection: "column", gap: "0", border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden" }}>
      {error && (
        <p style={{ fontSize: "14px", color: "#c0392b", padding: "12px 24px", fontFamily: "'DM Sans', sans-serif", background: "#fff5f5" }}>{error}</p>
      )}
      {services.map((service, i) => (
        <div key={service.id} style={{
          padding: "24px",
          borderBottom: i < services.length - 1 ? `1px solid ${brand.border}` : "none",
          background: service.is_active ? "#ffffff" : brand.backgroundSoft,
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>Name</label>
              <input
                type="text"
                value={service.name}
                onChange={(e) => updateService(service.id, { name: e.target.value })}
                style={{ ...inputStyle, width: "100%" }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>Duration (min)</label>
                <input
                  type="number"
                  value={service.hands_on_minutes}
                  onChange={(e) => updateService(service.id, { hands_on_minutes: Number(e.target.value) })}
                  style={{ ...inputStyle, width: "100%" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>Price ($)</label>
                <input
                  type="number"
                  value={Math.round(service.base_price_cents / 100)}
                  onChange={(e) => updateService(service.id, { base_price_cents: Number(e.target.value) * 100 })}
                  style={{ ...inputStyle, width: "100%" }}
                />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
            <label style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>Description</label>
            <textarea
              value={service.description ?? ""}
              onChange={(e) => updateService(service.id, { description: e.target.value })}
              rows={2}
              style={{ ...inputStyle, width: "100%", resize: "vertical" as const, lineHeight: 1.6 }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "20px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={service.is_active}
                  onChange={(e) => updateService(service.id, { is_active: e.target.checked })}
                />
                Active
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={service.is_public}
                  onChange={(e) => updateService(service.id, { is_public: e.target.checked })}
                />
                Public
              </label>
            </div>
            <button
              onClick={() => saveService(service.id)}
              disabled={saving === service.id}
              style={{
                padding: "8px 24px",
                background: saved === service.id ? brand.sage : brand.forest,
                color: "#F0EBE0",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "none",
                borderRadius: "2px",
                cursor: saving === service.id ? "not-allowed" : "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "background 0.2s",
              }}
            >
              {saving === service.id ? "Saving…" : saved === service.id ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
