import { brand, homeTypography } from "@/lib/brand";

const services = [
  {
    label: "Customized Sessions",
    body: "Each session is shaped with intention, taking into account how you're feeling, what you want to focus on, and the kind of care that would best serve you that day.",
  },
  {
    label: "Restorative Care",
    body: "Care that supports relaxation, calm, and a more grounded physical and mental state — built around your body's needs, not a fixed sequence.",
  },
  {
    label: "Focused Support",
    body: "Thoughtful work for areas that need more attention, always guided by communication and client comfort.",
  },
];

export function HomeServicesSection() {
  return (
    <section id="services" className="px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
          <div>
            <p className={homeTypography.eyebrow} style={{ color: brand.secondary }}>
              Services
            </p>
            <h2 className={homeTypography.sectionTitle}>
              Care shaped around the person.
            </h2>
          </div>
          <p className="self-end text-lg leading-8" style={{ color: brand.textMuted }}>
            Guided Rhythms Massage offers customized sessions built around your goals
            and comfort. The focus is not on a fixed routine, but on thoughtful care
            that feels personal, intentional, and restorative.
          </p>
        </div>

        <div className="mt-20">
          {services.map((service) => (
            <div
              key={service.label}
              className="grid gap-6 py-10 md:grid-cols-[1fr_2fr] md:gap-16"
              style={{ borderTop: `1px solid ${brand.border}` }}
            >
              <h3 className="text-2xl md:text-3xl" style={{ color: brand.text }}>
                {service.label}
              </h3>
              <p className="text-base leading-7" style={{ color: brand.textMuted }}>
                {service.body}
              </p>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${brand.border}` }} />
        </div>

      </div>
    </section>
  );
}
