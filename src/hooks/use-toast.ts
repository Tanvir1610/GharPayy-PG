'use client';

import { useState, useCallback } from 'react';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
}

let toastListeners: Array<(toast: Toast) => void> = [];

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(
    ({ title, description, variant = 'default' }: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).slice(2);
      const t: Toast = { id, title, description, variant };
      setToasts((prev) => [...prev, t]);
      toastListeners.forEach((fn) => fn(t));
      setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4000);
    },
    []
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  return { toast, toasts, dismiss };
}

// Global toast emitter for use outside components
export function emitToast(t: Omit<Toast, 'id'>) {
  toastListeners.forEach((fn) => fn({ ...t, id: Math.random().toString(36).slice(2) }));
}
