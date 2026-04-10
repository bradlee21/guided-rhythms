import { brand, homeTypography } from "@/lib/brand";
import { homeContent } from "@/components/home/home-content";

export function HomeServicesSection() {
  return (
    <section id="services" style={{ padding: "64px 24px", borderBottom: `1px solid ${brand.border}` }} className="services-section">
      <p className={homeTypography.eyebrow} style={{ color: brand.textSoft, marginBottom: "16px" }}>Services</p>
      <span style={{ width: "40px", height: "1px", background: brand.gold, display: "block", marginBottom: "40px" }} />
      <div className="services-grid">
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 300, lineHeight: 1.08, color: brand.text, letterSpacing: "-0.02em" }}>
            Care shaped around the person.
          </h2>
        </div>
        <div style={{ borderTop: `1px solid ${brand.borderMed}` }}>
          {homeContent.services.map((service, i) => (
            <div key={service.title} style={{ padding: "24px 0", borderBottom: `1px solid ${brand.border}` }}>
              <div className="service-row">
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: brand.text, marginBottom: "8px" }}>{service.title}</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.85, color: brand.textMuted, marginBottom: "10px" }}>{service.description}</p>
              </div>
              <a href="/booking/schedule" style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: brand.gold, textDecoration: "none", borderBottom: `1px solid ${brand.borderGold}`, paddingBottom: "2px", fontFamily: "'DM Sans', sans-serif" }}>
                Book this service →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
