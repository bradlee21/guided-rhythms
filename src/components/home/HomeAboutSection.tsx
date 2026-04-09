import { homeContent } from "@/components/home/home-content";
import { colors, typography } from "@/lib/brand";

export function HomeAboutSection() {
  return (
    <section id="about" className="px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div
          className="mb-12 flex items-end justify-between gap-6 pb-6"
          style={{ borderBottom: `1px solid ${colors.border}` }}
        >
          <div>
            <p className={typography.eyebrow} style={{ color: colors.forestMid }}>
              About us
            </p>
            <h2 className={typography.sectionTitle}>
              Two therapists building something thoughtful.
            </h2>
          </div>
          <p
            className="hidden max-w-xl text-right text-lg leading-8 lg:block"
            style={{ color: colors.textMuted }}
          >
            Guided Rhythms Massage exists to offer thoughtful, restorative care
            rooted in presence, professionalism, and a genuine respect for each
            client&apos;s experience.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {homeContent.therapists.map((therapist) => (
            <article
              key={therapist.name}
              className="relative overflow-hidden rounded-[2rem] p-8"
              style={{
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.surface,
                boxShadow: "0 18px 40px rgba(30,43,32,0.06)",
              }}
            >
              <div
                className="absolute right-0 top-0 h-32 w-32 rounded-full blur-2xl"
                style={{ backgroundColor: colors.goldPale }}
              />
              <h3 className={typography.cardTitle}>{therapist.name}</h3>
              <p
                className={typography.cardBody}
                style={{ color: colors.textMuted }}
              >
                {therapist.role}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
