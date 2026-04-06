import { homeContent } from "@/components/home/home-content";
import { brand, homeTypography } from "@/lib/brand";

export function HomeAboutSection() {
  return (
    <section id="about" className="px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div
          className="mb-12 flex items-end justify-between gap-6 pb-6"
          style={{ borderBottom: `1px solid ${brand.border}` }}
        >
          <div>
            <p className={homeTypography.eyebrow} style={{ color: brand.secondary }}>
              About us
            </p>
            <h2 className={homeTypography.sectionTitle}>
              Two therapists building something thoughtful.
            </h2>
          </div>
          <p
            className="hidden max-w-xl text-right text-lg leading-8 lg:block"
            style={{ color: brand.textMuted }}
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
                border: `1px solid ${brand.border}`,
                backgroundColor: brand.surface,
                boxShadow: "0 18px 40px rgba(47,58,44,0.06)",
              }}
            >
              <div
                className="absolute right-0 top-0 h-32 w-32 rounded-full blur-2xl"
                style={{ backgroundColor: "rgba(111,143,85,0.10)" }}
              />
              <h3 className="text-[1.75rem] font-semibold tracking-[-0.03em]">
                {therapist.name}
              </h3>
              <p
                className="mt-5 max-w-xl text-lg leading-8"
                style={{ color: brand.textMuted }}
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
