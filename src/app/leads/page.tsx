"use client";

import { useState, useEffect, useCallback } from "react";
import AppShell from "@/components/AppShell";
import LeadCard from "@/components/LeadCard";
import MatchDrawer from "@/components/MatchDrawer";
import WelcomeBanner from "@/components/WelcomeBanner";
import { Lead, MatchResult, Property } from "@/types";
import {
  Search,
  SlidersHorizontal,
  Users,
  TrendingUp,
  CheckCircle2,
  Clock,
} from "lucide-react";

const STATUS_FILTERS = [
  { value: "all", label: "All Leads" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "requirement_collected", label: "Req. Collected" },
  { value: "property_suggested", label: "Suggested" },
  { value: "visit_scheduled", label: "Visit Sched." },
  { value: "booked", label: "Booked" },
  { value: "lost", label: "Lost" },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Drawer state
  const [drawerLead, setDrawerLead] = useState<Lead | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [matchLoading, setMatchLoading] = useState(false);
  const [matchError, setMatchError] = useState<string | null>(null);

  // Assignments: leadId -> propertyId
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  // Track property names for display
  const [propertyNames, setPropertyNames] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => r.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleFindMatch = useCallback(async (lead: Lead) => {
    setDrawerLead(lead);
    setMatches([]);
    setMatchError(null);
    setMatchLoading(true);

    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: lead.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Match failed");
      setMatches(data.matches);
    } catch (err: any) {
      setMatchError(err.message);
    } finally {
      setMatchLoading(false);
    }
  }, []);

  const handleAssign = useCallback(
    (leadId: string, propertyId: string) => {
      setAssignments((prev) => ({ ...prev, [leadId]: propertyId }));
      // Store property name for display
      const prop = matches.find((m) => m.property.id === propertyId)?.property;
      if (prop) {
        setPropertyNames((prev) => ({ ...prev, [propertyId]: prop.name }));
      }
    },
    [matches]
  );

  const handleUnassign = useCallback((leadId: string) => {
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[leadId];
      return next;
    });
  }, []);

  // Filtered leads
  const filtered = leads.filter((lead) => {
    const matchesSearch =
      !search ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.preferredLocation.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search);
    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const bookedLeads = leads.filter((l) => l.status === "booked").length;
  const assignedCount = Object.keys(assignments).length;

  return (
    <AppShell>
      <div
        className="grid-bg"
        style={{ minHeight: "100vh", paddingBottom: 40 }}
      >
        {/* Welcome Banner — shown once per session after login */}
        <div style={{ paddingTop: 32 }}>
          <WelcomeBanner />
        </div>

        {/* Header */}
        <div
          style={{
            padding: "0 32px 0",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#f97316",
                  letterSpacing: "0.08em",
                  marginBottom: 4,
                }}
              >
                LEAD MANAGEMENT
              </div>
              <h1
                className="font-display"
                style={{ fontSize: 28, fontWeight: 800, color: "#e6edf3" }}
              >
                All Leads
              </h1>
              <p style={{ fontSize: 13, color: "#6e7681", marginTop: 4 }}>
                Click "Find Match" on any lead to instantly score matching PG
                properties.
              </p>
            </div>
          </div>

          {/* Stat cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
              marginBottom: 24,
            }}
          >
            {[
              {
                icon: <Users size={16} color="#388bfd" />,
                value: totalLeads,
                label: "Total Leads",
                accent: "#388bfd",
                bg: "rgba(56,139,253,0.08)",
                border: "rgba(56,139,253,0.15)",
              },
              {
                icon: <Clock size={16} color="#f97316" />,
                value: newLeads,
                label: "New This Week",
                accent: "#f97316",
                bg: "rgba(249,115,22,0.08)",
                border: "rgba(249,115,22,0.15)",
              },
              {
                icon: <CheckCircle2 size={16} color="#3fb950" />,
                value: bookedLeads,
                label: "Booked",
                accent: "#3fb950",
                bg: "rgba(63,185,80,0.08)",
                border: "rgba(63,185,80,0.15)",
              },
              {
                icon: <TrendingUp size={16} color="#a371f7" />,
                value: assignedCount,
                label: "Assigned",
                accent: "#a371f7",
                bg: "rgba(163,113,247,0.08)",
                border: "rgba(163,113,247,0.15)",
              },
            ].map(({ icon, value, label, accent, bg, border }) => (
              <div
                key={label}
                className="card"
                style={{
                  padding: "16px 18px",
                  background: bg,
                  borderColor: border,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  {icon}
                  <span
                    style={{ fontSize: 11, color: "#6e7681", fontWeight: 500 }}
                  >
                    {label}
                  </span>
                </div>
                <div
                  className="font-display"
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: accent,
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Search + Filters */}
          <div
            style={{ display: "flex", gap: 10, alignItems: "center" }}
          >
            <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
              <Search
                size={14}
                color="#6e7681"
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px 8px 34px",
                  background: "#161b22",
                  border: "1px solid #21262d",
                  borderRadius: 8,
                  color: "#e6edf3",
                  fontSize: 13,
                  outline: "none",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {STATUS_FILTERS.slice(0, 5).map((f) => (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 6,
                    border: "1px solid",
                    borderColor:
                      statusFilter === f.value
                        ? "rgba(249,115,22,0.4)"
                        : "#21262d",
                    background:
                      statusFilter === f.value
                        ? "rgba(249,115,22,0.1)"
                        : "#161b22",
                    color: statusFilter === f.value ? "#f97316" : "#6e7681",
                    fontSize: 12,
                    fontWeight: statusFilter === f.value ? 600 : 400,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Leads Grid */}
        <div style={{ padding: "0 32px" }}>
          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                gap: 16,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="shimmer"
                  style={{ height: 200, borderRadius: 12 }}
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 24px",
                color: "#484f58",
              }}
            >
              <Users size={48} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
              <div style={{ fontSize: 16, marginBottom: 8 }}>No leads found</div>
              <div style={{ fontSize: 13 }}>Try adjusting your filters</div>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                gap: 16,
              }}
            >
              {filtered.map((lead, i) => (
                <div
                  key={lead.id}
                  style={{
                    animation: `fadeIn 0.3s ease-out ${i * 0.04}s both`,
                  }}
                >
                  <LeadCard
                    lead={lead}
                    onFindMatch={handleFindMatch}
                    isMatching={
                      matchLoading && drawerLead?.id === lead.id
                    }
                    isAssigned={!!assignments[lead.id]}
                    assignedPropertyName={
                      assignments[lead.id]
                        ? propertyNames[assignments[lead.id]]
                        : undefined
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Match Drawer */}
      {drawerLead && (
        <MatchDrawer
          lead={drawerLead}
          matches={matches}
          isLoading={matchLoading}
          error={matchError}
          assignments={assignments}
          onAssign={handleAssign}
          onUnassign={handleUnassign}
          onClose={() => {
            setDrawerLead(null);
            setMatches([]);
            setMatchError(null);
          }}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input:focus { border-color: rgba(249,115,22,0.5) !important; }
      `}</style>
    </AppShell>
  );
}
