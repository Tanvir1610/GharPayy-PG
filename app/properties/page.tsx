"use client";

import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import { Property } from "@/types";
import {
  Search,
  MapPin,
  Star,
  BedDouble,
  Users,
  Wifi,
  Wind,
  Utensils,
  Dumbbell,
  Building2,
  Filter,
} from "lucide-react";

const GENDER_COLORS: Record<string, { color: string; bg: string }> = {
  male: { color: "#388bfd", bg: "rgba(56,139,253,0.12)" },
  female: { color: "#f472b6", bg: "rgba(244,114,182,0.12)" },
  unisex: { color: "#a371f7", bg: "rgba(163,113,247,0.12)" },
};

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  WiFi: <Wifi size={11} />,
  "High-Speed WiFi": <Wifi size={11} />,
  "500Mbps WiFi": <Wifi size={11} />,
  "1Gbps WiFi": <Wifi size={11} />,
  AC: <Wind size={11} />,
  Meals: <Utensils size={11} />,
  Gym: <Dumbbell size={11} />,
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"price" | "rating" | "beds">("rating");

  useEffect(() => {
    fetch("/api/properties")
      .then((r) => r.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = properties
    .filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.area.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());
      const matchGender =
        genderFilter === "all" || p.genderAllowed === genderFilter;
      return matchSearch && matchGender;
    })
    .sort((a, b) => {
      if (sortBy === "price") return a.pricePerMonth - b.pricePerMonth;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "beds") return b.availableBeds - a.availableBeds;
      return 0;
    });

  return (
    <AppShell>
      <div className="grid-bg" style={{ minHeight: "100vh", paddingBottom: 40 }}>
        {/* Header */}
        <div style={{ padding: "32px 32px 0", marginBottom: 28 }}>
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#f97316",
                letterSpacing: "0.08em",
                marginBottom: 4,
              }}
            >
              PROPERTY LISTINGS
            </div>
            <h1
              className="font-display"
              style={{ fontSize: 28, fontWeight: 800, color: "#e6edf3" }}
            >
              PG Properties
            </h1>
            <p style={{ fontSize: 13, color: "#6e7681", marginTop: 4 }}>
              {properties.length} active properties across Bangalore
            </p>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 280 }}>
              <Search
                size={14}
                color="#6e7681"
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                placeholder="Search by name or area..."
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

            {["all", "male", "female", "unisex"].map((g) => (
              <button
                key={g}
                onClick={() => setGenderFilter(g)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "1px solid",
                  borderColor: genderFilter === g ? "rgba(249,115,22,0.4)" : "#21262d",
                  background: genderFilter === g ? "rgba(249,115,22,0.1)" : "#161b22",
                  color: genderFilter === g ? "#f97316" : "#6e7681",
                  fontSize: 12,
                  fontWeight: genderFilter === g ? 600 : 400,
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "all 0.15s",
                }}
              >
                {g === "all" ? "All" : g}
              </button>
            ))}

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: "7px 12px",
                background: "#161b22",
                border: "1px solid #21262d",
                borderRadius: 8,
                color: "#8b949e",
                fontSize: 12,
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="rating">Sort: Rating</option>
              <option value="price">Sort: Price</option>
              <option value="beds">Sort: Available Beds</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div style={{ padding: "0 32px" }}>
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="shimmer" style={{ height: 360, borderRadius: 12 }} />
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {filtered.map((property, i) => {
                const gc = GENDER_COLORS[property.genderAllowed] || GENDER_COLORS.unisex;
                return (
                  <div
                    key={property.id}
                    className="card card-hover"
                    style={{ overflow: "hidden", animation: `fadeIn 0.3s ease-out ${i * 0.05}s both` }}
                  >
                    {/* Image */}
                    <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                      <img
                        src={property.images[0]}
                        alt={property.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80";
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to top, rgba(13,17,23,0.85) 0%, transparent 50%)",
                        }}
                      />
                      {/* Gender badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          background: gc.bg,
                          border: `1px solid ${gc.color}40`,
                          borderRadius: 20,
                          padding: "3px 10px",
                          fontSize: 11,
                          fontWeight: 600,
                          color: gc.color,
                          backdropFilter: "blur(8px)",
                          textTransform: "capitalize",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Users size={10} />
                        {property.genderAllowed}
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
                          fontSize: 12,
                          color: property.availableBeds > 0 ? "#3fb950" : "#f85149",
                          fontWeight: 600,
                        }}
                      >
                        <BedDouble size={13} />
                        {property.availableBeds > 0
                          ? `${property.availableBeds} beds available`
                          : "Full"}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: "14px 16px" }}>
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
                          style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}
                        >
                          <Star size={11} fill="#d29922" color="#d29922" />
                          <span style={{ fontSize: 12, color: "#d29922", fontWeight: 600 }}>
                            {property.rating}
                          </span>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 12,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <MapPin size={11} color="#f97316" />
                          <span style={{ fontSize: 12, color: "#6e7681" }}>{property.area}</span>
                        </div>
                        <div>
                          <span style={{ fontSize: 17, fontWeight: 700, color: "#3fb950", fontFamily: "'Syne', sans-serif" }}>
                            ₹{property.pricePerMonth.toLocaleString()}
                          </span>
                          <span style={{ fontSize: 11, color: "#6e7681" }}>/mo</span>
                        </div>
                      </div>

                      <p
                        style={{
                          fontSize: 12,
                          color: "#6e7681",
                          marginBottom: 12,
                          lineHeight: 1.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {property.description}
                      </p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {property.amenities.slice(0, 4).map((a) => (
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
                        {property.amenities.length > 4 && (
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
                            +{property.amenities.length - 4}
                          </span>
                        )}
                      </div>

                      <div
                        style={{
                          marginTop: 14,
                          paddingTop: 12,
                          borderTop: "1px solid #21262d",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ fontSize: 11, color: "#484f58" }}>
                          Owner: {property.ownerName}
                        </span>
                        <span style={{ fontSize: 11, color: "#484f58" }}>
                          {property.totalBeds} total beds
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

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
