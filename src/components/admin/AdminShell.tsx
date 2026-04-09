"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";
import { adminNavItems } from "@/components/admin/admin-nav";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function AdminShell({
  children,
  adminEmail,
}: {
  children: ReactNode;
  adminEmail: string | null;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside
          className="rounded-[2rem] p-5 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.62))",
            border: `1px solid ${brand.border}`,
            boxShadow: "0 20px 50px rgba(47,58,44,0.06)",
          }}
        >
          <div className="border-b pb-5" style={{ borderColor: brand.border }}>
            <p
              className="text-xs uppercase tracking-[0.32em]"
              style={{ color: brand.secondary }}
            >
              Guided Rhythms
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
              Admin
            </h1>
            <p className="mt-3 text-sm leading-6" style={{ color: brand.textMuted }}>
              Calm operational scaffolding for the V1 practice app.
            </p>
          </div>

          <nav className="mt-5 space-y-2">
            {adminNavItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-[1.25rem] px-4 py-3 transition",
                    isActive ? "shadow-[0_14px_30px_rgba(47,58,44,0.08)]" : "hover:bg-white/50",
                  )}
                  style={{
                    backgroundColor: isActive ? brand.surfaceStrong : "transparent",
                    border: isActive ? `1px solid ${brand.border}` : "1px solid transparent",
                  }}
                >
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="mt-1 text-sm leading-6" style={{ color: brand.textMuted }}>
                    {item.description}
                  </p>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="space-y-4">
          <header
            className="flex flex-col gap-4 rounded-[2rem] px-6 py-5 md:flex-row md:items-center md:justify-between"
            style={{
              backgroundColor: "rgba(255,255,255,0.74)",
              border: `1px solid ${brand.border}`,
              boxShadow: "0 18px 40px rgba(47,58,44,0.05)",
            }}
          >
            <div>
              <p
                className="text-xs uppercase tracking-[0.32em]"
                style={{ color: brand.secondary }}
              >
                Guided Rhythms Admin
              </p>
              <p className="mt-2 text-sm leading-6" style={{ color: brand.textMuted }}>
                {adminEmail
                  ? `Signed in as ${adminEmail}.`
                  : "Authenticated admin session."}{" "}
                Booking requests are protected; other admin areas remain scaffolded.
              </p>
            </div>
            <AdminSignOutButton />
          </header>

          <div
            className="rounded-[2rem] p-4 md:p-6"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.76), rgba(255,255,255,0.58))",
              border: `1px solid ${brand.border}`,
              boxShadow: "0 20px 50px rgba(47,58,44,0.05)",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
