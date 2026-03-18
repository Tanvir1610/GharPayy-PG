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
} from "lucide-react";

const STATUS_CONFIG: Record<
  string,
  { label: string; cls: string }
> = {
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
  const status = STATUS_CONFIG[lead.status] || {
    label: lead.status,
    cls: "status-new",
  };

  return (
    <div
      className="card card-hover"
      style={{ padding: "18px 20px", transition: "all 0.2s" }}
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
              background: `hsl(${(lead.name.charCodeAt(0) * 37) % 360}, 40%, 25%)`,
              border: `2px solid hsl(${(lead.name.charCodeAt(0) * 37) % 360}, 60%, 40%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: 700,
              color: `hsl(${(lead.name.charCodeAt(0) * 37) % 360}, 80%, 75%)`,
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

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className={`badge ${status.cls}`}>{status.label}</span>
          <span
            style={{
              fontSize: 11,
              color: "#484f58",
              background: "#161b22",
              padding: "2px 8px",
              borderRadius: 4,
            }}
          >
            {lead.source}
          </span>
        </div>
      </div>

      {/* Details row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <MapPin size={12} color="#f97316" />
          <span style={{ fontSize: 12, color: "#8b949e" }}>
            {lead.preferredLocation}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <IndianRupee size={12} color="#3fb950" />
          <span style={{ fontSize: 12, color: "#8b949e" }}>
            ₹{lead.budgetMin.toLocaleString()}–{lead.budgetMax.toLocaleString()}
            /mo
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Bed size={12} color="#388bfd" />
          <span style={{ fontSize: 12, color: "#8b949e" }}>
            {ROOM_LABEL[lead.roomType]}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <User size={12} color="#a371f7" />
          <span style={{ fontSize: 12, color: "#8b949e" }}>
            {GENDER_LABEL[lead.genderPreference]}
          </span>
        </div>
      </div>

      {/* Assigned banner */}
      {isAssigned && assignedPropertyName && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            borderRadius: 8,
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
            fontSize: 12,
            color: "#6e7681",
            marginBottom: 14,
            padding: "8px 10px",
            background: "#161b22",
            borderRadius: 6,
            borderLeft: "3px solid #30363d",
          }}
        >
          {lead.notes}
        </div>
      )}

      {/* Action */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 11, color: "#484f58" }}>
          {new Date(lead.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}
        </span>
        <button
          className="btn btn-primary"
          onClick={() => onFindMatch(lead)}
          disabled={isMatching}
          style={{
            fontSize: 12,
            padding: "7px 14px",
            opacity: isMatching ? 0.7 : 1,
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
              Find Match
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
