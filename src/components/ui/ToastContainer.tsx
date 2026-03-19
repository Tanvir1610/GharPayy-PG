'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
}

let addToast: (t: Omit<Toast, 'id'>) => void = () => {};

export function toast(t: Omit<Toast, 'id'>) { addToast(t); }

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const add = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(p => [...p, { ...t, id }]);
    setTimeout(() => setToasts(p => p.filter(x => x.id !== id)), 4000);
  }, []);

  useEffect(() => { addToast = add; }, [add]);

  const ICON = { default: Info, destructive: AlertCircle, success: CheckCircle };
  const STYLE: Record<string, { bg: string; border: string; color: string }> = {
    default:     { bg: '#1c2230', border: '#30363d', color: '#e6edf3' },
    destructive: { bg: 'rgba(248,81,73,0.12)', border: 'rgba(248,81,73,0.3)', color: '#f85149' },
    success:     { bg: 'rgba(63,185,80,0.12)', border: 'rgba(63,185,80,0.3)', color: '#3fb950' },
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360, width: '100%', pointerEvents: 'none' }}>
      {toasts.map(t => {
        const variant = t.variant ?? 'default';
        const Icon = ICON[variant];
        const s = STYLE[variant];
        return (
          <div key={t.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', borderRadius: 12, border: `1px solid ${s.border}`, background: s.bg, backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', pointerEvents: 'auto', animation: 'slideInRight 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
            <Icon size={15} color={s.color} style={{ marginTop: 1, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#e6edf3', margin: 0 }}>{t.title}</p>
              {t.description && <p style={{ fontSize: 12, color: '#8b949e', margin: '2px 0 0' }}>{t.description}</p>}
            </div>
            <button onClick={() => setToasts(p => p.filter(x => x.id !== t.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#484f58', padding: 0, flexShrink: 0 }}>
              <X size={14} />
            </button>
          </div>
        );
      })}
      <style>{`@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
    </div>
  );
}

export default ToastContainer;
