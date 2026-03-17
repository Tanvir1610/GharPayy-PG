import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GharPayy — PG Lead Matching",
  description: "Smart PG lead matching and assignment dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
