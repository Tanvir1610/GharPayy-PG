"use client";

import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main
        style={{
          marginLeft: "var(--sidebar-w)",
          flex: 1,
          minHeight: "100vh",
          background: "var(--background)",
          overflowX: "hidden",
        }}
      >
        {children}
      </main>
    </div>
  );
}
