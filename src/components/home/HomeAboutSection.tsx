import { brand, homeTypography } from "@/lib/brand";
import { homeContent } from "@/components/home/home-content";

export function HomeAboutSection() {
  return (
    <section id="about" style={{ padding: "64px 24px", borderBottom: `1px solid ${brand.border}` }} className="about-section">
      <p className={homeTypography.eyebrow} style={{ color: brand.textSoft, marginBottom: "16px" }}>About us</p>
      <span style={{ width: "40px", height: "1px", background: brand.gold, display: "block", marginBottom: "40px" }} />
      <div className="about-grid">
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 300, lineHeight: 1.08, color: brand.text, letterSpacing: "-0.02em", marginBottom: "20px" }}>
            Two therapists building something thoughtful.
          </h2>
          <p style={{ fontSize: "15px", lineHeight: 1.9, color: brand.textMuted }}>
            Guided Rhythms exists to offer restorative care rooted in presence, professionalism, and a genuine respect for each client's experience.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {homeContent.therapists.map((t, i) => (
            <div key={t.name} style={{ borderTop: `1px solid ${brand.border}`, paddingTop: "28px", marginTop: i === 0 ? "0" : "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: i === 0 ? brand.goldPale : "rgba(46,74,48,0.08)", border: `1px solid ${i === 0 ? brand.borderGold : brand.borderMed}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: i === 0 ? brand.gold : brand.forest, fontWeight: 400, flexShrink: 0 }}>
                  {t.name.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: brand.text }}>{t.name}</h3>
              </div>
              <p style={{ fontSize: "14px", lineHeight: 1.9, color: brand.textMuted, paddingLeft: "46px" }}>{t.role}</p>
              {t.branch && (
                <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.gold, fontFamily: "'DM Sans', sans-serif", marginTop: "8px", paddingLeft: "46px", fontWeight: 400 }}>
                  {t.branch}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
