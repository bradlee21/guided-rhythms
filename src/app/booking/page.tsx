import Link from "next/link";

import { PageShell } from "@/components/app/PageShell";
import { brand } from "@/lib/brand";

const bookingPaths = [
  {
    href: "/booking/new",
    title: "New Client Request",
    body: "Start with the first request path for a first-time Guided Rhythms visit. Share your service choice, date preferences, and what you want support with.",
  },
  {
    href: "/booking/returning",
    title: "Returning Client Request",
    body: "Use the returning client path if you have already been seen by the practice and want to request another session.",
  },
] as const;

export default function BookingPage() {
  return (
    <PageShell
      eyebrow="Booking"
      title="Request a session"
      description="Guided Rhythms uses a calm request-first booking flow. Choose the path that matches your relationship to the practice, then submit your preferred service and timing."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {bookingPaths.map((path) => (
          <section
            key={path.href}
            className="rounded-[2rem] p-6 md:p-8"
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.78), rgba(255,255,255,0.58))",
              border: `1px solid ${brand.border}`,
              boxShadow: "0 18px 40px rgba(47,58,44,0.05)",
            }}
          >
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">
              {path.title}
            </h2>
            <p className="mt-4 text-base leading-7" style={{ color: brand.textMuted }}>
              {path.body}
            </p>
            <Link
              href={path.href}
              className="mt-8 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold"
              style={{
                backgroundColor: brand.surfaceStrong,
                border: `1px solid ${brand.border}`,
              }}
            >
              Continue
            </Link>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
