"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { brand } from "@/lib/brand";

export function HomeHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid ${brand.border}`,
        background: scrolled ? brand.surfaceStrong : brand.background,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.3s ease",
      }}
    >
      {/* Logo + name */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Image
          src="/guided-rhythms-logo.png"
          alt="Guided Rhythms logo"
          width={192}
          height={192}
          style={{ objectFit: "contain" }}
        />
        <div>
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: brand.forest,
              fontWeight: 400,
            }}
          >
            Guided Rhythms
          </div>
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.08em",
              color: brand.textSoft,
            }}
          >
            Massage Therapy
          </div>
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: brand.gold,
              fontFamily: "'DM Sans', sans-serif",
              marginTop: "2px",
            }}
          >
            Veteran Owned
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="desktop-nav" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {["About", "Services", "New clients", "Philosophy"].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(" ", "-")}`}
            style={{
              fontSize: "14px",
              letterSpacing: "0.05em",
              color: brand.textMuted,
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = brand.forest)}
            onMouseLeave={(e) => (e.currentTarget.style.color = brand.textMuted)}
          >
            {link}
          </a>
        ))}
        <a
          href="/booking/schedule"
          style={{
            padding: "9px 24px",
            background: brand.forest,
            color: "#F0EBE0",
            fontSize: "14px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            fontWeight: 400,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Book now
        </a>
      </nav>
    </header>
  );
}
