import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import KoramangalaClient from '@/components/koramangala/KoramangalaClient';

export const metadata: Metadata = {
  title: 'PG In Koramangala, Bangalore | Coliving PG Near Christ Campus | GharPayy',
  description:
    'Find premium PG accommodation in Koramangala, Bangalore. Boys, Girls & Co-ed PGs near Christ University, Forum Mall & top tech companies. Starting ₹12K/mo.',
};

// Static shell — all data is fetched client-side via /api/koramangala
// No DB calls at build time, so Vercel builds succeed cleanly.
export default function KoramangalaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <KoramangalaClient />
      <Footer />
    </div>
  );
}
