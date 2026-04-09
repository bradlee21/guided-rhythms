import { homeContent } from "@/components/home/home-content";
import { brand, homeTypography } from "@/lib/brand";

export function HomeNewClientsSection() {
  return (
    <section id="new-clients" className="px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        <div className="max-w-2xl">
          <p className={homeTypography.eyebrow} style={{ color: brand.secondary }}>
            New clients
          </p>
          <h2 className={homeTypography.sectionTitle}>
            The first visit should feel clear, calm, and personal.
          </h2>
        </div>

        <div className="mt-20 grid gap-16 sm:grid-cols-3">
          {homeContent.firstVisit.map((item, i) => (
            <div key={item.title}>
              <p
                className="mb-4 text-xs tabular-nums"
                style={{ color: brand.accent, letterSpacing: "0.12em" }}
              >
                0{i + 1}
              </p>
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
