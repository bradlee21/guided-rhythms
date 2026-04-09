import { homeContent } from "@/components/home/home-content";
import { colors, typography } from "@/lib/brand";

export function HomePhilosophySection() {
  return (
    <section id="philosophy" className="px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className={typography.eyebrow} style={{ color: colors.forestMid }}>
            Our philosophy
          </p>
          <h2 className={typography.sectionTitle}>
            Massage should feel intentional, not mechanical.
          </h2>
          <p className={typography.sectionBody} style={{ color: colors.textMuted }}>
            We believe meaningful massage therapy is built on more than
            technique alone. It is shaped by communication, presence,
            thoughtful care, and an environment that allows clients to feel
            both supported and at ease.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {homeContent.philosophy.map((item) => (
            <article
              key={item.title}
              className="relative overflow-hidden rounded-[2rem] p-8"
              style={{
                border: `1px solid ${colors.border}`,
                background: "linear-gradient(to bottom right, rgba(255,255,255,0.72), rgba(255,255,255,0.34))",
                boxShadow: "0 18px 40px rgba(30,43,32,0.05)",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px opacity-70"
                style={{
                  background: `linear-gradient(to right, transparent, ${colors.gold}, transparent)`,
                }}
              />
              <h3 className={typography.cardTitle}>{item.title}</h3>
              <p className={typography.cardBody} style={{ color: colors.textMuted }}>
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
