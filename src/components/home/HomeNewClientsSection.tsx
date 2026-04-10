import { brand, homeTypography } from "@/lib/brand";
import { homeContent } from "@/components/home/home-content";

export function HomeNewClientsSection() {
  return (
    <section id="new-clients" style={{ padding: "64px 24px", borderBottom: `1px solid ${brand.border}`, background: brand.backgroundSoft }} className="newclients-section">
      <p className={homeTypography.eyebrow} style={{ color: brand.textSoft, marginBottom: "16px" }}>New clients</p>
      <span style={{ width: "40px", height: "1px", background: brand.gold, display: "block", marginBottom: "40px" }} />
      <h2 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 300, lineHeight: 1.08, color: brand.text, letterSpacing: "-0.02em", marginBottom: "48px", maxWidth: "560px" }}>
        The first visit should feel clear, calm, and personal.
      </h2>
      <div className="newclients-grid" style={{ borderTop: `1px solid ${brand.borderMed}` }}>
        {homeContent.firstVisit.map((item, i) => (
          <div key={item.title} style={{ padding: "28px 0", borderBottom: `1px solid ${brand.border}` }}>
            <div style={{ fontSize: "13px", color: brand.gold, letterSpacing: "0.14em", marginBottom: "12px", fontFamily: "'DM Sans', sans-serif" }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: brand.text, marginBottom: "10px" }}>{item.title}</h3>
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: brand.textMuted }}>{item.body}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "48px", paddingTop: "36px", borderTop: `1px solid ${brand.borderMed}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", marginBottom: "8px" }}>
            Ready to book your first session?
          </h3>
          <p style={{ fontSize: "15px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
            Choose your therapist, pick a time that works, and we'll take it from there.
          </p>
        </div>
        <a href="/booking/schedule" style={{ padding: "14px 36px", background: brand.forest, color: "#F0EBE0", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", borderRadius: "2px", whiteSpace: "nowrap" as const }}>
          Book now
        </a>
      </div>
    </section>
  );
}
