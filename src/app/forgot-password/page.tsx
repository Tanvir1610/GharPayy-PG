'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { toast } from '@/components/ui/ToastContainer';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!json.success) {
        toast({ title: 'Error', description: json.error, variant: 'destructive' });
      } else {
        setSent(true);
        toast({ title: 'Reset link sent!', description: 'Check your inbox.', variant: 'success' });
      }
    } catch {
      toast({ title: 'Network error', description: 'Please try again.', variant: 'destructive' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative"
      style={{ background: 'linear-gradient(140deg, #0a0806 0%, #1a1208 45%, #2a1d0a 100%)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,129,58,0.12) 0%, transparent 65%)' }} />

      <div className="w-full max-w-[420px] relative z-10">
        <div className="bg-white rounded-2xl p-10 shadow-2xl">
          <div className="text-center mb-8">
            <Link href="/" className="font-display text-3xl font-bold text-dark no-underline">
              Ghar<span className="text-brand">Payy</span>
            </Link>
            <h1 className="font-display text-2xl font-bold text-dark mt-4 mb-1">Reset password</h1>
            <p className="text-sm text-[#7a7167]">
              {sent ? "We've sent a reset link to your email." : "Enter your email and we'll send you a reset link."}
            </p>
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input id="email" type="email" label="Email" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)}
                icon={<Mail size={15} />} required />
              <Button type="submit" loading={loading} className="w-full mt-2" size="lg">
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-green-600" />
              </div>
              <p className="text-sm text-[#7a7167]">Check your email for the password reset link.</p>
            </div>
          )}

          <p className="text-center text-sm text-[#7a7167] mt-6">
            <Link href="/login" className="text-brand font-semibold hover:text-brand-light">← Back to sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
