const points = [
  "Thoughtful intake and listening",
  "Therapeutic bodywork tailored to the client",
  "Calm, grounded session environment",
];

export default function Approach() {
  return (
    <section id="approach" className="scroll-mt-28">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--muted-sage)]">
          OUR APPROACH
        </p>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
          Therapeutic massage grounded in intention.
        </h2>

        <p className="mt-6 max-w-2xl text-neutral-600 leading-relaxed">
          Guided Rhythms is built around a simple idea: massage should support real recovery, not
          just temporary relaxation. Every session is approached with care, attention, and respect
          for the individual client. The goal is to create a calm environment where the body can
          release tension, restore balance, and return to its natural rhythm.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {points.map((point) => (
            <p key={point} className="text-sm text-neutral-700">
              {point}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
