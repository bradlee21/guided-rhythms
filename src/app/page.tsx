import Image from "next/image";

const brand = {
  background: "#F4F1E8",
  backgroundSoft: "#E7E1D2",
  surface: "rgba(255,255,255,0.70)",
  surfaceStrong: "rgba(255,255,255,0.88)",
  border: "rgba(47,58,44,0.10)",
  text: "#2F3A2C",
  textMuted: "#6F6A5C",
  primary: "#6F8F55",
  secondary: "#446E49",
  accent: "#C9922E",
  accentDeep: "#9C6A2A",
  glow: "rgba(201,146,46,0.14)",
};

const eyebrowClass = "text-xs uppercase tracking-[0.35em]";
const sectionTitleClass =
  "mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl";
const sectionBodyClass = "mt-6 text-lg leading-8";
const cardTitleClass = "text-2xl font-semibold tracking-[-0.03em]";
const cardBodyClass = "mt-4 text-base leading-7";

export default function HomePage() {
  const philosophy = [
    {
      title: "Presence",
      body: "We believe clients can feel the difference between routine work and genuine attention. Being fully present is part of the care itself.",
    },
    {
      title: "Listening",
      body: "Each session begins with understanding the person in front of ustheir goals, comfort, concerns, and what kind of support would serve them best.",
    },
    {
      title: "Intention",
      body: "Our work is never meant to feel rushed or mechanical. Every session should have direction, purpose, and a clear sense of care behind it.",
    },
    {
      title: "Restoration",
      body: "We want clients to leave feeling more than temporary relief. Our aim is to create care that feels calming, meaningful, and restorative.",
    },
  ];

  const differentiators = [
    "Intentional, unhurried sessions",
    "Care shaped around the individual",
    "Thoughtful therapeutic support",
    "A calm and restorative atmosphere",
  ];

  const firstVisit = [
    {
      title: "Conversation First",
      body: "We begin by understanding your goals, concerns, preferences, and any areas that need special attention before the session begins.",
    },
    {
      title: "Thoughtful Treatment",
      body: "Your session is shaped with care and purpose rather than treated like a routine. The goal is to create work that actually fits you.",
    },
    {
      title: "Comfort & Professionalism",
      body: "We want every client to feel respected, welcomed, and at ease in an environment built on professionalism, trust, and genuine care.",
    },
  ];

  const therapists = [
    {
      name: "Josh Green",
      role: "Josh brings a creative, client-centered presence to the practice, helping shape an experience that feels thoughtful, restorative, and deeply intentional from the moment someone walks in.",
    },
    {
      name: "Brad Ivy",
      role: "Brad brings a therapeutic, recovery-minded approach rooted in listening, purposeful treatment, and long-term care that helps clients feel supported rather than rushed through a routine.",
    },
  ];

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: brand.background, color: brand.text }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 12% 10%, ${brand.glow}, transparent 20%),
            radial-gradient(circle at 88% 14%, rgba(111,143,85,0.10), transparent 20%),
            radial-gradient(circle at 50% 100%, rgba(255,255,255,0.32), transparent 30%),
            linear-gradient(180deg, ${brand.backgroundSoft} 0%, ${brand.background} 52%, #EFE8DB 100%)
          `,
        }}
      />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(47,58,44,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(47,58,44,0.04)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div
        className="absolute left-[-8rem] top-[-6rem] h-[22rem] w-[22rem] rounded-full blur-3xl"
        style={{ backgroundColor: brand.glow }}
      />
      <div
        className="absolute right-[-8rem] top-[10rem] h-[24rem] w-[24rem] rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(111,143,85,0.10)" }}
      />

      <div className="relative z-10">
        <header className="px-6 pb-6 pt-6 md:px-10 lg:px-16">
          <div
            className="mx-auto flex max-w-7xl items-center justify-between pb-5"
            style={{ borderBottom: `1px solid ${brand.border}` }}
          >
            <div className="flex items-center gap-5">
              <div
                className="relative h-24 w-24 overflow-hidden rounded-2xl md:h-28 md:w-28"
                style={{
                  border: `1px solid ${brand.border}`,
                  backgroundColor: brand.surfaceStrong,
                  boxShadow: "0 18px 50px rgba(47,58,44,0.08)",
                }}
              >
                <Image
                  src="/guided-rhythms-logo.png"
                  alt="Guided Rhythms Massage logo"
                  fill
                  className="object-contain p-2.5"
                  priority
                />
              </div>

              <div>
                <p
                  className="text-[0.72rem] uppercase tracking-[0.38em]"
                  style={{ color: brand.secondary }}
                >
                  Guided Rhythms Massage
                </p>
                <p className="mt-2 text-sm md:text-base" style={{ color: brand.textMuted }}>
                  Intentional care for restoration and wellness
                </p>
              </div>
            </div>

            <nav
              className="hidden items-center gap-8 text-sm md:flex"
              style={{ color: brand.textMuted }}
            >
              <a className="opacity-80 transition hover:opacity-100" href="#about">
                About
              </a>
              <a className="opacity-80 transition hover:opacity-100" href="#philosophy">
                Philosophy
              </a>
              <a className="opacity-80 transition hover:opacity-100" href="#services">
                Services
              </a>
              <a className="opacity-80 transition hover:opacity-100" href="#new-clients">
                New Clients
              </a>
              <a
                className="rounded-full px-4 py-2 transition"
                href="#contact"
                style={{
                  border: `1px solid ${brand.border}`,
                  backgroundColor: brand.surface,
                  color: brand.text,
                }}
              >
                Contact
              </a>
            </nav>
          </div>
        </header>

        <section className="px-6 pb-20 pt-10 md:px-10 md:pt-16 lg:px-16 lg:pb-24">
          <div className="mx-auto grid max-w-7xl items-end gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative">
              <div
                className="absolute -left-8 top-5 hidden h-32 w-32 rounded-full lg:block"
                style={{ border: `1px solid ${brand.border}` }}
              />
              <div
                className="absolute left-28 top-28 hidden h-px w-36 lg:block"
                style={{
                  background: `linear-gradient(to right, ${brand.primary}, transparent)`,
                }}
              />

              <p
                className="mb-5 text-xs uppercase tracking-[0.4em]"
                style={{ color: brand.accentDeep }}
              >
                Serving Central Pennsylvania
              </p>

              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl">
                A massage practice built on
                <span
                  className="block bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${brand.secondary}, ${brand.primary}, ${brand.accent})`,
                  }}
                >
                  presence, listening, and purpose.
                </span>
              </h1>

              <p
                className="mt-8 max-w-2xl text-lg leading-8 md:text-xl"
                style={{ color: brand.textMuted }}
              >
                Guided Rhythms Massage offers thoughtful massage therapy rooted
                in presence, communication, and purposeful careso clients feel
                genuinely seen, supported, and restored.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#about"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-[1.01]"
                  style={{
                    background: `linear-gradient(to right, ${brand.primary}, ${brand.accent})`,
                    color: "#FFFFFF",
                    boxShadow: `0 12px 30px ${brand.glow}`,
                  }}
                >
                  Meet the Therapists
                </a>
                <a
                  href="#philosophy"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
                  style={{
                    border: `1px solid ${brand.border}`,
                    backgroundColor: brand.surface,
                    color: brand.text,
                    boxShadow: "0 12px 30px rgba(47,58,44,0.05)",
                  }}
                >
                  Our Philosophy
                </a>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute inset-x-8 top-8 h-full rounded-[2rem] blur-2xl"
                style={{
                  background: `linear-gradient(to bottom, ${brand.glow}, transparent)`,
                }}
              />
              <div
                className="relative overflow-hidden rounded-[2rem] p-8 backdrop-blur-xl"
                style={{
                  border: `1px solid ${brand.border}`,
                  backgroundColor: brand.surface,
                  boxShadow: "0 20px 60px rgba(47,58,44,0.08)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at top left, rgba(255,255,255,0.55), transparent 36%)",
                  }}
                />

                <div className="relative">
                  <p className={eyebrowClass} style={{ color: brand.textMuted }}>
                    What sets the tone
                  </p>

                  <div className="mt-8 space-y-6">
                    {differentiators.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-4 pb-6 last:pb-0"
                        style={{ borderBottom: `1px solid ${brand.border}` }}
                      >
                        <div
                          className="mt-2 h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor: brand.accent,
                            boxShadow: `0 0 20px ${brand.glow}`,
                          }}
                        />
                        <p className="text-base leading-7">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-10 rounded-[1.5rem] p-6"
                    style={{
                      border: `1px solid ${brand.border}`,
                      background:
                        "linear-gradient(to bottom right, rgba(255,255,255,0.62), rgba(255,255,255,0.24))",
                    }}
                  >
                    <p className="text-sm uppercase tracking-[0.28em]" style={{ color: brand.secondary }}>
                      The direction
                    </p>
                    <p className={cardBodyClass} style={{ color: brand.textMuted }}>
                      Every part of the practice is shaped around calm
                      professionalism, meaningful care, and an experience that
                      feels personal rather than routine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="px-6 py-20 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div
              className="mb-12 flex items-end justify-between gap-6 pb-6"
              style={{ borderBottom: `1px solid ${brand.border}` }}
            >
              <div>
                <p className={eyebrowClass} style={{ color: brand.secondary }}>
                  About us
                </p>
                <h2 className={sectionTitleClass}>
                  Two therapists building something thoughtful.
                </h2>
              </div>
              <p className="hidden max-w-xl text-right text-lg leading-8 lg:block" style={{ color: brand.textMuted }}>
                Guided Rhythms Massage exists to offer thoughtful, restorative
                care rooted in presence, professionalism, and a genuine respect
                for each clients experience.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {therapists.map((therapist) => (
                <article
                  key={therapist.name}
                  className="relative overflow-hidden rounded-[2rem] p-8"
                  style={{
                    border: `1px solid ${brand.border}`,
                    backgroundColor: brand.surface,
                    boxShadow: "0 18px 40px rgba(47,58,44,0.06)",
                  }}
                >
                  <div
                    className="absolute right-0 top-0 h-32 w-32 rounded-full blur-2xl"
                    style={{ backgroundColor: "rgba(111,143,85,0.10)" }}
                  />
                  <h3 className="text-[1.75rem] font-semibold tracking-[-0.03em]">
                    {therapist.name}
                  </h3>
                  <p className="mt-5 max-w-xl text-lg leading-8" style={{ color: brand.textMuted }}>
                    {therapist.role}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="philosophy" className="px-6 py-20 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className={eyebrowClass} style={{ color: brand.secondary }}>
                Our philosophy
              </p>
              <h2 className={sectionTitleClass}>
                Massage should feel intentional, not mechanical.
              </h2>
              <p className={sectionBodyClass} style={{ color: brand.textMuted }}>
                We believe meaningful massage therapy is built on more than
                technique alone. It is shaped by communication, presence,
                thoughtful care, and an environment that allows clients to feel
                both supported and at ease.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {philosophy.map((item) => (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-[2rem] p-8"
                  style={{
                    border: `1px solid ${brand.border}`,
                    background:
                      "linear-gradient(to bottom right, rgba(255,255,255,0.72), rgba(255,255,255,0.34))",
                    boxShadow: "0 18px 40px rgba(47,58,44,0.05)",
                  }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-px opacity-70"
                    style={{
                      background: `linear-gradient(to right, transparent, ${brand.accent}, transparent)`,
                    }}
                  />
                  <h3 className={cardTitleClass}>{item.title}</h3>
                  <p className={cardBodyClass} style={{ color: brand.textMuted }}>
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="px-6 py-20 md:px-10 lg:px-16">
          <div
            className="mx-auto max-w-7xl rounded-[2rem] p-8 md:p-12"
            style={{
              border: `1px solid ${brand.border}`,
              backgroundColor: brand.surface,
              boxShadow: "0 20px 50px rgba(47,58,44,0.05)",
            }}
          >
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className={eyebrowClass} style={{ color: brand.secondary }}>
                  Service direction
                </p>
                <h2 className={sectionTitleClass}>
                  Care shaped around the person, not a preset routine.
                </h2>
                <p className={sectionBodyClass} style={{ color: brand.textMuted }}>
                  Guided Rhythms Massage offers customized sessions built around
                  your goals, comfort, and the kind of support your body needs.
                  The focus is not on running through a fixed routine, but on
                  providing thoughtful care that feels personal, intentional,
                  and restorative.
                </p>
              </div>

              <div className="grid gap-4">
                <article
                  className="rounded-[1.75rem] p-6 md:p-7"
                  style={{
                    border: `1px solid ${brand.border}`,
                    background:
                      "linear-gradient(to bottom right, rgba(255,255,255,0.70), rgba(255,255,255,0.38))",
                    boxShadow: "0 16px 36px rgba(47,58,44,0.04)",
                  }}
                >
                  <p
                    className="text-sm uppercase tracking-[0.28em]"
                    style={{ color: brand.secondary }}
                  >
                    Customized Sessions
                  </p>
                  <p className="mt-4 text-lg leading-8" style={{ color: brand.textMuted }}>
                    Each session is shaped with intention, taking into account
                    how youre feeling, what you want to focus on, and the kind
                    of care that would best serve you that day.
                  </p>
                </article>

                <div className="grid gap-4 md:grid-cols-2">
                  <article
                    className="rounded-[1.5rem] p-5"
                    style={{
                      border: `1px solid ${brand.border}`,
                      backgroundColor: "rgba(255,255,255,0.54)",
                    }}
                  >
                    <p
                      className="text-sm uppercase tracking-[0.24em]"
                      style={{ color: brand.secondary }}
                    >
                      Restorative Care
                    </p>
                    <p className={cardBodyClass} style={{ color: brand.textMuted }}>
                      Care that supports relaxation, calm, and a more grounded
                      physical and mental state.
                    </p>
                  </article>

                  <article
                    className="rounded-[1.5rem] p-5"
                    style={{
                      border: `1px solid ${brand.border}`,
                      backgroundColor: "rgba(255,255,255,0.54)",
                    }}
                  >
                    <p
                      className="text-sm uppercase tracking-[0.24em]"
                      style={{ color: brand.secondary }}
                    >
                      Focused Support
                    </p>
                    <p className={cardBodyClass} style={{ color: brand.textMuted }}>
                      Thoughtful work for areas that need more attention, always
                      guided by communication and client comfort.
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="new-clients" className="px-6 py-20 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className={eyebrowClass} style={{ color: brand.secondary }}>
                For new clients
              </p>
              <h2 className={sectionTitleClass}>
                The first visit should feel clear, calm, and personal.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {firstVisit.map((item) => (
                <article
                  key={item.title}
                  className="relative rounded-[2rem] p-8"
                  style={{
                    border: `1px solid ${brand.border}`,
                    backgroundColor: brand.surface,
                    boxShadow: "0 18px 40px rgba(47,58,44,0.05)",
                  }}
                >
                  <div
                    className="mb-6 h-px w-16"
                    style={{
                      background: `linear-gradient(to right, ${brand.primary}, transparent)`,
                    }}
                  />
                  <h3 className={cardTitleClass}>{item.title}</h3>
                  <p className={cardBodyClass} style={{ color: brand.textMuted }}>
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

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
                <p className={eyebrowClass} style={{ color: brand.secondary }}>
                  Contact
                </p>
                <h2 className={sectionTitleClass}>
                  Wed love to connect with you.
                </h2>
                <p className={`${sectionBodyClass} max-w-2xl`} style={{ color: brand.textMuted }}>
                  Whether youre interested in learning more about the practice
                  or reaching out directly, Guided Rhythms Massage is committed
                  to making every interaction feel thoughtful, clear, and
                  personal.
                </p>
              </div>

              <div
                className="space-y-5 rounded-[1.75rem] p-6"
                style={{
                  border: `1px solid ${brand.border}`,
                  backgroundColor: "rgba(255,255,255,0.58)",
                }}
              >
                <div>
                  <p
                    className="text-sm uppercase tracking-[0.28em]"
                    style={{ color: brand.textMuted }}
                  >
                    Josh Green
                  </p>
                  <p className="mt-3 text-base" style={{ color: brand.text }}>
                    greenrjoshua@gmail.com
                  </p>
                  <p className="mt-1 text-base" style={{ color: brand.text }}>
                    (717) 648-9671
                  </p>
                </div>

                <div className="pt-5" style={{ borderTop: `1px solid ${brand.border}` }}>
                  <p
                    className="text-sm uppercase tracking-[0.28em]"
                    style={{ color: brand.textMuted }}
                  >
                    Brad Ivy
                  </p>
                  <p className="mt-3 text-base" style={{ color: brand.text }}>
                    bradlee.ivycc@gmail.com
                  </p>
                  <p className="mt-1 text-base" style={{ color: brand.text }}>
                    (717) 855-6808
                  </p>
                </div>

                <div className="pt-5" style={{ borderTop: `1px solid ${brand.border}` }}>
                  <p
                    className="text-sm uppercase tracking-[0.28em]"
                    style={{ color: brand.textMuted }}
                  >
                    Guided Rhythms Massage
                  </p>
                  <p className="mt-2 text-base leading-7" style={{ color: brand.textMuted }}>
                    Thoughtful massage therapy rooted in presence,
                    professionalism, and restorative care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
