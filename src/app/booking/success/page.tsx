import Link from "next/link";
import { brand } from "@/lib/brand";

export default function BookingSuccessPage() {
  return (
    <div style={{ minHeight: "100vh", background: brand.background, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
      <div style={{ maxWidth: "520px", width: "100%", textAlign: "center" }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: brand.goldPale, border: `1px solid ${brand.borderGold}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", fontSize: "22px" }}>
          ✓
        </div>
        <p style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "16px" }}>
          You're booked
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, color: brand.text, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "24px" }}>
          We'll see you soon.
        </h1>
        <p style={{ fontSize: "15px", lineHeight: 1.85, color: brand.textMuted, fontFamily: "'DM Sans', sans-serif", marginBottom: "48px" }}>
          A confirmation has been noted. You'll hear from us before your session with any details you need. If you have questions in the meantime, reach out directly.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{ padding: "13px 32px", background: brand.forest, color: "#F0EBE0", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", borderRadius: "2px" }}>
            Back to home
          </Link>
          <Link href="/booking/schedule" style={{ padding: "13px 32px", border: `1px solid ${brand.borderMed}`, color: brand.text, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", borderRadius: "2px" }}>
            Book another
          </Link>
        </div>
      </div>
    </div>
  );
}
