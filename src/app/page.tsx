import Approach from "@/components/home/Approach";
import { Hero } from "@/components/home/Hero";
import { SiteHeader } from "@/components/home/SiteHeader";
import { TrustStrip } from "@/components/home/TrustStrip";

function SoftDivider() {
  return (
    <div className="relative mx-auto my-2 h-16 max-w-6xl px-6 sm:px-8">
      <div className="absolute left-1/2 top-1/2 h-px w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(143,175,155,0.18),rgba(194,163,107,0.18),rgba(143,175,155,0.18),transparent)]" />
      <div className="absolute left-1/2 top-1/2 h-8 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(194,163,107,0.08)_0%,rgba(143,175,155,0.06)_35%,transparent_72%)] blur-2xl" />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[color:var(--background)] text-[color:var(--foreground)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-[-8rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(143,175,155,0.12)_0%,rgba(143,175,155,0.06)_28%,transparent_70%)] blur-3xl" />
        <div className="absolute right-[-10rem] top-[6rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(194,163,107,0.10)_0%,rgba(138,90,54,0.06)_32%,transparent_72%)] blur-3xl" />
        <div className="absolute left-1/2 top-[32rem] h-[16rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(31,61,51,0.05)_0%,rgba(143,175,155,0.04)_35%,transparent_75%)] blur-3xl" />
        <div className="absolute bottom-[8rem] left-[8%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(194,163,107,0.08)_0%,transparent_72%)] blur-3xl" />
        <div className="absolute right-[10%] top-[58rem] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(143,175,155,0.08)_0%,transparent_72%)] blur-3xl" />
      </div>

      <div className="relative z-10">
        <SiteHeader />
        <Hero />
        <SoftDivider />
        <TrustStrip />
        <SoftDivider />
        <Approach />

        <section id="contact" className="relative">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-18">
            <div className="relative">
              <div className="absolute inset-x-0 top-1/2 h-48 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(31,61,51,0.07)_0%,rgba(143,175,155,0.05)_24%,rgba(194,163,107,0.05)_38%,transparent_74%)] blur-3xl" />

              <div className="relative max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--muted-sage)]">
                  Contact
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)] sm:text-4xl">
                  A calm, professional foundation for Guided Rhythms.
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--text-soft)]">
                  This first version of the site is intentionally simpleclear brand, clear message,
                  and room to grow well.
                </p>

                <div className="mt-8">
                  <a
                    href="mailto:hello@guidedrhythmsmassage.com"
                    className="inline-flex items-center justify-center rounded-full bg-[color:var(--forest-green)] px-6 py-3 text-sm font-medium text-white shadow-[0_14px_30px_rgba(31,61,51,0.16)] transition hover:opacity-90"
                  >
                    Contact Guided Rhythms
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
