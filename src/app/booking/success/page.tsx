import Link from "next/link";

import { PageShell } from "@/components/app/PageShell";
import { PlaceholderPanel } from "@/components/app/PlaceholderPanel";
import { brand } from "@/lib/brand";

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ request?: string }>;
}) {
  const { request } = await searchParams;

  return (
    <PageShell
      eyebrow="Booking"
      title="Request received"
      description="Your booking request is in the review queue. Guided Rhythms can now review the submitted details and follow up from the admin side."
    >
      <PlaceholderPanel
        title="Submission complete"
        body={
          request
            ? `Booking request ${request} has been recorded.`
            : "Your booking request has been recorded."
        }
      >
        <Link
          href="/"
          className="inline-flex rounded-full px-5 py-2.5 text-sm font-semibold"
          style={{
            backgroundColor: brand.surfaceStrong,
            border: `1px solid ${brand.border}`,
          }}
        >
          Return home
        </Link>
      </PlaceholderPanel>
    </PageShell>
  );
}
