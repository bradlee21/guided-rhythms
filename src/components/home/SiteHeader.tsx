export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--border-soft)] bg-[color:rgba(245,242,235,0.88)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#" className="text-sm font-medium uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
          Guided Rhythms Massage
        </a>

        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--forest-green)] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          Book Session
        </a>
      </div>
    </header>
  );
}
