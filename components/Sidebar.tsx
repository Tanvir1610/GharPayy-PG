"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Building2,
  Sparkles,
  LayoutDashboard,
  TrendingUp,
  Settings,
  Home,
} from "lucide-react";

const navItems = [
  { href: "/leads", icon: Users, label: "Leads" },
  { href: "/properties", icon: Building2, label: "Properties" },
  { href: "/matching", icon: Sparkles, label: "Matching" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "var(--sidebar-w)",
        background: "#080b12",
        borderRight: "1px solid #161b22",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 30,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "20px 20px 16px",
          borderBottom: "1px solid #161b22",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Home size={16} color="#fff" />
          </div>
          <div>
            <div
              className="font-display"
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#e6edf3",
                lineHeight: 1.2,
              }}
            >
              GharPayy
            </div>
            <div style={{ fontSize: 10, color: "#484f58", letterSpacing: "0.05em" }}>
              PG MANAGEMENT
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "12px 10px", flex: 1 }}>
        <div style={{ fontSize: 10, color: "#484f58", padding: "6px 10px 8px", letterSpacing: "0.08em", fontWeight: 600 }}>
          MAIN MENU
        </div>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 8,
                marginBottom: 2,
                color: active ? "#f97316" : "#6e7681",
                background: active ? "rgba(249,115,22,0.1)" : "transparent",
                border: active ? "1px solid rgba(249,115,22,0.2)" : "1px solid transparent",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                transition: "all 0.15s",
              }}
            >
              <Icon size={15} />
              {label}
              {active && (
                <div
                  style={{
                    marginLeft: "auto",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#f97316",
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid #161b22" }}>
        <div
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            background: "rgba(249,115,22,0.08)",
            border: "1px solid rgba(249,115,22,0.15)",
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, color: "#f97316", marginBottom: 2 }}>
            ✦ Smart Matching
          </div>
          <div style={{ fontSize: 11, color: "#6e7681", lineHeight: 1.4 }}>
            AI-powered lead–property scoring system
          </div>
        </div>
      </div>
    </aside>
  );
}
