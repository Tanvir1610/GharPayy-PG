'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, MapPin } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/ToastContainer';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
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

            <Button type="submit" loading={loading} className="w-full !mt-6" size="lg">
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1" style={{ background: '#e8e2d8' }} />
            <span className="text-xs" style={{ color: '#7a7167' }}>or</span>
            <div className="h-px flex-1" style={{ background: '#e8e2d8' }} />
          </div>

          <a
            href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20need%20help%20finding%20a%20PG"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full text-white font-semibold py-3 rounded-xl text-sm transition-colors no-underline"
            style={{ background: '#22c55e' }}
          >
            Continue via WhatsApp
          </a>

          <p className="text-center text-sm mt-5" style={{ color: '#7a7167' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold" style={{ color: '#f97316' }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
