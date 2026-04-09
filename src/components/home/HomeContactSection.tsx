import { homeContent } from "@/components/home/home-content";
import { brand, homeTypography } from "@/lib/brand";

export function HomeContactSection() {
  return (
    <section id="contact" className="px-6 py-24 md:px-10 lg:px-16">
      <div
        className="mx-auto max-w-7xl"
        style={{ borderTop: `1px solid ${brand.border}` }}
      >

        <div className="pt-16 grid gap-10 md:grid-cols-2 md:gap-20">
          <div>
            <p className={homeTypography.eyebrow} style={{ color: brand.secondary }}>
              Contact
            </p>
            <h2 className={homeTypography.sectionTitle}>
              We&apos;d love to connect with you.
            </h2>
            <p className="mt-6 text-lg leading-8" style={{ color: brand.textMuted }}>
              Whether you&apos;re curious about the practice or ready to book,
              we&apos;re committed to making every interaction feel thoughtful and personal.
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 self-end">
            {homeContent.contacts.map((contact) => (
              <div key={contact.email}>
                <div
                  className="mb-5 h-px w-10"
                  style={{ background: brand.accent }}
                />
                <p className="text-xl md:text-2xl" style={{ color: brand.text }}>
                  {contact.name}
                </p>
                <p className="mt-3 text-sm leading-6" style={{ color: brand.textMuted }}>
                  {contact.email}
                </p>
                <p className="mt-1 text-sm leading-6" style={{ color: brand.textMuted }}>
                  {contact.phone}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
