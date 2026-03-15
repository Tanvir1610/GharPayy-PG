import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PropertyDetailClient from '@/components/property/PropertyDetailClient';

// Static shell — PropertyDetailClient fetches data via /api/properties/detail/[id]
// No DB calls at build time = clean Vercel builds
export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <PropertyDetailClient id={id} />
      <Footer />
    </div>
  );
}
