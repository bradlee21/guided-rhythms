import { brand, homeTypography } from "@/lib/brand";
import { homeContent } from "@/components/home/home-content";

export function HomeNewClientsSection() {
  return (
    <section id="new-clients" style={{ padding: "88px 56px", borderBottom: `1px solid ${brand.border}`, background: brand.backgroundSoft }}>
      <p className={homeTypography.eyebrow} style={{ color: brand.textSoft, marginBottom: "16px" }}>New clients</p>
      <span style={{ width: "40px", height: "1px", background: brand.gold, display: "block", marginBottom: "48px" }} />
      <h2 style={{ fontSize: "clamp(32px, 3.5vw, 46px)", fontWeight: 300, lineHeight: 1.08, color: brand.text, letterSpacing: "-0.02em", marginBottom: "64px", maxWidth: "560px" }}>
        The first visit should feel clear, calm, and personal.
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", borderTop: `1px solid ${brand.borderMed}` }}>
        {homeContent.firstVisit.map((item, i) => (
          <div
            key={item.title}
            style={{
              padding: "36px 40px 36px 0",
              borderRight: i < homeContent.firstVisit.length - 1 ? `1px solid ${brand.border}` : "none",
              paddingLeft: i > 0 ? "40px" : "0",
            }}
          >
            <div style={{ fontSize: "10px", color: brand.gold, letterSpacing: "0.14em", marginBottom: "16px", fontFamily: "'DM Sans', sans-serif" }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: brand.text, marginBottom: "12px" }}>{item.title}</h3>
            <p style={{ fontSize: "13px", lineHeight: 1.85, color: brand.textMuted }}>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
