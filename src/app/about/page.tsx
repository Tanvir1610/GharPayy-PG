import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ShieldCheck, Home, Users, Star } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 px-4 text-center"
          style={{ background: 'linear-gradient(140deg, #0a0806 0%, #1a1208 45%, #2a1d0a 100%)' }}>
          <h1 className="font-display text-4xl font-bold text-white mb-4">About GharPayy</h1>
          <p className="text-white/70 max-w-xl mx-auto text-lg">
            We&apos;re on a mission to make finding your perfect PG simple, transparent and trustworthy.
          </p>
        </section>

        <section className="py-16 px-4 max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="font-display text-2xl font-bold text-dark mb-4">Our Story</h2>
              <p className="text-[#7a7167] leading-relaxed mb-3">
                GharPayy was founded with one simple belief — finding a PG shouldn&apos;t be stressful.
                We built a platform that connects tenants with verified property owners, making the
                entire process transparent and easy.
              </p>
              <p className="text-[#7a7167] leading-relaxed">
                Today we serve thousands of students and working professionals across major Indian cities,
                helping them find a place they can truly call home.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Home, label: '5,000+', desc: 'Listed Properties' },
                { icon: Users, label: '20,000+', desc: 'Happy Tenants' },
                { icon: ShieldCheck, label: '4,200+', desc: 'Verified PGs' },
                { icon: Star, label: '4.8 / 5', desc: 'Average Rating' },
              ].map((s) => (
                <div key={s.label} className="p-4 bg-[#f8f5f1] rounded-2xl text-center">
                  <s.icon size={22} className="text-brand mx-auto mb-2" />
                  <p className="font-bold text-dark text-xl">{s.label}</p>
                  <p className="text-xs text-[#7a7167] mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-dark mb-8">Our Values</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { title: 'Trust', desc: 'Every property is manually reviewed to ensure quality and safety.' },
                { title: 'Transparency', desc: 'No hidden charges. Everything you see is what you pay.' },
                { title: 'Community', desc: 'We build lasting connections between tenants and owners.' },
              ].map((v) => (
                <div key={v.title} className="p-6 border border-[#e8e2d8] rounded-2xl">
                  <h3 className="font-semibold text-dark text-lg mb-2">{v.title}</h3>
                  <p className="text-sm text-[#7a7167] leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
