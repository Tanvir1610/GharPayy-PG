"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { GALLERY_IMAGES } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Shield, Star, MapPin, Users, Zap, Heart, CheckCircle,
  Building2, Sparkles,
} from "lucide-react";

const VALUES = [
  { icon: Shield, title: "Verified Properties", description: "Every PG on our platform is physically verified by our team before listing." },
  { icon: Zap, title: "Smart Matching", description: "Our algorithm scores properties against budget, location, and preferences." },
  { icon: Heart, title: "Resident First", description: "Tenant safety and transparency are non-negotiable at every step." },
  { icon: Star, title: "Honest Reviews", description: "Ratings come only from verified residents — no fake listings." },
];

const STATS = [
  { value: "300+", label: "Verified PGs", icon: Building2 },
  { value: "5,000+", label: "Happy Residents", icon: Users },
  { value: "12", label: "Areas Covered", icon: MapPin },
  { value: "4.6★", label: "Avg. Rating", icon: Star },
];

export default function AboutPage() {
  const router = useRouter();
  return (
    <div style={{ minHeight: "100vh", background: "#080b12" }}>
      <Header />

      {/* Hero */}
      <section style={{ padding: "80px 24px", textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", color: "#f97316", fontSize: 11, fontWeight: 600, marginBottom: 20 }}>
          <Sparkles size={11} /> Our Story
        </span>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 40, fontWeight: 800, color: "#e6edf3", marginBottom: 20, lineHeight: 1.2 }}>
          Making PG Search <span style={{ color: "#f97316" }}>Simple & Trustworthy</span>
        </h1>
        <p style={{ fontSize: 16, color: "#6e7681", lineHeight: 1.7, marginBottom: 32 }}>
          Gharpayy was born from the frustration of PG searching in Bangalore — fake listings, unverified properties, zero transparency. We built the platform we wished existed.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button onClick={() => router.push("/leads")}>View Dashboard</Button>
          <Button variant="outline" onClick={() => router.push("/properties")}>Browse PGs</Button>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: "1px solid #161b22", borderBottom: "1px solid #161b22", padding: "40px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <Icon size={20} color="#f97316" style={{ margin: "0 auto 8px" }} />
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: "#e6edf3" }}>{value}</div>
              <div style={{ fontSize: 12, color: "#6e7681" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: "#e6edf3", textAlign: "center", marginBottom: 48 }}>What We Stand For</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} style={{ padding: "24px", borderRadius: 12, background: "#0d1117", border: "1px solid #21262d" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(249,115,22,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <Icon size={18} color="#f97316" />
                </div>
                <div style={{ fontWeight: 600, color: "#e6edf3", marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: 13, color: "#6e7681", lineHeight: 1.6 }}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: "#e6edf3", textAlign: "center", marginBottom: 32 }}>Our Properties</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
            {GALLERY_IMAGES.slice(0, 4).map((img, i) => (
              <div key={i} style={{ position: "relative", borderRadius: 12, overflow: "hidden", aspectRatio: "4/3" }}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
                <span style={{ position: "absolute", bottom: 10, left: 12, fontSize: 12, color: "#fff", fontWeight: 500 }}>{img.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 24px", borderTop: "1px solid #161b22", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: "#e6edf3", marginBottom: 12 }}>Ready to find the perfect PG?</h2>
        <p style={{ fontSize: 14, color: "#6e7681", marginBottom: 28 }}>Smart matching across 300+ verified PGs in Bangalore.</p>
        <Button size="lg" onClick={() => router.push("/leads")}>Open Dashboard</Button>
      </section>

      <Footer />
    </div>
  );
}
