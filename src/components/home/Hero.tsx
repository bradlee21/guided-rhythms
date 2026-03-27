import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-16 sm:px-8 sm:py-20 md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-16">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--muted-sage)]">
            Guided Rhythms Massage
          </p>

          <h1 className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-[color:var(--foreground)] sm:text-5xl md:text-6xl">
            Intentional care that helps the body return to rhythm.
          </h1>

          <p className="mt-6 text-base leading-8 text-[color:var(--text-soft)] sm:text-lg">
            Professional therapeutic massage focused on calm, recovery, balance, and a grounded
            client experience from the very first interaction.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--forest-green)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Book Session
            </a>

            <a
              href="#trust"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--border-soft)] bg-white px-6 py-3 text-sm font-medium text-[color:var(--foreground)] transition hover:bg-[color:var(--soft-sand)]"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="relative flex min-h-[420px] items-center justify-center md:min-h-[520px]">
          <div className="absolute h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(143,175,155,0.16)_0%,rgba(194,163,107,0.08)_38%,transparent_72%)] blur-2xl" />

          <div className="absolute h-[300px] w-[300px] rounded-full bg-white/28 blur-3xl" />

          <div className="relative w-full max-w-[520px]">
            <Image
              src="/logo-guided-rhythms.png"
              alt="Guided Rhythms Massage logo"
              width={1200}
              height={1200}
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
