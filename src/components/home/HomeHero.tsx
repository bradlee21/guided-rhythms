"use client";

import { brand, homeTypography } from "@/lib/brand";

export function HomeHero() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "3fr 2fr",
        minHeight: "580px",
        borderBottom: `1px solid ${brand.border}`,
      }}
    >
      {/* Left — headline + CTAs */}
      <div
        style={{
          padding: "64px 56px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRight: `1px solid ${brand.border}`,
        }}
      >
        <p
          className={homeTypography.eyebrow}
          style={{ color: brand.textSoft, marginBottom: "20px" }}
        >
          Serving Central Pennsylvania
        </p>

        <span
          style={{
            width: "40px",
            height: "1px",
            background: brand.gold,
            display: "block",
            marginBottom: "28px",
          }}
        />

        <h1
          style={{
            fontSize: "clamp(44px, 5.5vw, 64px)",
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
            color: brand.text,
            marginBottom: "32px",
          }}
        >
          Real work.<br />
          Real care.<br />
          <em style={{ color: brand.forest, fontStyle: "italic" }}>
            Real results.
          </em>
        </h1>

        <p
          className={homeTypography.sectionBody}
          style={{
            fontSize: "15px",
            color: brand.textMuted,
            maxWidth: "420px",
            marginBottom: "48px",
          }}
        >
          Guided Rhythms is a massage therapy practice built on genuine
          attention — where your session is shaped around you, not a
          preset routine.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a
            href="/booking/schedule"
            style={{
              padding: "13px 32px",
              background: brand.forest,
              color: "#F0EBE0",
              fontSize: "14px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontWeight: 400,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Book a session
          </a>
          <a
            href="#about"
            style={{
              padding: "13px 32px",
              border: `1px solid ${brand.borderMed}`,
              color: brand.text,
              fontSize: "14px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontWeight: 400,
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = brand.forest)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = brand.borderMed)
            }
          >
            Meet us first
          </a>
        </div>
      </div>

      {/* Right — two therapist panels */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Josh — top */}
        <div
          style={{
            flex: 1,
            padding: "40px",
            borderBottom: `1px solid ${brand.border}`,
            background: brand.backgroundSoft,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              width: "28px",
              height: "1px",
              background: brand.gold,
              display: "block",
              marginBottom: "16px",
            }}
          />
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "26px",
              fontWeight: 400,
              color: brand.text,
              marginBottom: "6px",
            }}
          >
            Josh Green
          </h3>
          <p
            className={homeTypography.eyebrow}
            style={{ color: brand.textSoft, marginBottom: "12px" }}
          >
            Holistic &amp; restorative
          </p>
          <p className={homeTypography.cardBody} style={{ color: brand.textMuted }}>
            A thoughtful, intuitive presence. Josh brings a client-centered
            approach that makes every session feel intentional.
          </p>
          <a
            href="/booking/schedule"
            style={{
              display: "inline-block",
              marginTop: "16px",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: brand.gold,
              textDecoration: "none",
              borderBottom: `1px solid ${brand.borderGold}`,
              paddingBottom: "2px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Book with Josh →
          </a>
        </div>

        {/* Brad — bottom */}
        <div
          style={{
            flex: 1,
            padding: "40px",
            background: brand.background,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              width: "28px",
              height: "1px",
              background: brand.forest,
              display: "block",
              marginBottom: "16px",
            }}
          />
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "26px",
              fontWeight: 400,
              color: brand.text,
              marginBottom: "6px",
            }}
          >
            Brad Ivy
          </h3>
          <p
            className={homeTypography.eyebrow}
            style={{ color: brand.textSoft, marginBottom: "12px" }}
          >
            Therapeutic &amp; deep tissue
          </p>
          <p className={homeTypography.cardBody} style={{ color: brand.textMuted }}>
            Recovery-minded work rooted in listening. If you&apos;re coming in
            with real pain or tension, Brad is your person.
          </p>
          <a
            href="/booking/schedule"
            style={{
              display: "inline-block",
              marginTop: "16px",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: brand.gold,
              textDecoration: "none",
              borderBottom: `1px solid ${brand.borderGold}`,
              paddingBottom: "2px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Book with Brad →
          </a>
        </div>
      </div>
    </section>
  );
}
