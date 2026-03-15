'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

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
  useEffect(() => { _setToasts = setToasts; return () => { _setToasts = null; }; }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 w-80">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'rounded-xl px-4 py-3 shadow-lg text-sm font-medium transition-all animate-in slide-in-from-bottom-2',
            t.variant === 'destructive' && 'bg-red-600 text-white',
            t.variant === 'success' && 'bg-green-600 text-white',
            (!t.variant || t.variant === 'default') && 'bg-dark text-white'
          )}
          style={{ background: t.variant === 'destructive' ? '#dc2626' : t.variant === 'success' ? '#16a34a' : '#0e0c0a' }}
        >
          <p>{t.title}</p>
          {t.description && <p className="mt-0.5 opacity-80 font-normal text-xs">{t.description}</p>}
        </div>
      ))}
    </div>
  );
}
