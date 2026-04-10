"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const currentPage = adminNavItems.find((item) =>
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname === item.href || pathname.startsWith(item.href + "/")
  );

  const Sidebar = () => (
    <aside style={{
      width: "260px",
      borderRight: `1px solid ${brand.border}`,
      padding: "32px 24px",
      height: "100%",
      overflowY: "auto",
      background: brand.backgroundSoft,
      display: "flex",
      flexDirection: "column",
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
              <p style={{ fontSize: "13px", fontWeight: 400, color: isActive ? "#F0EBE0" : brand.text, fontFamily: "'DM Sans', sans-serif", marginBottom: "2px" }}>
                {item.label}
              </p>
              <p style={{ fontSize: "12px", color: isActive ? "rgba(240,235,224,0.6)" : brand.textSoft, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
                {item.description}
              </p>
            </Link>
          );
        })}
      </nav>
      <div style={{ marginTop: "auto", paddingTop: "24px", borderTop: `1px solid ${brand.border}` }}>
        <AdminSignOutButton />
      </div>
    </aside>
  );

  return (
    <div style={{ minHeight: "100vh", background: brand.background }}>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 40 }}
        />
      )}

      {/* Mobile drawer */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: 50,
        transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.25s ease",
        display: "block",
      }}>
        <Sidebar />
      </div>

      {/* Desktop layout */}
      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* Desktop sidebar — hidden on mobile */}
        <div style={{ display: "none" }} className="lg-sidebar">
          <div style={{ position: "sticky", top: 0, height: "100vh", width: "260px" }}>
            <Sidebar />
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

          {/* Top bar */}
          <header style={{
            padding: "14px 20px",
            borderBottom: `1px solid ${brand.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: brand.backgroundSoft,
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}
                aria-label="Open menu"
              >
                <span style={{ width: "22px", height: "1.5px", background: brand.text, display: "block", transition: "transform 0.2s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
                <span style={{ width: "22px", height: "1.5px", background: brand.text, display: "block", opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
                <span style={{ width: "22px", height: "1.5px", background: brand.text, display: "block", transition: "transform 0.2s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
              </button>
              <div>
                <p style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: brand.textSoft, fontFamily: "'DM Sans', sans-serif", marginBottom: "1px" }}>
                  {currentPage?.label ?? "Admin"}
                </p>
                <p style={{ fontSize: "13px", color: brand.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                  {adminName ? `Welcome, ${adminName}.` : adminEmail ?? ""}
                </p>
              </div>
            </div>
            <AdminSignOutButton />
          </header>

          {/* Page content */}
          <main style={{ padding: "24px 20px", flex: 1 }}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
