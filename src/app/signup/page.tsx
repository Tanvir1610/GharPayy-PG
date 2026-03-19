'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/ToastContainer';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [role, setRole] = useState<'tenant' | 'owner'>('tenant');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp, user, loading: authLoading } = useAuth();
  const router = useRouter();

  // If already logged in, redirect
  useEffect(() => {
    if (!authLoading && user) {
      router.replace('/leads');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPw) {
      toast({ title: "Passwords don't match", variant: 'destructive' });
      return;
    }
    if (password.length < 6) {
      toast({ title: 'Password too short', description: 'Minimum 6 characters required.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, fullName, role);
    if (error) {
      toast({ title: 'Signup failed', description: error.message, variant: 'destructive' });
    } else {
      toast({
        title: '🎉 Account created!',
        description: 'Welcome to GharPayy — your dashboard is ready.',
        variant: 'success',
      });
      router.push('/leads');
      router.refresh();
    }
    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(140deg, #0a0806 0%, #1a1208 45%, #2a1d0a 100%)' }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#f97316', borderTopColor: 'transparent' }} />
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

      <div className="w-full max-w-[460px] relative z-10">
        <div className="bg-white rounded-2xl p-10 shadow-2xl">
          <div className="text-center mb-8">
            <Link href="/" className="font-display text-3xl font-bold no-underline" style={{ color: '#1a1208' }}>
              Ghar<span style={{ color: '#f97316' }}>Payy</span>
            </Link>
            <h1 className="font-display text-2xl font-bold mt-4 mb-1" style={{ color: '#1a1208' }}>Create your account</h1>
            <p className="text-sm" style={{ color: '#7a7167' }}>Find your perfect PG today</p>
          </div>

          {/* Role picker */}
          <div className="flex gap-2 mb-5 p-1 rounded-lg" style={{ background: '#f8f5f1' }}>
            {(['tenant', 'owner'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className="flex-1 py-2 rounded-md text-sm font-semibold transition-all capitalize"
                style={{
                  background: role === r ? '#fff' : 'transparent',
                  color: role === r ? '#f97316' : '#7a7167',
                  boxShadow: role === r ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {r === 'tenant' ? 'Looking for PG' : 'List my PG'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input id="fullName" label="Full Name" placeholder="Your full name" value={fullName}
              onChange={(e) => setFullName(e.target.value)} icon={User} required />
            <Input id="email" type="email" label="Email" placeholder="you@example.com" value={email}
              onChange={(e) => setEmail(e.target.value)} icon={Mail} required />

            <div className="relative">
              <Input id="password" type={showPw ? 'text' : 'password'} label="Password"
                placeholder="Min. 6 characters" value={password}
                onChange={(e) => setPassword(e.target.value)} icon={Lock}
                className="pr-10" required />
              <button type="button" onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-[34px]" style={{ color: '#7a7167' }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <Input id="confirm" type="password" label="Confirm Password"
              placeholder="Re-enter password" value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)} icon={Lock} required />

            <Button type="submit" loading={loading} className="w-full !mt-6" size="lg">
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-xs mt-4" style={{ color: '#7a7167' }}>
            By signing up you agree to our{' '}
            <Link href="/terms" style={{ color: '#f97316' }}>Terms</Link> and{' '}
            <Link href="/privacy" style={{ color: '#f97316' }}>Privacy Policy</Link>
          </p>
          <p className="text-center text-sm mt-3" style={{ color: '#7a7167' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold" style={{ color: '#f97316' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
