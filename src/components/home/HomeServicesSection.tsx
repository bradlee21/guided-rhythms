import { brand, homeTypography } from "@/lib/brand";
import { homeContent } from "@/components/home/home-content";

export function HomeServicesSection() {
  return (
    <section id="services" style={{ padding: "88px 56px", borderBottom: `1px solid ${brand.border}` }}>
      <p className={homeTypography.eyebrow} style={{ color: brand.textSoft, marginBottom: "16px" }}>Services</p>
      <span style={{ width: "40px", height: "1px", background: brand.gold, display: "block", marginBottom: "48px" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px", alignItems: "start" }}>
        <div>
          <h2 style={{ fontSize: "clamp(32px, 3.5vw, 46px)", fontWeight: 300, lineHeight: 1.08, color: brand.text, letterSpacing: "-0.02em" }}>
            Care shaped around the person.
          </h2>
        </div>
        <div style={{ borderTop: `1px solid ${brand.borderMed}` }}>
          {homeContent.services.map((service) => (
            <div
              key={service.title}
              style={{
                padding: "28px 0",
                borderBottom: `1px solid ${brand.border}`,
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: "24px",
                alignItems: "start",
              }}
            >
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: brand.text }}>{service.title}</h3>
              <p style={{ fontSize: "13px", lineHeight: 1.85, color: brand.textMuted }}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
