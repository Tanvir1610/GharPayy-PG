'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/ToastContainer';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Welcome back!', variant: 'success' });
      // redirect based on role (user state updated by signIn)
      const dest =
        user?.role === 'admin' ? '/admin' : user?.role === 'owner' ? '/owner' : '/dashboard';
      router.push(dest);
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative"
      style={{ background: 'linear-gradient(140deg, #0a0806 0%, #1a1208 45%, #2a1d0a 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,129,58,0.12) 0%, transparent 65%)' }}
      />

      <div className="w-full max-w-[440px] relative z-10">
        <div className="bg-white rounded-2xl p-10 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="font-display text-3xl font-bold text-dark no-underline">
              Ghar<span className="text-brand">Payy</span>
            </Link>
            <h1 className="font-display text-2xl font-bold text-dark mt-4 mb-1">Welcome back</h1>
            <p className="text-sm text-[#7a7167]">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={15} />}
              required
            />

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="text-sm font-semibold text-dark">Password</label>
                <Link href="/forgot-password" className="text-xs text-brand hover:text-brand-light">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock size={15} />}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a7167]"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button type="submit" loading={loading} className="w-full mt-2" size="lg">
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <p className="text-center text-sm text-[#7a7167] mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-brand font-semibold hover:text-brand-light">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
