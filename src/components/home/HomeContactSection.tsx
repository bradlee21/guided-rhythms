import { homeContent } from "@/components/home/home-content";
import { brand, homeTypography } from "@/lib/brand";

export function HomeContactSection() {
  return (
    <section id="contact" className="px-6 py-20 md:px-10 lg:px-16">
      <div
        className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] p-8 md:p-12"
        style={{
          border: `1px solid ${brand.border}`,
          background:
            "linear-gradient(to bottom right, rgba(255,255,255,0.76), rgba(255,255,255,0.46), rgba(255,255,255,0.66))",
          boxShadow: "0 24px 60px rgba(47,58,44,0.06)",
        }}
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className={homeTypography.eyebrow} style={{ color: brand.secondary }}>
              Contact
            </p>
            <h2 className={homeTypography.sectionTitle}>
              We&apos;d love to connect with you.
            </h2>
            <p
              className={`${homeTypography.sectionBody} max-w-2xl`}
              style={{ color: brand.textMuted }}
            >
              Whether you&apos;re interested in learning more about the practice
              or reaching out directly, Guided Rhythms Massage is committed to
              making every interaction feel thoughtful, clear, and personal.
            </p>
          </div>

          <div
            className="space-y-5 rounded-[1.75rem] p-6"
            style={{
              border: `1px solid ${brand.border}`,
              backgroundColor: "rgba(255,255,255,0.58)",
            }}
          >
            {homeContent.contacts.map((contact, index) => (
              <div
                key={contact.email}
                className={index === 0 ? undefined : "pt-5"}
                style={
                  index === 0
                    ? undefined
                    : { borderTop: `1px solid ${brand.border}` }
                }
              >
                <p
                  className="text-sm uppercase tracking-[0.28em]"
                  style={{ color: brand.textMuted }}
                >
                  {contact.name}
                </p>
                <p className="mt-3 text-base" style={{ color: brand.text }}>
                  {contact.email}
                </p>
                <p className="mt-1 text-base" style={{ color: brand.text }}>
                  {contact.phone}
                </p>
              </div>
            ))}

            <div className="pt-5" style={{ borderTop: `1px solid ${brand.border}` }}>
              <p
                className="text-sm uppercase tracking-[0.28em]"
                style={{ color: brand.textMuted }}
              >
                Guided Rhythms Massage
              </p>
              <p
                className="mt-2 text-base leading-7"
                style={{ color: brand.textMuted }}
              >
                Thoughtful massage therapy rooted in presence,
                professionalism, and restorative care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
