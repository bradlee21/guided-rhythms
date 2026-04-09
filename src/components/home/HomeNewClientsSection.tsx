import { homeContent } from "@/components/home/home-content";
import { colors, typography } from "@/lib/brand";

export function HomeNewClientsSection() {
  return (
    <section id="new-clients" className="px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className={typography.eyebrow} style={{ color: colors.forestMid }}>
            For new clients
          </p>
          <h2 className={typography.sectionTitle}>
            The first visit should feel clear, calm, and personal.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {homeContent.firstVisit.map((item) => (
            <article
              key={item.title}
              className="relative rounded-[2rem] p-8"
              style={{
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.surface,
                boxShadow: "0 18px 40px rgba(30,43,32,0.05)",
              }}
            >
              <div
                className="mb-6 h-px w-16"
                style={{
                  background: `linear-gradient(to right, ${colors.gold}, transparent)`,
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
