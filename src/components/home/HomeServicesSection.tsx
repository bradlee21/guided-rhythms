import { brand, homeTypography } from "@/lib/brand";
import { homeContent } from "@/components/home/home-content";

export function HomeServicesSection() {
  return (
    <section id="services" style={{ padding: "64px 24px", borderBottom: `1px solid ${brand.border}` }} className="services-section">
      <p className={homeTypography.eyebrow} style={{ color: brand.textSoft, marginBottom: "16px" }}>Services</p>
      <span style={{ width: "40px", height: "1px", background: brand.gold, display: "block", marginBottom: "40px" }} />
      <div className="services-grid">
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 300, lineHeight: 1.08, color: brand.text, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Care shaped around the person.
          </h2>
          <p style={{ fontSize: "15px", lineHeight: 1.8, color: brand.textMuted }}>
            Every session is built around what your body needs that day — not a preset routine.
          </p>
        </div>
        <div style={{ borderTop: `1px solid ${brand.borderMed}` }}>
          {(homeContent.services as unknown as any[]).map((service, i) => (
            <div key={service.title} style={{ padding: "28px 0", borderBottom: `1px solid ${brand.border}` }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "16px", marginBottom: "10px", flexWrap: "wrap" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 400, color: brand.text }}>{service.title}</h3>
                <span style={{ fontSize: "14px", color: brand.gold, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" as const, flexShrink: 0 }}>{service.price}</span>
              </div>
              <p style={{ fontSize: "14px", lineHeight: 1.85, color: brand.textMuted, marginBottom: "14px" }}>{service.description}</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
                {service.durations.map((d: string) => (
                  <span key={d} style={{ fontSize: "12px", padding: "4px 12px", border: `1px solid ${brand.borderMed}`, borderRadius: "2px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                    {d}
                  </span>
                ))}
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
