import { homeContent } from "@/components/home/home-content";
import { brand, homeTypography } from "@/lib/brand";

export function HomeHero() {
  return (
    <section className="px-6 pb-20 pt-10 md:px-10 md:pt-16 lg:px-16 lg:pb-24">
      <div className="mx-auto grid max-w-7xl items-end gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative">
          <div
            className="absolute -left-8 top-5 hidden h-32 w-32 rounded-full lg:block"
            style={{ border: `1px solid ${brand.border}` }}
          />
          <div
            className="absolute left-28 top-28 hidden h-px w-36 lg:block"
            style={{
              background: `linear-gradient(to right, ${brand.primary}, transparent)`,
            }}
          />

          <p
            className="mb-5 text-xs uppercase tracking-[0.4em]"
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

          <p
            className="mt-8 max-w-2xl text-lg leading-8 md:text-xl"
            style={{ color: brand.textMuted }}
          >
            Guided Rhythms Massage offers thoughtful massage therapy rooted in
            presence, communication, and purposeful care so clients feel
            genuinely seen, supported, and restored.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
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
                boxShadow: "0 12px 30px rgba(47,58,44,0.05)",
              }}
            >
              Our Philosophy
            </a>
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute inset-x-8 top-8 h-full rounded-[2rem] blur-2xl"
            style={{
              background: `linear-gradient(to bottom, ${brand.glow}, transparent)`,
            }}
          />
          <div
            className="relative overflow-hidden rounded-[2rem] p-8 backdrop-blur-xl"
            style={{
              border: `1px solid ${brand.border}`,
              backgroundColor: brand.surface,
              boxShadow: "0 20px 60px rgba(47,58,44,0.08)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(255,255,255,0.55), transparent 36%)",
              }}
            />

            <div className="relative">
              <p
                className={homeTypography.eyebrow}
                style={{ color: brand.textMuted }}
              >
                What sets the tone
              </p>

              <div className="mt-8 space-y-6">
                {homeContent.differentiators.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 pb-6 last:pb-0"
                    style={{ borderBottom: `1px solid ${brand.border}` }}
                  >
                    <div
                      className="mt-2 h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: brand.accent,
                        boxShadow: `0 0 20px ${brand.glow}`,
                      }}
                    />
                    <p className="text-base leading-7">{item}</p>
                  </div>
                ))}
              </div>

              <div
                className="mt-10 rounded-[1.5rem] p-6"
                style={{
                  border: `1px solid ${brand.border}`,
                  background:
                    "linear-gradient(to bottom right, rgba(255,255,255,0.62), rgba(255,255,255,0.24))",
                }}
              >
                <p
                  className="text-sm uppercase tracking-[0.28em]"
                  style={{ color: brand.secondary }}
                >
                  The direction
                </p>
                <p
                  className={homeTypography.cardBody}
                  style={{ color: brand.textMuted }}
                >
                  Every part of the practice is shaped around calm
                  professionalism, meaningful care, and an experience that
                  feels personal rather than routine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
