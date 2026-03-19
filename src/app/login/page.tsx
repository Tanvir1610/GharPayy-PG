'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Home, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/ToastContainer';

export default function LoginPage() {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, user, loading: authLoading } = useAuth();
  const router = useRouter();

  // If already logged in, bounce to leads
  useEffect(() => {
    if (!authLoading && user) {
      router.replace('/leads');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast({ title: 'Sign in failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Welcome back! 👋', variant: 'success' });
      router.push('/leads');
      router.refresh();
    }
    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(140deg, #0a0806 0%, #1a1208 45%, #2a1d0a 100%)' }}>
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative"
      style={{ background: 'linear-gradient(140deg, #0a0806 0%, #1a1208 45%, #2a1d0a 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,129,58,0.12) 0%, transparent 65%)' }} />

      <div className="w-full max-w-[420px] relative z-10">
        <div className="bg-white rounded-2xl p-10 shadow-2xl">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 no-underline">
              <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center" style={{ background: '#f97316' }}>
                <MapPin size={17} className="text-white" color="white" />
              </div>
              <span className="font-display text-2xl font-bold" style={{ color: '#1a1208' }}>
                Ghar<span style={{ color: '#f97316' }}>Payy</span>
              </span>
            </Link>
            <h1 className="font-display text-2xl font-bold mt-5 mb-1" style={{ color: '#1a1208' }}>Welcome back</h1>
            <p className="text-sm" style={{ color: '#7a7167' }}>Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="email" type="email" label="Email"
              placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)}
              icon={Mail} required
            />

            <div className="relative">
              <Input
                id="password" type={showPw ? 'text' : 'password'} label="Password"
                placeholder="Your password"
                value={password} onChange={e => setPassword(e.target.value)}
                icon={Lock} className="pr-10" required
              />
              <button type="button" onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-[34px]" style={{ color: '#7a7167' }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 22 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#8b949e', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={14} color="#484f58" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type={showPw ? 'text' : 'password'} required value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Your password"
                  style={{ width: '100%', padding: '10px 40px 10px 38px', background: '#161b22', border: '1px solid #30363d', borderRadius: 10, color: '#e6edf3', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(249,115,22,0.6)')}
                  onBlur={e => (e.target.style.borderColor = '#30363d')}
                />
                <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#484f58', padding: 0 }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              style={{ width: '100%', padding: '12px', background: loading ? '#ea580c99' : 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.15s' }}
            >
              {loading ? (
                <>
                  <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  Signing in…
                </>
              ) : (
                <> Sign In <ArrowRight size={16} /> </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1" style={{ background: '#e8e2d8' }} />
            <span className="text-xs" style={{ color: '#7a7167' }}>or</span>
            <div className="h-px flex-1" style={{ background: '#e8e2d8' }} />
          </div>

          {/* WhatsApp */}
          <a
            href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full text-white font-semibold py-3 rounded-xl text-sm transition-colors no-underline"
            style={{ background: '#22c55e' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Continue via WhatsApp
          </a>

          <p className="text-center text-sm mt-5" style={{ color: '#7a7167' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold" style={{ color: '#f97316' }}>Sign up</Link>
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
