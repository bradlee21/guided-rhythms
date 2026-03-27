const outcomes = [
  {
    title: "Pain Relief",
    description: "Focused bodywork designed to reduce tension, discomfort, and physical strain.",
  },
  {
    title: "Stress Recovery",
    description: "A grounded environment that helps the body settle, reset, and recover.",
  },
  {
    title: "Mobility Support",
    description: "Intentional care that supports movement, function, and everyday well-being.",
  },
];

export function OutcomesStrip() {
  return (
    <section id="services" className="border-y border-[color:var(--border-soft)] bg-white/70">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:px-8 md:grid-cols-3">
        {outcomes.map((item) => (
          <div
            key={item.title}
            className="rounded-[1.75rem] border border-[color:var(--border-soft)] bg-white p-6 shadow-[0_12px_30px_rgba(31,61,54,0.04)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--muted-teal)]">
              {item.title}
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-soft)]">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
