"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { GALLERY_IMAGES, HERO_IMAGES } from '@/lib/images';
import { motion } from 'framer-motion';
import {
  Shield, Star, MapPin, Users, Zap, Heart,
  CheckCircle, Building2, Sparkles, Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const VALUES = [
  {
    icon: Shield,
    title: 'Verified Properties',
    description: 'Every PG on our platform is physically verified by our team before listing.',
  },
  {
    icon: Zap,
    title: 'Smart Matching',
    description: 'Our algorithm scores properties against your budget, location, and preferences.',
  },
  {
    icon: Heart,
    title: 'Resident First',
    description: 'We prioritize tenant safety, transparency, and a comfortable stay experience.',
  },
  {
    icon: Star,
    title: 'Honest Reviews',
    description: 'Ratings and reviews come only from verified residents — no fake listings.',
  },
];

const STATS = [
  { value: '300+', label: 'Verified PGs', icon: Building2 },
  { value: '5,000+', label: 'Happy Residents', icon: Users },
  { value: '12', label: 'Areas Covered', icon: MapPin },
  { value: '4.6★', label: 'Avg. Rating', icon: Star },
];

const TEAM = [
  {
    name: 'Tanvir Khan',
    role: 'Founder & CEO',
    bio: 'Former PG resident turned founder. Built Gharpayy to solve the PG search problem he faced.',
    avatar: 'T',
  },
  {
    name: 'Priya Nair',
    role: 'Head of Operations',
    bio: 'Oversees property verification and owner partnerships across Bangalore.',
    avatar: 'P',
  },
  {
    name: 'Rohan Mehta',
    role: 'Lead Engineer',
    bio: 'Built the matching engine that connects tenants with the right PG in seconds.',
    avatar: 'R',
  },
];

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-6">
              <Sparkles size={12} />
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Making PG Search{' '}
              <span className="text-accent">Simple & Trustworthy</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Gharpayy was born from personal frustration with the PG search process in Bangalore —
              fake listings, unverified properties, and zero transparency. We built the platform
              we wished existed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2">
                  <Icon size={20} className="text-accent" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Moving to a new city is stressful enough. Finding a safe, comfortable, and
                affordable PG shouldn't add to that stress. We believe everyone deserves
                access to verified, quality accommodation that fits their budget and lifestyle.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our smart matching algorithm considers location, budget, room preferences, and
                lifestyle factors to connect you with PGs that genuinely fit — not just
                whatever's available.
              </p>
              <ul className="space-y-3">
                {[
                  'Physical verification of every property',
                  'Transparent pricing with no hidden fees',
                  'Resident reviews you can actually trust',
                  'Dedicated support throughout your stay',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle size={16} className="text-success mt-0.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {GALLERY_IMAGES.slice(0, 4).map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative rounded-xl overflow-hidden aspect-square"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-xs text-white font-medium">
                    {img.caption}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/20 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-4">What We Stand For</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Four principles that guide every decision we make at Gharpayy.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-background rounded-xl p-6 border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-4">The Team</h2>
            <p className="text-muted-foreground">
              Built by people who've lived the PG experience.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {TEAM.map(({ name, role, bio, avatar }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4"
                  style={{
                    background: `hsl(${(name.charCodeAt(0) * 37) % 360}, 40%, 20%)`,
                    color: `hsl(${(name.charCodeAt(0) * 37) % 360}, 80%, 70%)`,
                    border: `2px solid hsl(${(name.charCodeAt(0) * 37) % 360}, 60%, 35%)`,
                  }}
                >
                  {avatar}
                </div>
                <div className="font-semibold text-foreground mb-0.5">{name}</div>
                <div className="text-xs text-accent font-medium mb-3">{role}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent/5 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to find your perfect PG?
          </h2>
          <p className="text-muted-foreground mb-8">
            Browse 300+ verified PGs across Bangalore — filtered exactly to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => router.push('/explore')}>
              Browse PGs
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push('/auth')}>
              <Phone size={16} className="mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
