"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BarChart3, TrendingUp, Users, Building2, IndianRupee, Sparkles } from "lucide-react";

const METRICS = [
  { label: "Total Leads", value: "124", change: "+12%", icon: Users, color: "#388bfd" },
  { label: "Active Properties", value: "48", change: "+3", icon: Building2, color: "#f97316" },
  { label: "Match Rate", value: "78%", change: "+5%", icon: Sparkles, color: "#3fb950" },
  { label: "Avg. Budget", value: "₹11.2k", change: "—", icon: IndianRupee, color: "#a371f7" },
];

const FUNNEL = [
  { stage: "New Leads", count: 124, pct: 100, color: "#388bfd" },
  { stage: "Contacted", count: 98, pct: 79, color: "#f97316" },
  { stage: "Req. Collected", count: 72, pct: 58, color: "#a371f7" },
  { stage: "Property Suggested", count: 51, pct: 41, color: "#d29922" },
  { stage: "Visit Scheduled", count: 34, pct: 27, color: "#22c5c2" },
  { stage: "Booked", count: 18, pct: 15, color: "#3fb950" },
];

export default function AdminAnalyticsPage() {
  return (
    <DashboardLayout title="Analytics" subtitle="Lead pipeline and property matching overview">
      {/* Metric cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
        {METRICS.map(({ label, value, change, icon: Icon, color }) => (
          <div key={label} style={{ padding: "18px 20px", borderRadius: 12, background: "#0d1117", border: "1px solid #21262d" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Icon size={15} color={color} />
              <span style={{ fontSize: 11, color: "#6e7681", fontWeight: 500 }}>{label}</span>
            </div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 11, color: "#484f58", marginTop: 4 }}>{change} this month</div>
          </div>
        ))}
      </div>

      {/* Pipeline funnel */}
      <div style={{ padding: "24px", borderRadius: 12, background: "#0d1117", border: "1px solid #21262d", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <BarChart3 size={16} color="#f97316" />
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#e6edf3", fontSize: 15 }}>Lead Pipeline Funnel</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FUNNEL.map(({ stage, count, pct, color }) => (
            <div key={stage}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#8b949e", marginBottom: 4 }}>
                <span>{stage}</span>
                <span style={{ color, fontWeight: 600 }}>{count} ({pct}%)</span>
              </div>
              <div style={{ height: 8, background: "#161b22", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 0.8s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top locations */}
      <div style={{ padding: "24px", borderRadius: 12, background: "#0d1117", border: "1px solid #21262d" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <TrendingUp size={16} color="#3fb950" />
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#e6edf3", fontSize: 15 }}>Top Demanded Areas</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {[
            { area: "Koramangala", leads: 34, color: "#f97316" },
            { area: "Indiranagar", leads: 28, color: "#388bfd" },
            { area: "HSR Layout", leads: 21, color: "#3fb950" },
            { area: "Whitefield", leads: 19, color: "#a371f7" },
            { area: "Marathahalli", leads: 14, color: "#d29922" },
            { area: "BTM Layout", leads: 8, color: "#22c5c2" },
          ].map(({ area, leads, color }) => (
            <div key={area} style={{ padding: "12px 14px", borderRadius: 8, background: "#161b22", border: "1px solid #21262d", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "#8b949e" }}>{area}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color }}>{leads}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
