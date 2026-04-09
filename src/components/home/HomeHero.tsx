import { homeContent } from "@/components/home/home-content";
import { brand, homeTypography } from "@/lib/brand";

export function HomeHero() {
  return (
    <section className="px-6 pb-24 pt-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        <p
          className="mb-6 text-xs uppercase tracking-[0.4em]"
          style={{ color: brand.accentDeep }}
        >
          Serving Central Pennsylvania
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl">
          A massage practice built on
          <span
            className="block bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${brand.secondary}, ${brand.primary}, ${brand.accent})`,
            }}
          >
            presence, listening, and purpose.
          </span>
        </h1>

        <div className="mt-12 grid gap-16 md:grid-cols-2 md:gap-24">
          <p className="text-lg leading-8 md:text-xl" style={{ color: brand.textMuted }}>
            Guided Rhythms Massage offers thoughtful massage therapy rooted in
            presence, communication, and purposeful care so clients feel
            genuinely seen, supported, and restored.
          </p>

          <div>
            <p
              className={homeTypography.eyebrow}
              style={{ color: brand.textMuted }}
            >
              What sets the tone
            </p>
            <ul className="mt-6 space-y-4">
              {homeContent.differentiators.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: brand.accent }}
                  />
                  <span className="text-base leading-7" style={{ color: brand.text }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p
              className="mt-8 text-base leading-7"
              style={{ color: brand.textMuted }}
            >
              Every part of the practice is shaped around calm professionalism,
              meaningful care, and an experience that feels personal rather than routine.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <a
            href="#about"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-[1.01]"
            style={{
              background: `linear-gradient(to right, ${brand.primary}, ${brand.accent})`,
              color: "#FFFFFF",
              boxShadow: `0 12px 30px ${brand.glow}`,
            }}
          >
            Meet the Therapists
          </a>
          <a
            href="#philosophy"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
            style={{
              border: `1px solid ${brand.border}`,
              backgroundColor: brand.surface,
              color: brand.text,
            }}
          >
            Our Philosophy
          </a>
        </div>

      </div>
    </section>
  );
}
