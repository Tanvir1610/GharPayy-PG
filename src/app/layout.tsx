import type { Metadata } from 'next';
import './globals.css';
import ToastContainer from '@/components/ui/ToastContainer';
import { AuthProvider } from '@/hooks/useAuth';

export const metadata: Metadata = {
  title: 'GharPayy — Best PGs in Bangalore | 120+ Verified PGs',
  description: 'Find the best verified PGs in Bangalore — Koramangala, Bellandur, Marathahalli, Whitefield, HSR Layout & 10+ more areas. Fully furnished, meals included, no brokerage. Starting ₹8K/mo.',
  keywords: 'PG in Bangalore, paying guest Koramangala, PG near Christ University, girls hostel Bangalore, boys PG Bellandur, co-ed PG Whitefield',
  openGraph: {
    title: 'GharPayy — Best PGs in Bangalore',
    description: '120+ verified PGs across 12+ areas in Bangalore. Fully furnished · Meals included · No brokerage.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          {children}
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
