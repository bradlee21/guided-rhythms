export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 sm:py-24 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--muted-teal)]">
            Guided Rhythms Massage
          </p>

          <h1 className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-[color:var(--foreground)] sm:text-5xl md:text-6xl">
            Return to your bodys natural rhythm.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-[color:var(--text-soft)] sm:text-lg">
            Intentional, professional therapeutic massage focused on pain relief, stress recovery,
            and helping clients feel more balanced, supported, and at ease in their bodies.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--forest-green)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Book a Session
            </a>

            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--border-soft)] bg-white px-6 py-3 text-sm font-medium text-[color:var(--foreground)] transition hover:bg-[color:var(--soft-beige)]"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(63,111,106,0.18),transparent_58%)]" />
          <div className="relative rounded-[2rem] border border-[color:var(--border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0.72))] p-6 shadow-[0_30px_80px_rgba(31,61,54,0.08)] sm:p-8">
            <div className="rounded-[1.5rem] border border-[color:var(--border-soft)] bg-[linear-gradient(180deg,rgba(233,227,216,0.58),rgba(255,255,255,0.82))] p-8">
              <div className="flex min-h-[320px] flex-col justify-between rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(31,61,54,0.06),rgba(63,111,106,0.02))] p-8">
                <div className="h-16 w-16 rounded-full border border-[color:rgba(176,138,87,0.32)] bg-[linear-gradient(135deg,rgba(176,138,87,0.22),rgba(63,111,106,0.08))]" />

                <div className="space-y-4">
                  <div className="h-px w-24 bg-[color:rgba(31,61,54,0.18)]" />
                  <p className="max-w-sm text-lg leading-8 text-[color:var(--foreground)]">
                    Calm, focused therapeutic care in a grounded and professional environment.
                  </p>
                  <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--muted-teal)]">
                    Professional  Restorative  Intentional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
