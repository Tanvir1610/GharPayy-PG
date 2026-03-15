'use client';

import { useState, useEffect } from 'react';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
}

let _setToasts: React.Dispatch<React.SetStateAction<Toast[]>> | null = null;

export function toast(t: Omit<Toast, 'id'>) {
  if (!_setToasts) return;
  const id = Math.random().toString(36).slice(2);
  _setToasts((prev) => [...prev, { ...t, id }]);
  setTimeout(() => {
    _setToasts?.((prev) => prev.filter((x) => x.id !== id));
  }, 4000);
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  useEffect(() => {
    _setToasts = setToasts;
    return () => { _setToasts = null; };
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8, width: 320 }}>
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            background:
              t.variant === 'destructive' ? '#dc2626' :
              t.variant === 'success'     ? '#16a34a' : '#0e0c0a',
            color: '#fff',
            borderRadius: 12,
            padding: '12px 16px',
            fontSize: 14,
            fontWeight: 500,
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            animation: 'ghToastIn 0.2s ease',
          }}
        >
          <p>{t.title}</p>
          {t.description && (
            <p style={{ marginTop: 2, opacity: 0.8, fontWeight: 400, fontSize: 12 }}>
              {t.description}
            </p>
          )}
        </div>
      ))}
      <style>{`
        @keyframes ghToastIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
