import Link from "next/link";

import { PageShell } from "@/components/app/PageShell";
import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";
import { brand } from "@/lib/brand";

export default function BookingPage() {
  return (
    <PageShell
      eyebrow="Booking"
      title="Booking entry point"
      description="This route will become the public booking hub for new and returning clients. In this foundation slice it only establishes the route structure and the transition points into future workflows."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <PlaceholderPanel
          title="New client path"
          body="The new client route is scaffolded for future intake-aware booking. No scheduling, availability, or request submission is wired yet."
        >
          <Link
            href="/booking/new"
            className="inline-flex rounded-full px-5 py-2.5 text-sm font-semibold"
            style={{
              backgroundColor: brand.surfaceStrong,
              border: `1px solid ${brand.border}`,
            }}
          >
            View new client route
          </Link>
        </PlaceholderPanel>

        <PlaceholderPanel
          title="Returning client path"
          body="The returning client route is scaffolded separately so future flows can diverge cleanly without changing public URLs later."
        >
          <Link
            href="/booking/returning"
            className="inline-flex rounded-full px-5 py-2.5 text-sm font-semibold"
            style={{
              backgroundColor: brand.surfaceStrong,
              border: `1px solid ${brand.border}`,
            }}
          >
            View returning client route
          </Link>
        </PlaceholderPanel>
      </div>
    </PageShell>
  );
}
