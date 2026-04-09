import { brand, homeTypography } from "@/lib/brand";
import { homeContent } from "@/components/home/home-content";

export function HomeAboutSection() {
  return (
    <section id="about" style={{ padding: "88px 56px", borderBottom: `1px solid ${brand.border}` }}>
      <p className={homeTypography.eyebrow} style={{ color: brand.textSoft, marginBottom: "16px" }}>About us</p>
      <span style={{ width: "40px", height: "1px", background: brand.gold, display: "block", marginBottom: "48px" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
        <div>
          <h2 style={{ fontSize: "clamp(32px, 3.5vw, 46px)", fontWeight: 300, lineHeight: 1.08, color: brand.text, letterSpacing: "-0.02em", marginBottom: "24px" }}>
            Two therapists building something thoughtful.
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.9, color: brand.textMuted }}>
            Guided Rhythms exists to offer restorative care rooted in presence, professionalism, and a genuine respect for each client&apos;s experience.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {homeContent.therapists.map((t, i) => (
            <div key={t.name} style={{ borderTop: `1px solid ${brand.border}`, paddingTop: "32px", marginTop: i === 0 ? "0" : "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                <div style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  background: i === 0 ? brand.goldPale : "rgba(46,74,48,0.08)",
                  border: `1px solid ${i === 0 ? brand.borderGold : brand.borderMed}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "14px", color: i === 0 ? brand.gold : brand.forest,
                  fontWeight: 400, flexShrink: 0,
                }}>
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 400, color: brand.text }}>{t.name}</h3>
              </div>
              <p style={{ fontSize: "15px", lineHeight: 1.9, color: brand.textMuted, paddingLeft: "48px" }}>{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
