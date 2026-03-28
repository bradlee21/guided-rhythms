import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:px-8 sm:py-18 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div className="relative order-1 flex min-h-[280px] items-center justify-center sm:min-h-[340px] lg:min-h-[460px] lg:justify-start">
          <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(143,175,155,0.18)_0%,rgba(194,163,107,0.10)_34%,transparent_72%)] blur-3xl lg:left-0 lg:translate-x-0" />
          <div className="absolute left-1/2 top-1/2 h-[180px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(31,61,51,0.06)_0%,transparent_72%)] blur-3xl rotate-[-10deg] lg:left-8 lg:translate-x-0" />

          <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:mx-0 lg:max-w-[420px]">
            <Image
              src="/logo-guided-rhythms.png"
              alt="Guided Rhythms Massage logo"
              width={1200}
              height={1200}
              className="mx-auto h-auto w-full object-contain lg:mx-0"
              priority
            />
          </div>
        </div>

        <div className="order-2 max-w-2xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--muted-sage)]">
            Guided Rhythms Massage
          </p>

          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.03em] text-[color:var(--foreground)] sm:text-5xl md:text-6xl">
            Intentional care that helps the body return to rhythm.
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[color:var(--text-soft)]">
            Professional therapeutic massage focused on calm, recovery, balance, and a grounded
            client experience from the very first interaction.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--forest-green)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Book Your Session
            </a>

            <a
              href="#approach"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--border-soft)] bg-white/75 px-6 py-3 text-sm font-medium text-[color:var(--foreground)] transition hover:bg-[color:var(--soft-sand)]"
            >
              Our Approach
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
