"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { X, Sparkles, Users, Building2, Zap } from "lucide-react";

export default function WelcomeBanner() {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!user) return;
    const key = `gharpayy_welcomed_${user.id}`;
    if (!sessionStorage.getItem(key)) {
      setVisible(true);
      sessionStorage.setItem(key, "1");
    }
  }, [user]);

  if (!visible || !user) return null;

  const firstName = user.fullName?.split(" ")[0] || user.email?.split("@")[0] || "there";

  return (
    <div
      style={{
        margin: "0 32px 20px",
        padding: "16px 20px",
        borderRadius: 12,
        background: "linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(163,113,247,0.08) 100%)",
        border: "1px solid rgba(249,115,22,0.25)",
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        animation: "slideDown 0.4s cubic-bezier(0.16,1,0.3,1)",
        position: "relative",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: "rgba(249,115,22,0.15)",
          border: "1px solid rgba(249,115,22,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Sparkles size={18} color="#f97316" />
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div
          className="font-display"
          style={{ fontSize: 15, fontWeight: 700, color: "#e6edf3", marginBottom: 4 }}
        >
          Welcome back, {firstName}! 👋
        </div>
        <div style={{ fontSize: 12, color: "#8b949e", lineHeight: 1.6 }}>
          Your GharPayy dashboard is ready. Click{" "}
          <span style={{ color: "#f97316", fontWeight: 600 }}>Find Match</span> on any lead
          to instantly score and rank PG properties by location, budget, room type, and gender preference.
        </div>

        {/* Quick stats row */}
        <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
          {[
            { icon: <Users size={11} />, label: "View Leads", color: "#388bfd" },
            { icon: <Building2 size={11} />, label: "Browse Properties", color: "#3fb950" },
            { icon: <Zap size={11} />, label: "Smart Matching", color: "#f97316" },
          ].map(({ icon, label, color }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                color,
                fontWeight: 500,
              }}
            >
              {icon}
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setVisible(false)}
        style={{
          width: 24,
          height: 24,
          borderRadius: 6,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#484f58",
          flexShrink: 0,
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#e6edf3")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#484f58")}
      >
        <X size={14} />
      </button>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
