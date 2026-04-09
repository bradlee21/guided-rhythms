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

        <div className="mt-20">
          {homeContent.firstVisit.map((item, i) => (
            <div
              key={item.title}
              className="grid grid-cols-[3rem_1fr] gap-8 py-10 md:grid-cols-[6rem_1fr] md:gap-16"
              style={{ borderTop: `1px solid ${brand.border}` }}
            >
              <p
                className="pt-1 text-xs tabular-nums"
                style={{ color: brand.textMuted, letterSpacing: "0.1em" }}
              >
                0{i + 1}
              </p>
              <div>
                <h3 className="text-2xl md:text-3xl" style={{ color: brand.text }}>
                  {item.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-7" style={{ color: brand.textMuted }}>
                  {item.body}
                </p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${brand.border}` }} />
        </div>

      </div>
    </section>
  );
}
