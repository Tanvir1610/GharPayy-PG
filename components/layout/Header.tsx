"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Home, Search } from "lucide-react";

const NAV = [
  { href: "/leads", label: "Leads" },
  { href: "/properties", label: "Properties" },
  { href: "/matching", label: "Matching" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        background: "#080b12",
        borderBottom: "1px solid #161b22",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/leads"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
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
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              color: "#e6edf3",
            }}
          >
            GharPayy
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 4 }}>
          {NAV.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  color: active ? "#f97316" : "#6e7681",
                  background: active ? "rgba(249,115,22,0.1)" : "transparent",
                  border: `1px solid ${active ? "rgba(249,115,22,0.2)" : "transparent"}`,
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
