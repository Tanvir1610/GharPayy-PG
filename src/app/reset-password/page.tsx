'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from '@/components/ui/ToastContainer';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPw) {
      toast({ title: "Passwords don't match", variant: 'destructive' });
      return;
    }
    if (password.length < 6) {
      toast({ title: 'Password too short', description: 'Minimum 6 characters.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    const sb = createClient();
    const { error } = await sb.auth.updateUser({ password });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Password updated!', description: 'You can now sign in with your new password.', variant: 'success' });
      router.push('/login');
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

      <div className="w-full max-w-[420px] relative z-10">
        <div className="bg-white rounded-2xl p-10 shadow-2xl">
          <div className="text-center mb-8">
            <Link href="/" className="font-display text-3xl font-bold text-dark no-underline">
              Ghar<span className="text-brand">Payy</span>
            </Link>
            <h1 className="font-display text-2xl font-bold text-dark mt-4 mb-1">Set new password</h1>
            <p className="text-sm text-[#7a7167]">Choose a strong password for your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                id="password"
                type={showPw ? 'text' : 'password'}
                label="New Password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={15} />}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-[34px] text-[#7a7167]"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <Input
              id="confirm"
              type="password"
              label="Confirm Password"
              placeholder="Re-enter password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              icon={<Lock size={15} />}
              required
            />

            <Button type="submit" loading={loading} className="w-full !mt-6" size="lg">
              {loading ? 'Updating…' : 'Update Password'}
            </Button>
          </form>

          <p className="text-center text-sm text-[#7a7167] mt-6">
            <Link href="/login" className="text-brand font-semibold hover:text-brand-light">
              ← Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
