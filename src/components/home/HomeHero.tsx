import { homeContent } from "@/components/home/home-content";
import { colors, typography } from "@/lib/brand";

export function HomeHero() {
  return (
    <section className="px-6 pb-20 pt-10 md:px-10 md:pt-16 lg:px-16 lg:pb-24">
      <div className="mx-auto grid max-w-7xl items-end gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative">
          <div
            className="absolute -left-8 top-5 hidden h-32 w-32 rounded-full lg:block"
            style={{ border: `1px solid ${colors.border}` }}
          />
          <div
            className="absolute left-28 top-28 hidden h-px w-36 lg:block"
            style={{ background: `linear-gradient(to right, ${colors.sage}, transparent)` }}
          />

          <p className={typography.eyebrow} style={{ color: colors.accentDeep ?? colors.gold }}>
            Serving Central Pennsylvania
          </p>

          <h1 className={typography.heroTitle}>
            A massage practice built on
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.forestMid}, ${colors.sage}, ${colors.gold})`,
              }}
            >
              presence, listening, and purpose.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8" style={{ color: colors.textMuted }}>
            Guided Rhythms Massage offers thoughtful massage therapy rooted in
            presence, communication, and purposeful care so clients feel
            genuinely seen, supported, and restored.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition hover:scale-[1.01]"
              style={{
                background: `linear-gradient(to right, ${colors.forest}, ${colors.sage})`,
                color: "#FFFFFF",
                boxShadow: `0 12px 30px ${colors.goldGlow}`,
              }}
            >
              Meet the Therapists
            </a>
            <a
              href="#philosophy"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition"
              style={{
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.surface,
                color: colors.text,
                boxShadow: "0 12px 30px rgba(30,43,32,0.05)",
              }}
            >
              Our Philosophy
            </a>
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute inset-x-8 top-8 h-full rounded-[2rem] blur-2xl"
            style={{ background: `linear-gradient(to bottom, ${colors.goldGlow}, transparent)` }}
          />
          <div
            className="relative overflow-hidden rounded-[2rem] p-8 backdrop-blur-xl"
            style={{
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.surface,
              boxShadow: "0 20px 60px rgba(30,43,32,0.08)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at top left, rgba(255,255,255,0.55), transparent 36%)",
              }}
            />

            <div className="relative">
              <p className={typography.eyebrow} style={{ color: colors.textMuted }}>
                What sets the tone
              </p>

              <div className="mt-8 space-y-6">
                {homeContent.differentiators.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 pb-6 last:pb-0"
                    style={{ borderBottom: `1px solid ${colors.border}` }}
                  >
                    <div
                      className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor: colors.gold,
                        boxShadow: `0 0 20px ${colors.goldGlow}`,
                      }}
                    />
                    <p className="text-base leading-7">{item}</p>
                  </div>
                ))}
              </div>

              <div
                className="mt-10 rounded-[1.5rem] p-6"
                style={{
                  border: `1px solid ${colors.borderGold}`,
                  background: "linear-gradient(to bottom right, rgba(255,255,255,0.62), rgba(255,255,255,0.24))",
                }}
              >
                <p className={typography.eyebrow} style={{ color: colors.forestMid }}>
                  The direction
                </p>
                <p className={typography.cardBody} style={{ color: colors.textMuted }}>
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
