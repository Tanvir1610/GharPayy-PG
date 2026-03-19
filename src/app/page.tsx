"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Home } from "lucide-react";

export default function RootPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/leads");
      } else {
        router.replace("/login");
      }
    }
  }, [user, loading, router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080b12",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "linear-gradient(135deg, #f97316, #ea580c)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Home size={18} color="#fff" />
      </div>
    </div>
  );
}
