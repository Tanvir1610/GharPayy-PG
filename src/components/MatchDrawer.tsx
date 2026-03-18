"use client";

import { useEffect, useRef } from "react";
import { Lead, MatchResult } from "@/types";
import PropertyCard from "./PropertyCard";
import {
  X,
  MapPin,
  IndianRupee,
  User,
  Bed,
  Sparkles,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

interface Props {
  lead: Lead | null;
  matches: MatchResult[];
  isLoading: boolean;
  error: string | null;
  assignments: Record<string, string>; // leadId -> propertyId
  onAssign: (leadId: string, propertyId: string) => void;
  onUnassign: (leadId: string) => void;
  onClose: () => void;
}

export default function MatchDrawer({
  lead,
  matches,
  isLoading,
  error,
  assignments,
  onAssign,
  onUnassign,
  onClose,
}: Props) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!lead) return null;

  const topScore = matches[0]?.score ?? 0;

  return (
    <>
      {/* Overlay */}
      <div
        className="drawer-overlay"
        onClick={onClose}
        style={{ animation: "fadeIn 0.2s ease-out" }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="drawer"
        style={{ animation: "slide-in-right 0.35s cubic-bezier(0.16,1,0.3,1)" }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px 16px",
            borderBottom: "1px solid #21262d",
            position: "sticky",
            top: 0,
            background: "#0d1117",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(249,115,22,0.15)",
                    border: "1px solid rgba(249,115,22,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Sparkles size={14} color="#f97316" />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#f97316",
                    letterSpacing: "0.06em",
                  }}
                >
                  MATCHED PROPERTIES
                </span>
              </div>
              <div
                className="font-display"
                style={{ fontSize: 18, fontWeight: 700, color: "#e6edf3" }}
              >
                {lead.name}
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "#161b22",
                border: "1px solid #30363d",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6e7681",
                flexShrink: 0,
              }}
            >
              <X size={15} />
            </button>
          </div>

          {/* Lead quick info */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 12,
              padding: "10px 12px",
              background: "#161b22",
              borderRadius: 8,
              border: "1px solid #21262d",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <MapPin size={11} color="#f97316" />
              <span style={{ fontSize: 12, color: "#8b949e" }}>
                {lead.preferredLocation}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <IndianRupee size={11} color="#3fb950" />
              <span style={{ fontSize: 12, color: "#8b949e" }}>
                ₹{lead.budgetMin.toLocaleString()}–
                {lead.budgetMax.toLocaleString()}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Bed size={11} color="#388bfd" />
              <span style={{ fontSize: 12, color: "#8b949e", textTransform: "capitalize" }}>
                {lead.roomType}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <User size={11} color="#a371f7" />
              <span style={{ fontSize: 12, color: "#8b949e", textTransform: "capitalize" }}>
                {lead.genderPreference}
              </span>
            </div>
          </div>

          {/* Stats row */}
          {!isLoading && !error && matches.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 12,
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  background: "rgba(249,115,22,0.08)",
                  border: "1px solid rgba(249,115,22,0.15)",
                  borderRadius: 8,
                  textAlign: "center",
                }}
              >
                <div
                  className="font-display"
                  style={{ fontSize: 20, fontWeight: 700, color: "#f97316" }}
                >
                  {matches.length}
                </div>
                <div style={{ fontSize: 10, color: "#6e7681" }}>
                  Properties Found
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  background: "rgba(63,185,80,0.08)",
                  border: "1px solid rgba(63,185,80,0.15)",
                  borderRadius: 8,
                  textAlign: "center",
                }}
              >
                <div
                  className="font-display"
                  style={{ fontSize: 20, fontWeight: 700, color: "#3fb950" }}
                >
                  {topScore}
                </div>
                <div style={{ fontSize: 10, color: "#6e7681" }}>Top Score</div>
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  background: "rgba(56,139,253,0.08)",
                  border: "1px solid rgba(56,139,253,0.15)",
                  borderRadius: 8,
                  textAlign: "center",
                }}
              >
                <div
                  className="font-display"
                  style={{ fontSize: 20, fontWeight: 700, color: "#388bfd" }}
                >
                  {matches.filter((m) => m.matchLabel === "Excellent").length}
                </div>
                <div style={{ fontSize: 10, color: "#6e7681" }}>Excellent</div>
              </div>
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: "16px 24px 24px", overflowY: "auto" }}>
          {/* Loading */}
          {isLoading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="shimmer"
                  style={{
                    height: 280,
                    borderRadius: 12,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: "60px 24px",
                textAlign: "center",
              }}
            >
              <AlertCircle size={40} color="#f85149" />
              <div style={{ fontSize: 14, color: "#f85149", fontWeight: 600 }}>
                Matching Failed
              </div>
              <div style={{ fontSize: 12, color: "#6e7681" }}>{error}</div>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !error && matches.length === 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: "60px 24px",
                textAlign: "center",
              }}
            >
              <TrendingUp size={40} color="#484f58" />
              <div
                style={{ fontSize: 14, color: "#6e7681", fontWeight: 600 }}
              >
                No matches found
              </div>
              <div style={{ fontSize: 12, color: "#484f58" }}>
                No available properties match this lead's preferences.
              </div>
            </div>
          )}

          {/* Matches */}
          {!isLoading && !error && matches.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {matches.map((match, i) => (
                <div
                  key={match.property.id}
                  style={{
                    animation: `fadeIn 0.3s ease-out ${i * 0.07}s both`,
                  }}
                >
                  <PropertyCard
                    match={match}
                    isAssigned={assignments[lead.id] === match.property.id}
                    onAssign={() => onAssign(lead.id, match.property.id)}
                    onUnassign={() => onUnassign(lead.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
