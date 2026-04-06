"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { brand } from "@/lib/brand";
import { createClient } from "@/lib/supabase/client";

export function AdminSignOutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={async () => {
        setIsPending(true);

        try {
          const supabase = createClient();
          await supabase.auth.signOut();
          router.push("/login");
          router.refresh();
        } finally {
          setIsPending(false);
        }
      }}
      className="rounded-full px-4 py-2 text-sm disabled:opacity-60"
      style={{
        backgroundColor: "rgba(255,255,255,0.78)",
        border: `1px solid ${brand.border}`,
        color: brand.textMuted,
      }}
    >
      {isPending ? "Signing out..." : "Sign out"}
    </button>
  );
}
