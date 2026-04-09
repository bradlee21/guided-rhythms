import Link from "next/link";
import { brand } from "@/lib/brand";

export default function FormsCompletedPage() {
  return (
    <div style={{ minHeight: "100vh", background: brand.background, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
      <div style={{ maxWidth: "520px", width: "100%", textAlign: "center" }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(46,74,48,0.08)", border: `1px solid rgba(46,74,48,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", fontSize: "22px" }}>
          ✓
        </div>
        <p style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "16px" }}>
          Form received
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, color: brand.text, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "24px" }}>
          Thank you for completing your intake.
        </h1>
        <p style={{ fontSize: "15px", lineHeight: 1.85, color: brand.textMuted, fontFamily: "'DM Sans', sans-serif", marginBottom: "48px" }}>
          Your therapist will review your health history before your session. If anything needs clarification, they'll reach out. See you soon.
        </p>
        <Link href="/" style={{ padding: "13px 32px", background: brand.forest, color: "#F0EBE0", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", borderRadius: "2px" }}>
          Back to home
        </Link>
      </div>
    </div>
  );
}
