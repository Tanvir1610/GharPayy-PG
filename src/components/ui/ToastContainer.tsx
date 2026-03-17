'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Toast { id: string; title: string; description?: string; variant?: 'default' | 'destructive' | 'success'; }

let addToast: (t: Omit<Toast, 'id'>) => void = () => {};

export function toast(t: Omit<Toast, 'id'>) { addToast(t); }

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const add = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(p => [...p, { ...t, id }]);
    setTimeout(() => setToasts(p => p.filter(x => x.id !== id)), 4000);
  }, []);

  useEffect(() => { addToast = add; }, [add]);

  const ICON = { default: Info, destructive: AlertCircle, success: CheckCircle };
  const COLOR = {
    default: 'bg-white border-[#e8e2d8] text-[#1a1208]',
    destructive: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(t => {
        const variant = t.variant ?? 'default';
        const Icon = ICON[variant];
        return (
          <div key={t.id}
            className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg pointer-events-auto animate-in slide-in-from-right ${COLOR[variant]}`}>
            <Icon size={16} className="mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{t.title}</p>
              {t.description && <p className="text-xs mt-0.5 opacity-80">{t.description}</p>}
            </div>
            <button onClick={() => setToasts(p => p.filter(x => x.id !== t.id))} className="shrink-0 opacity-60 hover:opacity-100">
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
