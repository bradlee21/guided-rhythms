import { homeContent } from "@/components/home/home-content";
import { brand, homeTypography } from "@/lib/brand";

export function HomePhilosophySection() {
  return (
    <section id="philosophy" className="px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        <div className="max-w-2xl">
          <p className={homeTypography.eyebrow} style={{ color: brand.secondary }}>
            Our philosophy
          </p>
          <h2 className={homeTypography.sectionTitle}>
            Massage should feel intentional, not mechanical.
          </h2>
          <p className="mt-6 text-lg leading-8" style={{ color: brand.textMuted }}>
            We believe meaningful massage therapy is built on more than technique alone.
            It is shaped by communication, presence, and an environment where clients
            feel both supported and at ease.
          </p>
        </div>

        <div className="mt-20 grid gap-16 sm:grid-cols-2">
          {homeContent.philosophy.map((item) => (
            <div key={item.title}>
              <div
                className="mb-6 h-px w-10"
                style={{ background: brand.accent }}
              />
              <h3 className="text-2xl md:text-3xl" style={{ color: brand.text }}>
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-7" style={{ color: brand.textMuted }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
