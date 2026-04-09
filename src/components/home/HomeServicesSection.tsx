import { colors, typography } from "@/lib/brand";

export function HomeServicesSection() {
  return (
    <section id="services" className="px-6 py-20 md:px-10 lg:px-16">
      <div
        className="mx-auto max-w-7xl rounded-[2rem] p-8 md:p-12"
        style={{
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.surface,
          boxShadow: "0 20px 50px rgba(30,43,32,0.05)",
        }}
      >
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className={typography.eyebrow} style={{ color: colors.forestMid }}>
              Service direction
            </p>
            <h2 className={typography.sectionTitle}>
              Care shaped around the person, not a preset routine.
            </h2>
            <p className={typography.sectionBody} style={{ color: colors.textMuted }}>
              Guided Rhythms Massage offers customized sessions built around
              your goals, comfort, and the kind of support your body needs. The
              focus is not on running through a fixed routine, but on providing
              thoughtful care that feels personal, intentional, and restorative.
            </p>
          </div>

          <div className="grid gap-4">
            <article
              className="rounded-[1.75rem] p-6 md:p-7"
              style={{
                border: `1px solid ${colors.border}`,
                background: "linear-gradient(to bottom right, rgba(255,255,255,0.70), rgba(255,255,255,0.38))",
                boxShadow: "0 16px 36px rgba(30,43,32,0.04)",
              }}
            >
              <p className={typography.eyebrow} style={{ color: colors.forestMid }}>
                Customized Sessions
              </p>
              <p className="mt-4 text-lg leading-8" style={{ color: colors.textMuted }}>
                Each session is shaped with intention, taking into account how
                you&apos;re feeling, what you want to focus on, and the kind of
                care that would best serve you that day.
              </p>
            </article>

            <div className="grid gap-4 md:grid-cols-2">
              <article
                className="rounded-[1.5rem] p-5"
                style={{
                  border: `1px solid ${colors.border}`,
                  backgroundColor: "rgba(255,255,255,0.54)",
                }}
              >
                <p className={typography.eyebrow} style={{ color: colors.forestMid }}>
                  Restorative Care
                </p>
                <p className={typography.cardBody} style={{ color: colors.textMuted }}>
                  Care that supports relaxation, calm, and a more grounded
                  physical and mental state.
                </p>
              </article>

              <article
                className="rounded-[1.5rem] p-5"
                style={{
                  border: `1px solid ${colors.border}`,
                  backgroundColor: "rgba(255,255,255,0.54)",
                }}
              >
                <p className={typography.eyebrow} style={{ color: colors.forestMid }}>
                  Focused Support
                </p>
                <p className={typography.cardBody} style={{ color: colors.textMuted }}>
                  Thoughtful work for areas that need more attention, always
                  guided by communication and client comfort.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
