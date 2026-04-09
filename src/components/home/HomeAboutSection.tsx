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

        <div className="mt-20 grid gap-16 sm:grid-cols-2">
          {homeContent.therapists.map((therapist) => (
            <div key={therapist.name}>
              <div
                className="mb-6 h-px w-10"
                style={{ background: brand.accent }}
              />
              <h3 className="text-2xl md:text-3xl" style={{ color: brand.text }}>
                {therapist.name}
              </h3>
              <p className="mt-4 text-base leading-7" style={{ color: brand.textMuted }}>
                {therapist.role}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
