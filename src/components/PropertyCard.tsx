"use client";

import { MatchResult } from "@/types";
import {
  MapPin,
  IndianRupee,
  Star,
  Wifi,
  Wind,
  Utensils,
  Dumbbell,
  CheckCircle2,
  BedDouble,
  Users,
  Shield,
} from "lucide-react";

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  WiFi: <Wifi size={11} />,
  "High-Speed WiFi": <Wifi size={11} />,
  "500Mbps WiFi": <Wifi size={11} />,
  "1Gbps WiFi": <Wifi size={11} />,
  AC: <Wind size={11} />,
  Meals: <Utensils size={11} />,
  Gym: <Dumbbell size={11} />,
  Security: <Shield size={11} />,
};

const SCORE_STYLE: Record<
  string,
  { color: string; bg: string; border: string; label: string }
> = {
  Excellent: {
    color: "#3fb950",
    bg: "rgba(63,185,80,0.12)",
    border: "rgba(63,185,80,0.3)",
    label: "Excellent",
  },
  Good: {
    color: "#d29922",
    bg: "rgba(210,153,34,0.12)",
    border: "rgba(210,153,34,0.3)",
    label: "Good",
  },
  Fair: {
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
    border: "rgba(249,115,22,0.3)",
    label: "Fair",
  },
  Low: {
    color: "#6e7681",
    bg: "rgba(110,118,129,0.12)",
    border: "rgba(110,118,129,0.3)",
    label: "Low",
  },
};

interface Props {
  match: MatchResult;
  isAssigned: boolean;
  onAssign: () => void;
  onUnassign: () => void;
}

export default function PropertyCard({
  match,
  isAssigned,
  onAssign,
  onUnassign,
}: Props) {
  const { property, score, breakdown, matchLabel } = match;
  const style = SCORE_STYLE[matchLabel];
  const scorePercent = Math.round((score / 100) * 100);

  return (
    <div
      className="card"
      style={{
        overflow: "hidden",
        border: isAssigned
          ? "1px solid rgba(63,185,80,0.4)"
          : "1px solid #21262d",
        transition: "border-color 0.2s",
      }}
    >
      {/* Image + Score Badge */}
      <div style={{ position: "relative", height: 140, overflow: "hidden" }}>
        <img
          src={property.images[0]}
          alt={property.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80";
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(13,17,23,0.9) 0%, transparent 60%)",
          }}
        />

        {/* Score badge */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: style.bg,
            border: `1px solid ${style.border}`,
            borderRadius: 8,
            padding: "4px 10px",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: style.color,
              lineHeight: 1,
              fontFamily: "'Syne', sans-serif",
            }}
          >
            {score}
          </div>
          <div style={{ fontSize: 9, color: style.color, textAlign: "center", opacity: 0.8 }}>
            / 100
          </div>
        </div>

        {/* Match label */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: style.bg,
            border: `1px solid ${style.border}`,
            borderRadius: 20,
            padding: "3px 10px",
            fontSize: 11,
            fontWeight: 600,
            color: style.color,
            backdropFilter: "blur(8px)",
          }}
        >
          {matchLabel}
        </div>

        {/* Available beds */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 12,
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 11,
            color: "#e6edf3",
          }}
        >
          <BedDouble size={12} />
          <span>{property.availableBeds} beds free</span>
        </div>

        {/* Gender */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 12,
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 11,
            color: "#e6edf3",
          }}
        >
          <Users size={11} />
          <span style={{ textTransform: "capitalize" }}>{property.genderAllowed}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "14px 16px" }}>
        {/* Name + rating */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 8,
            marginBottom: 6,
          }}
        >
          <div
            className="font-display"
            style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", lineHeight: 1.3 }}
          >
            {property.name}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              flexShrink: 0,
            }}
          >
            <Star size={11} fill="#d29922" color="#d29922" />
            <span style={{ fontSize: 12, color: "#d29922", fontWeight: 600 }}>
              {property.rating}
            </span>
            <span style={{ fontSize: 11, color: "#484f58" }}>
              ({property.reviewCount})
            </span>
          </div>
        </div>

        {/* Location + price */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: 4, color: "#6e7681" }}
          >
            <MapPin size={11} />
            <span style={{ fontSize: 12 }}>{property.area}</span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <span style={{ fontSize: 16, fontWeight: 700, color: "#3fb950", fontFamily: "'Syne', sans-serif" }}>
              ₹{property.pricePerMonth.toLocaleString()}
            </span>
            <span style={{ fontSize: 11, color: "#6e7681" }}>/mo</span>
          </div>
        </div>

        {/* Score breakdown bars */}
        <div
          style={{
            background: "#161b22",
            borderRadius: 8,
            padding: "10px 12px",
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 10, color: "#6e7681", marginBottom: 8, fontWeight: 600, letterSpacing: "0.06em" }}>
            MATCH BREAKDOWN
          </div>
          {[
            { label: "Location", value: breakdown.location, max: 40, color: "#f97316" },
            { label: "Budget", value: breakdown.budget, max: 30, color: "#3fb950" },
            { label: "Room Type", value: breakdown.roomType, max: 20, color: "#388bfd" },
            { label: "Gender", value: breakdown.gender, max: 10, color: "#a371f7" },
          ].map(({ label, value, max, color }) => (
            <div key={label} style={{ marginBottom: 6 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  color: "#8b949e",
                  marginBottom: 3,
                }}
              >
                <span>{label}</span>
                <span style={{ color }}>
                  {value}/{max}
                </span>
              </div>
              <div className="score-bar-track">
                <div
                  className="score-bar-fill"
                  style={{
                    width: `${(value / max) * 100}%`,
                    background: color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}
        >
          {property.amenities.slice(0, 5).map((a) => (
            <span
              key={a}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 3,
                padding: "2px 7px",
                borderRadius: 4,
                fontSize: 11,
                background: "#161b22",
                color: "#8b949e",
                border: "1px solid #21262d",
              }}
            >
              {AMENITY_ICONS[a]}
              {a}
            </span>
          ))}
          {property.amenities.length > 5 && (
            <span
              style={{
                padding: "2px 7px",
                borderRadius: 4,
                fontSize: 11,
                background: "#161b22",
                color: "#484f58",
                border: "1px solid #21262d",
              }}
            >
              +{property.amenities.length - 5} more
            </span>
          )}
        </div>

        {/* Action */}
        {isAssigned ? (
          <div style={{ display: "flex", gap: 8 }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "8px 12px",
                borderRadius: 8,
                background: "rgba(63,185,80,0.12)",
                border: "1px solid rgba(63,185,80,0.3)",
                fontSize: 12,
                fontWeight: 600,
                color: "#3fb950",
              }}
            >
              <CheckCircle2 size={13} />
              Assigned
            </div>
            <button
              className="btn btn-ghost"
              onClick={onUnassign}
              style={{ fontSize: 12, padding: "8px 12px" }}
            >
              Unassign
            </button>
          </div>
        ) : (
          <button
            className="btn"
            onClick={onAssign}
            style={{
              width: "100%",
              justifyContent: "center",
              background: "#161b22",
              border: "1px solid #30363d",
              color: "#e6edf3",
              fontSize: 12,
              padding: "8px",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(249,115,22,0.1)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(249,115,22,0.3)";
              (e.currentTarget as HTMLButtonElement).style.color = "#f97316";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#161b22";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#30363d";
              (e.currentTarget as HTMLButtonElement).style.color = "#e6edf3";
            }}
          >
            Assign Property
          </button>
        )}
      </div>
    </div>
  );
}
