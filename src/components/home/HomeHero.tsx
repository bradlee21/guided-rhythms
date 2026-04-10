"use client";

import { brand, homeTypography } from "@/lib/brand";

export function HomeHero() {
  return (
    <section style={{ borderBottom: `1px solid ${brand.border}` }}>
      {/* Left — headline + CTAs */}
      <div style={{
        padding: "48px 24px 40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderBottom: `1px solid ${brand.border}`,
      }}
      className="hero-left"
      >
        <p className={homeTypography.eyebrow} style={{ color: brand.textSoft, marginBottom: "16px" }}>
          Serving Central Pennsylvania
        </p>
        <span style={{ width: "40px", height: "1px", background: brand.gold, display: "block", marginBottom: "24px" }} />
        <h1 style={{ fontSize: "clamp(36px, 8vw, 64px)", fontWeight: 300, lineHeight: 1.0, letterSpacing: "-0.025em", color: brand.text, marginBottom: "24px" }}>
          Real work.<br />
          Real care.<br />
          <em style={{ color: brand.forest, fontStyle: "italic" }}>Real results.</em>
        </h1>
        <p className={homeTypography.sectionBody} style={{ fontSize: "15px", color: brand.textMuted, maxWidth: "420px", marginBottom: "36px", lineHeight: 1.8 }}>
          Guided Rhythms is a massage therapy practice built on genuine attention — where your session is shaped around you, not a preset routine.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href="/booking/schedule" style={{ padding: "14px 28px", background: brand.forest, color: "#F0EBE0", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontWeight: 400, borderRadius: "2px" }}>
            Book a session
          </a>
          <a href="#about" style={{ padding: "14px 28px", border: `1px solid ${brand.borderMed}`, color: brand.text, fontSize: "14px", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", fontWeight: 400, borderRadius: "2px" }}>
            Meet us first
          </a>
        </div>
      </div>

      {/* Therapist panels — stacked on mobile, side by side on desktop */}
      <div className="therapist-panels" style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "32px 24px", borderBottom: `1px solid ${brand.border}`, background: brand.backgroundSoft }}>
          <span style={{ width: "28px", height: "1px", background: brand.gold, display: "block", marginBottom: "14px" }} />
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 400, color: brand.text, marginBottom: "6px" }}>Josh Green</h3>
          <p className={homeTypography.eyebrow} style={{ color: brand.textSoft, marginBottom: "10px" }}>Holistic &amp; restorative</p>
          <p className={homeTypography.cardBody} style={{ color: brand.textMuted, marginBottom: "14px" }}>A thoughtful, intuitive presence. Josh brings a client-centered approach that makes every session feel intentional.</p>
          <a href="/booking/schedule" style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: brand.gold, textDecoration: "none", borderBottom: `1px solid ${brand.borderGold}`, paddingBottom: "2px", fontFamily: "'DM Sans', sans-serif" }}>Book with Josh →</a>
        </div>
        <div style={{ padding: "32px 24px", background: brand.background }}>
          <span style={{ width: "28px", height: "1px", background: brand.forest, display: "block", marginBottom: "14px" }} />
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 400, color: brand.text, marginBottom: "6px" }}>Brad Ivy</h3>
          <p className={homeTypography.eyebrow} style={{ color: brand.textSoft, marginBottom: "10px" }}>Therapeutic &amp; deep tissue</p>
          <p className={homeTypography.cardBody} style={{ color: brand.textMuted, marginBottom: "14px" }}>Recovery-minded work rooted in listening. If you're coming in with real pain or tension, Brad is your person.</p>
          <a href="/booking/schedule" style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: brand.gold, textDecoration: "none", borderBottom: `1px solid ${brand.borderGold}`, paddingBottom: "2px", fontFamily: "'DM Sans', sans-serif" }}>Book with Brad →</a>
        </div>
      </div>
    </section>
  );
}
