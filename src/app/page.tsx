import { Hero } from "@/components/home/Hero";
import { SiteHeader } from "@/components/home/SiteHeader";
import { TrustStrip } from "@/components/home/TrustStrip";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
      <SiteHeader />
      <Hero />
      <TrustStrip />

      <section id="contact" className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="rounded-[2rem] bg-[color:var(--forest-green)] px-8 py-12 text-white shadow-[0_24px_60px_rgba(31,61,51,0.18)] sm:px-10">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/70">
            Contact
          </p>

          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            A calm, professional foundation for Guided Rhythms.
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-8 text-white/80">
            This first version of the site is intentionally simpleclear brand, clear message, and room to grow well.
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
      </section>
    </main>
  );
}
