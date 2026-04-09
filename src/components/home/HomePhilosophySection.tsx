import { brand, homeTypography } from "@/lib/brand";
import { homeContent } from "@/components/home/home-content";

export function HomePhilosophySection() {
  const dots = [brand.gold, brand.sage, brand.gold, brand.sage];
  return (
    <section id="philosophy" style={{ background: "#1E2820", padding: "88px 56px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <p className={homeTypography.eyebrow} style={{ color: brand.sage, marginBottom: "16px" }}>Our philosophy</p>
      <span style={{ width: "40px", height: "1px", background: brand.gold, display: "block", marginBottom: "48px" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
        <div>
          <h2 style={{ fontSize: "clamp(32px, 3.5vw, 46px)", fontWeight: 300, lineHeight: 1.08, color: "#F0EBE0", letterSpacing: "-0.02em", marginBottom: "24px" }}>
            Massage should feel intentional, not mechanical.
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.9, color: "rgba(200,210,190,0.55)" }}>
            We believe the best therapeutic work comes from genuine presence, real listening, and care that&apos;s shaped around the person — not a clock.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {homeContent.philosophy.map((item, i) => (
            <div
              key={item.title}
              style={{
                padding: "24px 0",
                borderBottom: i < homeContent.philosophy.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
              }}
            >
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: dots[i], flexShrink: 0, marginTop: "8px" }} />
              <div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 400, color: "#E8E0D0", marginBottom: "6px" }}>{item.title}</h4>
                <p style={{ fontSize: "12px", lineHeight: 1.8, color: "rgba(200,210,190,0.5)" }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
