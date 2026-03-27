export function AboutSection() {
  return (
    <section id="about">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:items-start md:py-24">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--muted-teal)]">
            The Philosophy
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)] sm:text-4xl">
            Your body already moves in rhythms.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--text-soft)]">
            Breath, movement, recovery, and rest all work in rhythm. Stress, pain, and the demands
            of life can interrupt those patterns and leave the body feeling tense, guarded, and out
            of balance.
          </p>

          <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--text-soft)]">
            Guided Rhythms Massage is built to help clients feel more supported in their bodies
            through intentional therapeutic careclear in approach, grounded in professionalism,
            and calm in experience.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[color:var(--border-soft)] bg-white p-8 shadow-[0_20px_50px_rgba(31,61,54,0.05)]">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[color:var(--muted-teal)]">
            What matters here
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <p className="font-medium text-[color:var(--foreground)]">Client-centered treatment</p>
              <p className="mt-2 text-sm leading-7 text-[color:var(--text-soft)]">
                Sessions shaped around the clients goals, comfort, and physical needs.
              </p>
            </div>

            <div>
              <p className="font-medium text-[color:var(--foreground)]">Clear professional care</p>
              <p className="mt-2 text-sm leading-7 text-[color:var(--text-soft)]">
                A treatment experience that feels attentive, organized, and trustworthy.
              </p>
            </div>

            <div>
              <p className="font-medium text-[color:var(--foreground)]">Calm without the clichés</p>
              <p className="mt-2 text-sm leading-7 text-[color:var(--text-soft)]">
                Grounded, restorative design that feels clean and modern rather than overly spa-like.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
