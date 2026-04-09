"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";
import { adminNavItems } from "@/components/admin/admin-nav";
import { brand } from "@/lib/brand";

export function AdminShell({
  children,
  adminEmail,
  adminName,
}: {
  children: ReactNode;
  adminEmail: string | null;
  adminName?: string;
}) {
  const pathname = usePathname();

  return (
    <div style={{ minHeight: "100vh", background: brand.background, display: "grid", gridTemplateColumns: "260px minmax(0,1fr)" }}>

      {/* Sidebar */}
      <aside style={{
        borderRight: `1px solid ${brand.border}`,
        padding: "32px 24px",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        background: brand.backgroundSoft,
        display: "flex",
        flexDirection: "column",
        gap: "0",
      }}>
        <div style={{ paddingBottom: "24px", borderBottom: `1px solid ${brand.border}`, marginBottom: "24px" }}>
          <p style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "8px" }}>
            Guided Rhythms
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 300, color: brand.text, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Admin
          </h1>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {adminNavItems.map((item) => {
            const isActive = item.href === "/admin"
              ? pathname === "/admin"
              : pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  borderRadius: "2px",
                  textDecoration: "none",
                  background: isActive ? brand.forest : "transparent",
                  borderLeft: isActive ? `3px solid ${brand.gold}` : "3px solid transparent",
                  transition: "background 0.15s",
                }}
              >
                <p style={{
                  fontSize: "13px",
                  fontWeight: 400,
                  color: isActive ? "#F0EBE0" : brand.text,
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: "2px",
                }}>
                  {item.label}
                </p>
                <p style={{
                  fontSize: "12px",
                  color: isActive ? "rgba(240,235,224,0.6)" : brand.textSoft,
                  fontFamily: "'DM Sans', sans-serif",
                  lineHeight: 1.5,
                }}>
                  {item.description}
                </p>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* Top bar */}
        <header style={{
          padding: "16px 48px",
          borderBottom: `1px solid ${brand.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: brand.backgroundSoft,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "2px" }}>
              Guided Rhythms Admin
            </p>
            <p style={{ fontSize: "13px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
              {adminName ? `Welcome, ${adminName}.` : adminEmail ? `Signed in as ${adminEmail}.` : "Authenticated session."}
            </p>
          </div>
          <AdminSignOutButton />
        </header>

        {/* Content */}
        <main style={{ padding: "48px", flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
