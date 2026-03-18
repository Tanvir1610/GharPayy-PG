import Link from "next/link";
import { Home, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#080b12",
        borderTop: "1px solid #161b22",
        padding: "32px 24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Home size={12} color="#fff" />
        </div>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: "#e6edf3",
          }}
        >
          GharPayy
        </span>
      </div>
      <p style={{ fontSize: 12, color: "#484f58", marginBottom: 8 }}>
        PG Lead Matching & Assignment Dashboard
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
        {[
          { href: "/leads", label: "Leads" },
          { href: "/properties", label: "Properties" },
          { href: "/matching", label: "Matching" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{ fontSize: 12, color: "#6e7681", textDecoration: "none" }}
          >
            {label}
          </Link>
        ))}
      </div>
      <p style={{ fontSize: 11, color: "#30363d", marginTop: 16 }}>
        © {new Date().getFullYear()} GharPayy. All rights reserved.
      </p>
    </footer>
  );
}
