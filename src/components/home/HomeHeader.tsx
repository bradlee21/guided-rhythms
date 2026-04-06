import Image from "next/image";

import { brand } from "@/lib/brand";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#services", label: "Services" },
  { href: "#new-clients", label: "New Clients" },
] as const;

export function HomeHeader() {
  return (
    <header className="px-6 pb-0 pt-5 md:px-10 lg:px-16">
      <div
        className="mx-auto flex max-w-7xl items-center justify-between gap-8 pb-0"
        style={{ borderBottom: `1px solid ${brand.border}` }}
      >
        <div className="flex shrink-0 items-center gap-5 md:gap-6">
          <div className="relative h-40 w-40 md:h-[13.75rem] md:w-[13.75rem] lg:h-[16.25rem] lg:w-[16.25rem]">
            <Image
              src="/guided-rhythms-logo.png"
              alt="Guided Rhythms Massage logo"
              fill
              className="object-contain drop-shadow-[0_12px_26px_rgba(47,58,44,0.10)]"
              priority
            />
          </div>

          <div className="min-w-0 self-center text-center">
            <p
              className="text-[0.72rem] uppercase tracking-[0.34em] md:text-[0.78rem]"
              style={{ color: brand.secondary }}
            >
              Guided Rhythms Massage
            </p>
            <p
              className="mt-2 text-sm md:text-base"
              style={{ color: brand.textMuted }}
            >
              Intentional care for restoration and wellness
            </p>
          </div>
        </div>

        <nav
          className="hidden items-center gap-8 text-sm md:flex"
          style={{ color: brand.textMuted }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              className="opacity-80 transition hover:opacity-100"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
          <a
            className="rounded-full px-4 py-2 transition"
            href="#contact"
            style={{
              border: `1px solid ${brand.border}`,
              backgroundColor: brand.surface,
              color: brand.text,
            }}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
