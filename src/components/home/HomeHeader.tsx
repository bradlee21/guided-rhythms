"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { typography } from "@/lib/brand";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#services", label: "Services" },
  { href: "#new-clients", label: "New Clients" },
] as const;

export function HomeHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 px-6 md:px-10 lg:px-16 transition-all duration-300"
      style={{
        background: scrolled ? "var(--surface)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-gold)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 py-4">
        <div className="flex shrink-0 items-center gap-5 md:gap-6">
          <div className="relative h-14 w-14 md:h-16 md:w-16">
            <Image
              src="/guided-rhythms-logo.png"
              alt="Guided Rhythms Massage logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="min-w-0">
            <p className="font-serif text-lg font-light tracking-wide text-[var(--forest)]">
              Guided Rhythms Massage
            </p>
            <p className="font-sans text-xs font-light tracking-[0.18em] uppercase text-[var(--text-muted)]">
              Intentional care for restoration
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`${typography.navLink} text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="font-sans text-sm font-light px-5 py-2 rounded-full transition-colors"
            style={{
              border: "1px solid var(--border-gold)",
              color: "var(--gold)",
            }}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
