const items = [
  "A calm and intentional environment",
  "Therapeutic work tailored to your needs",
  "Professional communication and focused care",
];

export function ExpectSection() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 pb-20 sm:px-8 md:pb-24">
        <div className="rounded-[2rem] border border-[color:var(--border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(233,227,216,0.7))] p-8 shadow-[0_20px_50px_rgba(31,61,54,0.04)] sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--muted-teal)]">
            What to expect
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {items.map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-[color:var(--border-soft)] bg-white/80 p-5"
              >
                <p className="text-base leading-7 text-[color:var(--foreground)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
