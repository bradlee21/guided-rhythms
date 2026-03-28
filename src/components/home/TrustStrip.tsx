const items = [
  {
    title: "Pain Relief",
    description: "Targeted therapeutic massage designed to reduce tension, restore movement, and support recovery.",
  },
  {
    title: "Intentional Care",
    description: "Sessions built around listening well, working thoughtfully, and responding to what your body needs.",
  },
  {
    title: "Calm Professional Environment",
    description: "A grounded, respectful experience designed to help clients slow down and reset.",
  },
];

export function TrustStrip() {
  return (
    <section id="trust" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-6 sm:px-8 sm:py-8">
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="px-1 py-2">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--forest-green)]">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-soft)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
