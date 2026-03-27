const items = [
  {
    title: "Therapeutic Massage",
    description: "Focused bodywork designed to support relief, restoration, and physical recovery.",
  },
  {
    title: "Intentional Care",
    description: "A grounded approach centered on listening well, treating thoughtfully, and creating trust.",
  },
  {
    title: "Professional Experience",
    description: "Clean presentation, calm communication, and a client-centered experience from start to finish.",
  },
];

export function TrustStrip() {
  return (
    <section id="trust" className="border-y border-[color:var(--border-soft)] bg-white/70">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:px-8 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-[1.75rem] border border-[color:var(--border-soft)] bg-white/95 p-6 shadow-[0_18px_40px_rgba(31,61,51,0.08)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--forest-green)]">
              {item.title}
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-soft)]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
