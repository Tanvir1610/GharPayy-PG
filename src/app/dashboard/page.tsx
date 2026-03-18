'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/AppShell';
import {
  Users, Building2, Sparkles, TrendingUp, CheckCircle2,
  Clock, Search, MapPin, Phone, ArrowRight, Zap, Star,
  Calendar, Activity, BarChart3,
} from 'lucide-react';

interface DashStats {
  totalLeads: number;
  newLeads: number;
  bookedLeads: number;
  totalProperties: number;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashStats>({ totalLeads: 0, newLeads: 0, bookedLeads: 0, totalProperties: 0 });
  const [statsLoaded, setStatsLoaded] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      fetch('/api/leads').then(r => r.json()).catch(() => []),
      fetch('/api/properties').then(r => r.json()).catch(() => []),
    ]).then(([leads, properties]) => {
      setStats({
        totalLeads: leads.length,
        newLeads: leads.filter((l: any) => l.status === 'new').length,
        bookedLeads: leads.filter((l: any) => l.status === 'booked').length,
        totalProperties: properties.length,
      });
      setStatsLoaded(true);
    });
  }, [user]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080b12' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '2px solid #f97316', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
          <p style={{ color: '#6e7681', fontSize: 13 }}>Loading…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) return null;

  const firstName = user.fullName?.split(' ')[0] || user.email.split('@')[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const statCards = [
    { icon: <Users size={18} color="#388bfd" />, value: stats.totalLeads, label: 'Total Leads', accent: '#388bfd', bg: 'rgba(56,139,253,0.08)', border: 'rgba(56,139,253,0.15)', href: '/leads' },
    { icon: <Clock size={18} color="#f97316" />, value: stats.newLeads, label: 'New Leads', accent: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.15)', href: '/leads?status=new' },
    { icon: <CheckCircle2 size={18} color="#3fb950" />, value: stats.bookedLeads, label: 'Booked', accent: '#3fb950', bg: 'rgba(63,185,80,0.08)', border: 'rgba(63,185,80,0.15)', href: '/leads?status=booked' },
    { icon: <Building2 size={18} color="#a371f7" />, value: stats.totalProperties, label: 'Properties', accent: '#a371f7', bg: 'rgba(163,113,247,0.08)', border: 'rgba(163,113,247,0.15)', href: '/properties' },
  ];

  const quickActions = [
    { icon: Users, label: 'View All Leads', desc: 'Manage your lead pipeline', href: '/leads', color: '#388bfd', bg: 'rgba(56,139,253,0.1)', border: 'rgba(56,139,253,0.2)' },
    { icon: Sparkles, label: 'Match Leads', desc: 'Find best-fit properties', href: '/leads', color: '#f97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.2)' },
    { icon: Building2, label: 'Browse Properties', desc: 'View all PG listings', href: '/properties', color: '#a371f7', bg: 'rgba(163,113,247,0.1)', border: 'rgba(163,113,247,0.2)' },
    { icon: BarChart3, label: 'Analytics', desc: 'Track performance metrics', href: '/matching', color: '#3fb950', bg: 'rgba(63,185,80,0.1)', border: 'rgba(63,185,80,0.2)' },
  ];

  return (
    <AppShell>
      <div className="grid-bg" style={{ minHeight: '100vh', paddingBottom: 40 }}>
        {/* Hero welcome */}
        <div style={{ padding: '32px 32px 0', marginBottom: 28 }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, rgba(249,115,22,0.05) 100%)',
              border: '1px solid #21262d',
              borderRadius: 16,
              padding: '28px 32px',
              marginBottom: 24,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow */}
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#f97316', letterSpacing: '0.08em', marginBottom: 6 }}>
                {greeting.toUpperCase()}, {firstName.toUpperCase()} 👋
              </div>
              <h1 className="font-display" style={{ fontSize: 26, fontWeight: 800, color: '#e6edf3', marginBottom: 8 }}>
                Welcome to your Dashboard
              </h1>
              <p style={{ color: '#6e7681', fontSize: 13, lineHeight: 1.6, maxWidth: 500 }}>
                Manage your PG leads, match them with properties, and track bookings — all in one place.
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                <Link href="/leads" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#f97316', color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                  <Zap size={14} /> View Leads
                </Link>
                <Link href="/properties" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(255,255,255,0.05)', color: '#e6edf3', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 500, border: '1px solid #30363d' }}>
                  <Building2 size={14} /> Browse PGs <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
            {statCards.map(({ icon, value, label, accent, bg, border, href }) => (
              <Link key={label} href={href} style={{ textDecoration: 'none' }}>
                <div className="card card-hover" style={{ padding: '18px 20px', background: bg, borderColor: border, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    {icon}
                    <span style={{ fontSize: 11, color: '#6e7681', fontWeight: 500 }}>{label}</span>
                  </div>
                  <div className="font-display" style={{ fontSize: 32, fontWeight: 800, color: accent, lineHeight: 1 }}>
                    {statsLoaded ? value : <span style={{ fontSize: 14, color: '#484f58' }}>—</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick actions + activity */}
        <div style={{ padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* Quick actions */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#f97316', letterSpacing: '0.08em', marginBottom: 4 }}>QUICK ACTIONS</div>
              <h2 className="font-display" style={{ fontSize: 17, fontWeight: 700, color: '#e6edf3' }}>Get things done</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {quickActions.map(({ icon: Icon, label, desc, href, color, bg, border }) => (
                <Link key={label} href={href} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', borderRadius: 10, border: `1px solid ${border}`, background: bg, textDecoration: 'none', transition: 'all 0.15s' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `${bg}`, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color={color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#e6edf3' }}>{label}</div>
                    <div style={{ fontSize: 11, color: '#6e7681', marginTop: 1 }}>{desc}</div>
                  </div>
                  <ArrowRight size={14} color="#484f58" />
                </Link>
              ))}
            </div>
          </div>

          {/* Profile + info panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Profile card */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#f97316', letterSpacing: '0.08em', marginBottom: 4 }}>YOUR PROFILE</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #f97316, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                  {user.fullName?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#e6edf3' }}>{user.fullName || user.email.split('@')[0]}</div>
                  <div style={{ fontSize: 12, color: '#6e7681' }}>{user.email}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4, padding: '2px 8px', borderRadius: 20, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', fontSize: 10, color: '#f97316', fontWeight: 600, textTransform: 'capitalize' }}>
                    <Star size={9} /> {user.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow guide */}
            <div className="card" style={{ padding: 24, flex: 1 }}>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#f97316', letterSpacing: '0.08em', marginBottom: 4 }}>HOW IT WORKS</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#e6edf3' }}>Lead → Property workflow</h3>
              </div>
              {[
                { step: '1', text: 'Browse leads in the Leads panel', color: '#388bfd' },
                { step: '2', text: 'Click "Find Match" on any lead', color: '#f97316' },
                { step: '3', text: 'Review scored property matches', color: '#a371f7' },
                { step: '4', text: 'Assign property to close the lead', color: '#3fb950' },
              ].map(({ step, text, color }) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: `${color}20`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color, flexShrink: 0 }}>
                    {step}
                  </div>
                  <span style={{ fontSize: 12, color: '#8b949e' }}>{text}</span>
                </div>
              ))}
              <Link href="/leads" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 4, fontSize: 12, color: '#f97316', fontWeight: 600, textDecoration: 'none' }}>
                Start matching <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        a:hover > div { border-color: rgba(249,115,22,0.3) !important; }
      `}</style>
    </AppShell>
  );
}
