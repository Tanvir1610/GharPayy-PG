"use client";

import { useState, useEffect, useCallback } from "react";
import AppShell from "@/components/AppShell";
import { Lead, MatchResult } from "@/types";
import PropertyCard from "@/components/PropertyCard";
import {
  Sparkles,
  MapPin,
  IndianRupee,
  Bed,
  User,
  ChevronRight,
  TrendingUp,
  Zap,
} from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  new: { label: "New", cls: "status-new" },
  contacted: { label: "Contacted", cls: "status-contacted" },
  requirement_collected: { label: "Req. Collected", cls: "status-req" },
  property_suggested: { label: "Suggested", cls: "status-suggested" },
  visit_scheduled: { label: "Visit Sched.", cls: "status-visit-sched" },
  visit_completed: { label: "Visit Done", cls: "status-visit-comp" },
  booked: { label: "Booked", cls: "status-booked" },
  lost: { label: "Lost", cls: "status-lost" },
};

export default function MatchingPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [matchLoading, setMatchLoading] = useState(false);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [propertyNames, setPropertyNames] = useState<Record<string, string>>({});
  const [runCount, setRunCount] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => r.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSelectLead = useCallback(async (lead: Lead) => {
    setSelectedLead(lead);
    if (runCount[lead.id]) return; // already fetched
    setMatches([]);
    setMatchLoading(true);
    setRunCount((prev) => ({ ...prev, [lead.id]: true }));
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: lead.id }),
      });
      const data = await res.json();
      setMatches(data.matches);
    } catch {
      setMatches([]);
    } finally {
      setMatchLoading(false);
    }
  }, [runCount]);

  const handleAssign = useCallback(
    (leadId: string, propertyId: string) => {
      setAssignments((prev) => ({ ...prev, [leadId]: propertyId }));
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

  return (
    <AppShell>
      <div
        className="grid-bg"
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "340px 1fr",
        }}
      >
        {/* Left panel — leads list */}
        <div
          style={{
            borderRight: "1px solid #21262d",
            background: "#080b12",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            position: "sticky",
            top: 0,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "28px 20px 16px",
              borderBottom: "1px solid #161b22",
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "#f97316",
                letterSpacing: "0.08em",
                marginBottom: 4,
              }}
            >
              SMART MATCHING
            </div>
            <div
              className="font-display"
              style={{ fontSize: 20, fontWeight: 700, color: "#e6edf3" }}
            >
              Select a Lead
            </div>
            <p style={{ fontSize: 12, color: "#6e7681", marginTop: 4 }}>
              Click to see matched properties
            </p>
          </div>

          {/* Leads list */}
          <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
            {loading ? (
              <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="shimmer" style={{ height: 72, borderRadius: 8 }} />
                ))}
              </div>
            ) : (
              leads.map((lead) => {
                const status = STATUS_CONFIG[lead.status];
                const isActive = selectedLead?.id === lead.id;
                return (
                  <button
                    key={lead.id}
                    onClick={() => handleSelectLead(lead)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: 8,
                      marginBottom: 4,
                      background: isActive ? "rgba(249,115,22,0.1)" : "transparent",
                      border: `1px solid ${isActive ? "rgba(249,115,22,0.3)" : "transparent"}`,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLButtonElement).style.background = "#161b22";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    }}
                  >
                    {/* Avatar */}
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: `hsl(${(lead.name.charCodeAt(0) * 37) % 360}, 40%, 20%)`,
                        border: `2px solid hsl(${(lead.name.charCodeAt(0) * 37) % 360}, 60%, 35%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 700,
                        color: `hsl(${(lead.name.charCodeAt(0) * 37) % 360}, 80%, 70%)`,
                        flexShrink: 0,
                      }}
                    >
                      {lead.name.charAt(0)}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: isActive ? "#f97316" : "#c9d1d9",
                          marginBottom: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{lead.name}</span>
                        {assignments[lead.id] && (
                          <span style={{ fontSize: 10, color: "#3fb950" }}>✓ Assigned</span>
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 11,
                          color: "#6e7681",
                        }}
                      >
                        <MapPin size={9} />
                        <span>{lead.preferredLocation}</span>
                        <span style={{ color: "#30363d" }}>•</span>
                        <span>₹{lead.budgetMin / 1000}k–{lead.budgetMax / 1000}k</span>
                      </div>
                    </div>

                    <ChevronRight size={14} color={isActive ? "#f97316" : "#484f58"} />
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right panel — matches */}
        <div
          style={{
            padding: "28px 28px",
            overflowY: "auto",
            maxHeight: "100vh",
          }}
        >
          {!selectedLead ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "calc(100vh - 100px)",
                gap: 16,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "rgba(249,115,22,0.1)",
                  border: "1px solid rgba(249,115,22,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <Sparkles size={32} color="#f97316" />
              </div>
              <div
                className="font-display"
                style={{ fontSize: 22, fontWeight: 700, color: "#e6edf3" }}
              >
                Lead Matching Engine
              </div>
              <p style={{ fontSize: 14, color: "#6e7681", maxWidth: 360, lineHeight: 1.6 }}>
                Select a lead from the left panel to instantly see ranked PG property matches with detailed score breakdowns.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 8,
                }}
              >
                {[
                  { icon: <MapPin size={13} color="#f97316" />, label: "Location +40", color: "#f97316" },
                  { icon: <IndianRupee size={13} color="#3fb950" />, label: "Budget +30", color: "#3fb950" },
                  { icon: <Bed size={13} color="#388bfd" />, label: "Room +20", color: "#388bfd" },
                  { icon: <User size={13} color="#a371f7" />, label: "Gender +10", color: "#a371f7" },
                ].map(({ icon, label, color }) => (
                  <div
                    key={label}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 8,
                      background: "#161b22",
                      border: "1px solid #21262d",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12,
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
          ) : (
            <>
              {/* Lead info banner */}
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: 12,
                  background: "rgba(249,115,22,0.08)",
                  border: "1px solid rgba(249,115,22,0.2)",
                  marginBottom: 24,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: `hsl(${(selectedLead.name.charCodeAt(0) * 37) % 360}, 40%, 20%)`,
                    border: `2px solid hsl(${(selectedLead.name.charCodeAt(0) * 37) % 360}, 60%, 35%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 700,
                    color: `hsl(${(selectedLead.name.charCodeAt(0) * 37) % 360}, 80%, 70%)`,
                    flexShrink: 0,
                  }}
                >
                  {selectedLead.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    className="font-display"
                    style={{ fontSize: 16, fontWeight: 700, color: "#e6edf3", marginBottom: 4 }}
                  >
                    {selectedLead.name}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {[
                      { icon: <MapPin size={11} />, text: selectedLead.preferredLocation, color: "#f97316" },
                      { icon: <IndianRupee size={11} />, text: `₹${selectedLead.budgetMin.toLocaleString()}–${selectedLead.budgetMax.toLocaleString()}`, color: "#3fb950" },
                      { icon: <Bed size={11} />, text: selectedLead.roomType, color: "#388bfd" },
                      { icon: <User size={11} />, text: selectedLead.genderPreference, color: "#a371f7" },
                    ].map(({ icon, text, color }) => (
                      <div
                        key={text}
                        style={{ display: "flex", alignItems: "center", gap: 4, color, fontSize: 12, textTransform: "capitalize" }}
                      >
                        {icon} {text}
                      </div>
                    ))}
                  </div>
                </div>
                {!matchLoading && matches.length > 0 && (
                  <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ textAlign: "center" }}>
                      <div className="font-display" style={{ fontSize: 22, fontWeight: 800, color: "#f97316" }}>
                        {matches.length}
                      </div>
                      <div style={{ fontSize: 10, color: "#6e7681" }}>Matches</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div className="font-display" style={{ fontSize: 22, fontWeight: 800, color: "#3fb950" }}>
                        {matches[0]?.score}
                      </div>
                      <div style={{ fontSize: 10, color: "#6e7681" }}>Top Score</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Loading */}
              {matchLoading && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Zap size={14} color="#f97316" />
                    <span style={{ fontSize: 13, color: "#6e7681" }}>Finding best matches…</span>
                  </div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="shimmer" style={{ height: 320, borderRadius: 12 }} />
                  ))}
                </div>
              )}

              {/* Results grid */}
              {!matchLoading && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 16,
                  }}
                >
                  {matches.map((match, i) => (
                    <div
                      key={match.property.id}
                      style={{ animation: `fadeIn 0.3s ease-out ${i * 0.07}s both` }}
                    >
                      <PropertyCard
                        match={match}
                        isAssigned={assignments[selectedLead.id] === match.property.id}
                        onAssign={() => handleAssign(selectedLead.id, match.property.id)}
                        onUnassign={() => handleUnassign(selectedLead.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </AppShell>
  );
}
