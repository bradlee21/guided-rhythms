export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--border-soft)] bg-[color:rgba(244,239,232,0.88)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#" className="text-lg font-semibold tracking-[0.02em] text-[color:var(--foreground)]">
          Guided Rhythms
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#about" className="text-sm text-[color:var(--text-soft)] transition hover:text-[color:var(--forest-green)]">
            About
          </a>
          <a href="#services" className="text-sm text-[color:var(--text-soft)] transition hover:text-[color:var(--forest-green)]">
            Services
          </a>
          <a href="#contact" className="text-sm text-[color:var(--text-soft)] transition hover:text-[color:var(--forest-green)]">
            Contact
          </a>
        </nav>

        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--forest-green)] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          Book a Session
        </a>
      </div>
    </header>
  );
}
