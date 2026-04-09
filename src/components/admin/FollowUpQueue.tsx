"use client";

import { useState } from "react";
import { brand } from "@/lib/brand";

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  preferred_name: string | null;
  email: string;
}

interface FollowUp {
  id: string;
  type: "post_session" | "rebooking";
  status: string;
  due_date: string;
  clients: Client;
  appointments: {
    id: string;
    appointment_date: string;
    services: { name: string } | null;
  } | null;
}

interface RecentAppointment {
  id: string;
  appointment_date: string;
  clients: Client;
  services: { name: string } | null;
}

interface Props {
  therapistId: string;
  followUps: FollowUp[];
  recentlyCompleted: RecentAppointment[];
}

function clientName(client: Client) {
  return client.preferred_name
    ? `${client.preferred_name} ${client.last_name}`
    : `${client.first_name} ${client.last_name}`;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short", day: "numeric",
  });
}

function postSessionBody(clientName: string, serviceName: string) {
  return `Hi ${clientName},\n\nJust wanted to check in and see how you're feeling after your ${serviceName} on ${new Date().toLocaleDateString("en-US", { weekday: "long" })}. I hope you're feeling some relief — let me know if anything comes up or if you have any questions.\n\nLooking forward to seeing you again soon.\n\nBrad`;
}

function rebookingBody(clientName: string) {
  return `Hi ${clientName},\n\nIt's been a little while since your last session and I wanted to reach out. If you're ready to come back in, I'd love to get you scheduled — just reply here or book directly at [booking link].\n\nHope you're doing well.\n\nBrad`;
}

export default function FollowUpQueue({ therapistId, followUps, recentlyCompleted }: Props) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [marking, setMarking] = useState<string | null>(null);

  async function markSent(id: string) {
    setMarking(id);
    try {
      await fetch("/api/admin/follow-ups", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "sent" }),
      });
      setDismissed((prev) => new Set([...prev, id]));
    } finally {
      setMarking(null);
    }
  }

  async function dismiss(id: string) {
    setMarking(id);
    try {
      await fetch("/api/admin/follow-ups", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "dismissed" }),
      });
      setDismissed((prev) => new Set([...prev, id]));
    } finally {
      setMarking(null);
    }
  }

  const visibleFollowUps = followUps.filter((f) => !dismissed.has(f.id));

  const typeLabel = {
    post_session: "Post-session check-in",
    rebooking: "Rebooking nudge",
  };

  const typeColor = {
    post_session: brand.forest,
    rebooking: brand.gold,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>

      {/* Pending follow-ups */}
      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", marginBottom: "16px" }}>
          {visibleFollowUps.length === 0 ? "All caught up" : `${visibleFollowUps.length} pending`}
        </h2>

        {visibleFollowUps.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", border: `1px solid ${brand.border}`, borderRadius: "2px", color: brand.textSoft, fontSize: "15px", fontFamily: "'DM Sans', sans-serif", background: brand.backgroundSoft }}>
            No follow-ups due. Check back after your next session.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {visibleFollowUps.map((fu) => {
              const name = clientName(fu.clients);
              const serviceName = fu.appointments?.services?.name ?? "your session";
              const subject = fu.type === "post_session"
                ? `Checking in after your session`
                : `Ready to rebook?`;
              const body = fu.type === "post_session"
                ? postSessionBody(name, serviceName)
                : rebookingBody(name);
              const mailtoLink = `mailto:${fu.clients.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

              return (
                <div key={fu.id} style={{
                  background: "#ffffff",
                  border: `1px solid ${brand.border}`,
                  borderLeft: `3px solid ${typeColor[fu.type]}`,
                  borderRadius: "0 2px 2px 0",
                  padding: "20px 24px",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "16px",
                  alignItems: "center",
                }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "6px" }}>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 400, color: brand.text }}>
                        {name}
                      </h3>
                      <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: typeColor[fu.type], fontFamily: "'DM Sans', sans-serif" }}>
                        {typeLabel[fu.type]}
                      </span>
                    </div>
                    <div style={{ fontSize: "13px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                      {fu.appointments ? `${fu.appointments.services?.name ?? "Session"} · ${formatDate(fu.appointments.appointment_date)}` : "—"}
                      {" · "}{fu.clients.email}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <a
                      href={mailtoLink}
                      onClick={() => setTimeout(() => markSent(fu.id), 1000)}
                      style={{
                        fontSize: "12px",
                        padding: "9px 20px",
                        background: brand.forest,
                        color: "#F0EBE0",
                        borderRadius: "2px",
                        textDecoration: "none",
                        fontFamily: "'DM Sans', sans-serif",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      Open email
                    </a>
                    <button
                      onClick={() => dismiss(fu.id)}
                      disabled={marking === fu.id}
                      style={{
                        fontSize: "12px",
                        padding: "9px 16px",
                        border: `1px solid ${brand.borderMed}`,
                        color: brand.textSoft,
                        background: "transparent",
                        borderRadius: "2px",
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recently completed — prompt to create follow-up */}
      {recentlyCompleted.length > 0 && (
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", marginBottom: "8px" }}>
            Recent sessions
          </h2>
          <p style={{ fontSize: "14px", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "16px" }}>
            These sessions completed recently. Follow-ups will be created automatically once the system is running.
          </p>
          <div style={{ border: `1px solid ${brand.borderMed}`, borderRadius: "2px", overflow: "hidden" }}>
            {recentlyCompleted.map((appt: any, i: number) => (
              <div key={appt.id} style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 140px",
                alignItems: "center",
                padding: "16px 24px",
                borderBottom: i < recentlyCompleted.length - 1 ? `1px solid ${brand.border}` : "none",
                background: i % 2 === 0 ? "#ffffff" : brand.background,
                gap: "16px",
              }}>
                <span style={{ fontSize: "14px", color: brand.text, fontFamily: "'DM Sans', sans-serif" }}>
                  {clientName(appt.clients)}
                </span>
                <span style={{ fontSize: "14px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                  {appt.services?.name ?? "—"} · {formatDate(appt.appointment_date)}
                </span>
                <span style={{ fontSize: "13px", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif" }}>
                  {appt.clients.email}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
