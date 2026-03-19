"use client";

import { Lead } from "@/types";
import {
  Phone,
  MapPin,
  IndianRupee,
  Bed,
  User,
  Sparkles,
  CheckCircle2,
  Calendar,
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

const ROOM_LABEL: Record<string, string> = {
  single: "Single",
  double: "Double",
  triple: "Triple",
  dormitory: "Dorm",
};

const GENDER_LABEL: Record<string, string> = {
  male: "Male",
  female: "Female",
  unisex: "Any",
};

const GENDER_COLOR: Record<string, string> = {
  male: "#388bfd",
  female: "#f472b6",
  unisex: "#a371f7",
};

interface Props {
  lead: Lead;
  onFindMatch: (lead: Lead) => void;
  isMatching: boolean;
  isAssigned: boolean;
  assignedPropertyName?: string;
}

export default function LeadCard({
  lead,
  onFindMatch,
  isMatching,
  isAssigned,
  assignedPropertyName,
}: Props) {
  const status = STATUS_CONFIG[lead.status] || { label: lead.status, cls: "status-new" };

  // Deterministic color from name
  const hue = (lead.name.charCodeAt(0) * 37 + lead.name.charCodeAt(1) * 13) % 360;

  return (
    <div
      className="card card-hover"
      style={{
        padding: "18px 20px",
        transition: "all 0.2s",
        borderColor: isAssigned ? "rgba(63,185,80,0.3)" : undefined,
        background: isAssigned ? "rgba(63,185,80,0.03)" : undefined,
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Avatar */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: `hsl(${hue}, 40%, 20%)`,
              border: `2px solid hsl(${hue}, 60%, 35%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: 700,
              color: `hsl(${hue}, 80%, 72%)`,
              flexShrink: 0,
            }}
          >
            {lead.name.charAt(0)}
          </div>
          <div>
            <div
              className="font-display"
              style={{ fontSize: 15, fontWeight: 600, color: "#e6edf3" }}
            >
              {lead.name}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                color: "#6e7681",
                fontSize: 12,
                marginTop: 2,
              }}
            >
              <Phone size={11} />
              {lead.phone}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <span className={`badge ${status.cls}`}>{status.label}</span>
        </div>
      </div>

      {/* Details grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px 0",
          marginBottom: 14,
          padding: "10px 12px",
          background: "#0d1117",
          borderRadius: 8,
          border: "1px solid #161b22",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <MapPin size={11} color="#f97316" />
          <span style={{ fontSize: 12, color: "#8b949e" }}>{lead.preferredLocation}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <IndianRupee size={11} color="#3fb950" />
          <span style={{ fontSize: 12, color: "#8b949e" }}>
            ₹{lead.budgetMin.toLocaleString()}–{lead.budgetMax.toLocaleString()}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Bed size={11} color="#388bfd" />
          <span style={{ fontSize: 12, color: "#8b949e" }}>{ROOM_LABEL[lead.roomType]}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <User size={11} color={GENDER_COLOR[lead.genderPreference] ?? "#a371f7"} />
          <span style={{ fontSize: 12, color: "#8b949e" }}>{GENDER_LABEL[lead.genderPreference]}</span>
        </div>
        {lead.moveInDate && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, gridColumn: "span 2" }}>
            <Calendar size={11} color="#d29922" />
            <span style={{ fontSize: 12, color: "#8b949e" }}>
              Move-in:{" "}
              {new Date(lead.moveInDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        )}
      </div>

      {/* Assigned banner */}
      {isAssigned && assignedPropertyName && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 11px",
            borderRadius: 7,
            background: "rgba(63,185,80,0.1)",
            border: "1px solid rgba(63,185,80,0.25)",
            marginBottom: 12,
          }}
        >
          <CheckCircle2 size={13} color="#3fb950" />
          <span style={{ fontSize: 12, color: "#3fb950", fontWeight: 500 }}>
            Assigned: {assignedPropertyName}
          </span>
        </div>
      )}

      {/* Notes */}
      {lead.notes && (
        <div
          style={{
            fontSize: 11,
            color: "#6e7681",
            marginBottom: 12,
            padding: "7px 10px",
            background: "#161b22",
            borderRadius: 6,
            borderLeft: "2px solid #30363d",
            lineHeight: 1.5,
          }}
        >
          {lead.notes}
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontSize: 10,
              color: "#484f58",
              background: "#161b22",
              padding: "2px 7px",
              borderRadius: 4,
              border: "1px solid #21262d",
            }}
          >
            {lead.source}
          </span>
          <span style={{ fontSize: 11, color: "#484f58" }}>
            {new Date(lead.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => onFindMatch(lead)}
          disabled={isMatching}
          style={{
            fontSize: 12,
            padding: "7px 14px",
            opacity: isMatching ? 0.7 : 1,
            background: isAssigned
              ? "rgba(63,185,80,0.15)"
              : "linear-gradient(135deg, #f97316, #ea580c)",
            color: isAssigned ? "#3fb950" : "#fff",
            border: isAssigned ? "1px solid rgba(63,185,80,0.3)" : "none",
          }}
        >
          {isMatching ? (
            <>
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              Matching…
            </>
          ) : (
            <>
              <Sparkles size={12} />
              {isAssigned ? "Re-match" : "Find Match"}
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
