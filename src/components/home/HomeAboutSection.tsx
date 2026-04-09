import { homeContent } from "@/components/home/home-content";
import { brand, homeTypography } from "@/lib/brand";

export function HomeAboutSection() {
  return (
    <section id="about" className="px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        <div className="max-w-2xl">
          <p className={homeTypography.eyebrow} style={{ color: brand.secondary }}>
            About us
          </p>
          <h2 className={homeTypography.sectionTitle}>
            Two therapists building something thoughtful.
          </h2>
          <p className="mt-6 text-lg leading-8" style={{ color: brand.textMuted }}>
            Guided Rhythms Massage exists to offer thoughtful, restorative care rooted
            in presence, professionalism, and a genuine respect for each client&apos;s experience.
          </p>
        </div>

        <div className="mt-20">
          {homeContent.therapists.map((therapist) => (
            <div
              key={therapist.name}
              className="grid gap-6 py-10 md:grid-cols-[1fr_2fr] md:gap-16"
              style={{ borderTop: `1px solid ${brand.border}` }}
            >
              <h3 className="text-2xl md:text-3xl" style={{ color: brand.text }}>
                {therapist.name}
              </h3>
              <p className="text-base leading-7" style={{ color: brand.textMuted }}>
                {therapist.role}
              </p>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${brand.border}` }} />
        </div>

      </div>
    </section>
  );
}
