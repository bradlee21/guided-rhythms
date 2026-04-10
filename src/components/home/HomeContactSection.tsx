import { brand, homeTypography } from "@/lib/brand";
import { homeContent } from "@/components/home/home-content";

export function HomeContactSection() {
  return (
    <section id="contact" style={{ padding: "64px 24px", background: brand.forest }} className="contact-section">
      <div className="contact-grid">
        <div style={{ marginBottom: "40px" }}>
          <p className={homeTypography.eyebrow} style={{ color: brand.sageLight, marginBottom: "16px" }}>Get in touch</p>
          <span style={{ width: "40px", height: "1px", background: brand.gold, display: "block", marginBottom: "24px" }} />
          <h2 style={{ fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 300, lineHeight: 1.1, color: "#F0EBE0", letterSpacing: "-0.02em", marginBottom: "14px" }}>
            Ready when you are.
          </h2>
          <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(200,210,190,0.5)" }}>
            Whether you have questions or you're ready to book — reach out directly. We keep it simple.
          </p>
        </div>
        {homeContent.contacts.map((contact, i) => (
          <div key={contact.name} style={{ borderTop: `1px solid rgba(255,255,255,0.08)`, paddingTop: "32px", marginBottom: "32px" }} className="contact-therapist">
            <span style={{ width: "24px", height: "1px", background: i === 0 ? brand.gold : brand.sageLight, display: "block", marginBottom: "14px" }} />
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: "#F0EBE0", marginBottom: "4px" }}>{contact.name}</h3>
            <p className={homeTypography.eyebrow} style={{ color: i === 0 ? brand.gold : brand.sageLight, marginBottom: "12px" }}>{contact.specialty}</p>
            <p style={{ fontSize: "15px", color: "rgba(220,210,195,0.8)", marginBottom: "4px" }}>{contact.email}</p>
            <p style={{ fontSize: "15px", color: "rgba(200,190,175,0.55)", marginBottom: "16px" }}>{contact.phone}</p>
            <a href="/booking/schedule" style={{ display: "inline-block", padding: "10px 24px", border: "1px solid rgba(255,255,255,0.2)", color: "#F0EBE0", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", borderRadius: "2px" }}>
              Book a session
            </a>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "32px", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,190,175,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
          Veteran Owned &amp; Operated · U.S. Army &amp; U.S. Marine Corps
        </p>
      </div>
    </section>
  );
}
