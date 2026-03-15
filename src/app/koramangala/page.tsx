import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import KoramangalaClient from '@/components/koramangala/KoramangalaClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PG in Koramangala, Bangalore | GharPayy',
  description: 'Find premium verified PGs in Koramangala near Christ University, Forum Mall & tech parks. Boys, girls & co-ed options. Meals, WiFi, AC included.',
};

export default function KoramangalaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <KoramangalaClient />
      </main>
      <Footer />
    </div>
  );
}
