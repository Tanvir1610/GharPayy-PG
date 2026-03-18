'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, Home, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/ToastContainer';

export default function SignupPage() {
  const [fullName, setFullName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [role, setRole]           = useState<'tenant' | 'owner'>('tenant');
  const [showPw, setShowPw]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const { signUp, user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) router.push('/dashboard');
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPw) {
      toast({ title: "Passwords don't match", variant: 'destructive' }); return;
    }
    if (password.length < 6) {
      toast({ title: 'Password too short', description: 'Minimum 6 characters.', variant: 'destructive' }); return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, fullName, role);
    if (error) {
      toast({ title: 'Signup failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Account created! 🎉', description: 'Welcome to GharPayy.', variant: 'success' });
      router.push('/dashboard');
      router.refresh();
    }
    setLoading(false);
  };

  if (authLoading) return null;

  const fieldStyle = {
    width: '100%', padding: '10px 12px 10px 38px',
    background: '#161b22', border: '1px solid #30363d', borderRadius: 10,
    color: '#e6edf3', fontSize: 13, outline: 'none', boxSizing: 'border-box' as const,
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080b12', position: 'relative', padding: '24px 16px' }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 10 }}>
        <div style={{ background: '#0d1117', border: '1px solid #21262d', borderRadius: 20, padding: '40px 36px', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #f97316, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Home size={18} color="#fff" />
              </div>
              <span className="font-display" style={{ fontSize: 20, fontWeight: 800, color: '#e6edf3' }}>
                Ghar<span style={{ color: '#f97316' }}>Payy</span>
              </span>
            </Link>
            <h2 className="font-display" style={{ fontSize: 22, fontWeight: 800, color: '#e6edf3', marginBottom: 4 }}>Create your account</h2>
            <p style={{ fontSize: 13, color: '#6e7681' }}>Join GharPayy to manage PG leads</p>
          </div>

          {/* Role toggle */}
          <div style={{ display: 'flex', gap: 4, padding: 4, background: '#161b22', borderRadius: 10, marginBottom: 20, border: '1px solid #21262d' }}>
            {(['tenant', 'owner'] as const).map(r => (
              <button key={r} type="button" onClick={() => setRole(r)}
                style={{ flex: 1, padding: '8px 0', borderRadius: 7, border: role === r ? '1px solid rgba(249,115,22,0.3)' : '1px solid transparent', background: role === r ? 'rgba(249,115,22,0.12)' : 'transparent', color: role === r ? '#f97316' : '#6e7681', fontSize: 13, fontWeight: role === r ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s' }}>
                {r === 'tenant' ? '🏠 Looking for PG' : '🏢 List my PG'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full name */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#8b949e', marginBottom: 6 }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={14} color="#484f58" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your full name" style={fieldStyle}
                  onFocus={e => (e.target.style.borderColor = 'rgba(249,115,22,0.6)')}
                  onBlur={e => (e.target.style.borderColor = '#30363d')} />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#8b949e', marginBottom: 6 }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={14} color="#484f58" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={fieldStyle}
                  onFocus={e => (e.target.style.borderColor = 'rgba(249,115,22,0.6)')}
                  onBlur={e => (e.target.style.borderColor = '#30363d')} />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#8b949e', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={14} color="#484f58" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type={showPw ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" style={{ ...fieldStyle, paddingRight: 40 }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(249,115,22,0.6)')}
                  onBlur={e => (e.target.style.borderColor = '#30363d')} />
                <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#484f58', padding: 0 }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#8b949e', marginBottom: 6 }}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={14} color="#484f58" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type="password" required value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Re-enter password" style={fieldStyle}
                  onFocus={e => (e.target.style.borderColor = confirmPw && password !== confirmPw ? 'rgba(248,81,73,0.6)' : 'rgba(249,115,22,0.6)')}
                  onBlur={e => (e.target.style.borderColor = '#30363d')} />
              </div>
              {confirmPw && password !== confirmPw && (
                <p style={{ fontSize: 11, color: '#f85149', marginTop: 4 }}>Passwords do not match</p>
              )}
            </div>

            <button type="submit" disabled={loading || (!!confirmPw && password !== confirmPw)}
              style={{ width: '100%', padding: '12px', background: loading ? '#ea580c99' : 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {loading ? (
                <><div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Creating account…</>
              ) : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#484f58', marginTop: 16 }}>
            By signing up you agree to our{' '}
            <Link href="#" style={{ color: '#f97316', textDecoration: 'none' }}>Terms</Link> &amp;{' '}
            <Link href="#" style={{ color: '#f97316', textDecoration: 'none' }}>Privacy Policy</Link>
          </p>
          <p style={{ textAlign: 'center', fontSize: 13, color: '#6e7681', marginTop: 12 }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#f97316', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
