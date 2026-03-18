"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Building2, BarChart3,
  ChevronRight, Home, LogOut,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const NAV = [
  { href: "/leads", icon: Users, label: "Leads" },
  { href: "/properties", icon: Building2, label: "Properties" },
  { href: "/matching", icon: LayoutDashboard, label: "Matching" },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
];

export default function DashboardLayout({
  children,
  title,
  subtitle,
}: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#080b12" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          background: "#080b12",
          borderRight: "1px solid #161b22",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            padding: "20px 16px 16px",
            borderBottom: "1px solid #161b22",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: "linear-gradient(135deg,#f97316,#ea580c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Home size={13} color="#fff" />
            </div>
            <span
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#e6edf3",
              }}
            >
              GharPayy
            </span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "10px 8px" }}>
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "8px 10px",
                  borderRadius: 8,
                  marginBottom: 2,
                  color: active ? "#f97316" : "#6e7681",
                  background: active ? "rgba(249,115,22,0.1)" : "transparent",
                  border: `1px solid ${active ? "rgba(249,115,22,0.2)" : "transparent"}`,
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  transition: "all 0.15s",
                }}
              >
                <Icon size={14} />
                <span style={{ flex: 1 }}>{label}</span>
                {active && (
                  <ChevronRight size={11} style={{ opacity: 0.6 }} />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div style={{ marginLeft: 220, flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        {(title || subtitle) && (
          <div
            style={{
              padding: "20px 28px 0",
              marginBottom: 24,
            }}
          >
            {title && (
              <h1
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#e6edf3",
                  marginBottom: 4,
                }}
              >
                {title}
              </h1>
            )}
            {subtitle && (
              <p style={{ fontSize: 13, color: "#6e7681" }}>{subtitle}</p>
            )}
          </div>
        )}
        <main style={{ flex: 1, padding: title ? "0 28px 32px" : "28px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
