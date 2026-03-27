export function CTASection() {
  return (
    <section id="contact" className="pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="rounded-[2rem] bg-[color:var(--forest-green)] px-8 py-12 text-white shadow-[0_24px_60px_rgba(31,61,54,0.18)] sm:px-10">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/70">
            Start here
          </p>

          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Professional care. Calm experience. Strong foundation.
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-8 text-white/80">
            Guided Rhythms Massage is beginning with a clean, thoughtful foundation designed to grow
            into a trusted long-term practice.
          </p>

          <div className="mt-8">
            <a
              href="mailto:hello@guidedrhythmsmassage.com"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-[color:var(--forest-green)] transition hover:opacity-90"
            >
              Contact Guided Rhythms
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
