'use client';

import { useState } from 'react';
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
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPw) {
      toast({ title: "Passwords don't match", variant: 'destructive' }); return;
    }
    if (password.length < 6) {
      toast({ title: 'Password too short', description: 'Minimum 6 characters required.', variant: 'destructive' }); return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, fullName, role);
    if (error) {
      toast({ title: 'Signup failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Account created!', description: 'Welcome to GharPayy.', variant: 'success' });
      router.push(role === 'owner' ? '/owner' : '/dashboard');
      router.refresh();
    }
    setLoading(false);
  };

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
            <Link href="/" className="font-display text-3xl font-bold text-dark no-underline">
              Ghar<span className="text-brand">Payy</span>
            </Link>
            <h1 className="font-display text-2xl font-bold text-dark mt-4 mb-1">Create your account</h1>
            <p className="text-sm text-[#7a7167]">Find your perfect PG today</p>
          </div>

          {/* Role picker */}
          <div className="flex gap-2 mb-5 p-1 bg-[#f8f5f1] rounded-lg">
            {(['tenant', 'owner'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all capitalize ${
                  role === r ? 'bg-white shadow text-brand' : 'text-[#7a7167] hover:text-dark'
                }`}
              >
                {r === 'tenant' ? 'Looking for PG' : 'List my PG'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input id="fullName" label="Full Name" placeholder="Your full name" value={fullName}
              onChange={(e) => setFullName(e.target.value)} icon={<User size={15} />} required />
            <Input id="email" type="email" label="Email" placeholder="you@example.com" value={email}
              onChange={(e) => setEmail(e.target.value)} icon={<Mail size={15} />} required />

            <div className="relative">
              <Input id="password" type={showPw ? 'text' : 'password'} label="Password"
                placeholder="Min. 6 characters" value={password}
                onChange={(e) => setPassword(e.target.value)} icon={<Lock size={15} />}
                className="pr-10" required />
              <button type="button" onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-[34px] text-[#7a7167]">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <Input id="confirm" type="password" label="Confirm Password"
              placeholder="Re-enter password" value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)} icon={<Lock size={15} />} required />

            <Button type="submit" loading={loading} className="w-full !mt-6" size="lg">
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-xs text-[#7a7167] mt-4">
            By signing up you agree to our{' '}
            <Link href="/terms" className="text-brand">Terms</Link> and{' '}
            <Link href="/privacy" className="text-brand">Privacy Policy</Link>
          </p>
          <p className="text-center text-sm text-[#7a7167] mt-3">
            Already have an account?{' '}
            <Link href="/login" className="text-brand font-semibold hover:text-brand-light">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
