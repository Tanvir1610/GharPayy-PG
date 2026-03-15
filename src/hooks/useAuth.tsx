'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { User, SupabaseClient } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: 'tenant' | 'owner' | 'admin';
  phone?: string;
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, role?: 'tenant' | 'owner') => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  hasRole: (role: 'admin' | 'owner' | 'tenant') => boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper — get supabase lazily, only when actually needed (always client-side)
function getSupabase(): SupabaseClient | null {
  if (typeof window === 'undefined') return null;
  // Dynamic require so this module is never evaluated server-side
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require('@/lib/supabase/client');
  return createClient();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const buildUser = useCallback(async (sbUser: User): Promise<AuthUser> => {
    const supabase = getSupabase();
    if (!supabase) return { id: sbUser.id, email: sbUser.email ?? '', fullName: '', role: 'tenant' };

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, role, phone, avatar_url')
      .eq('id', sbUser.id)
      .single();

    return {
      id: sbUser.id,
      email: sbUser.email ?? '',
      fullName: profile?.full_name ?? sbUser.user_metadata?.full_name ?? '',
      role: (profile?.role ?? 'tenant') as AuthUser['role'],
      phone: profile?.phone ?? undefined,
      avatar: profile?.avatar_url ?? undefined,
    };
  }, []);

  const refreshUser = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data: { user: sbUser } } = await supabase.auth.getUser();
    if (sbUser) setUser(await buildUser(sbUser));
    else setUser(null);
  }, [buildUser]);

  useEffect(() => {
    // This only runs in the browser — never during SSR/build
    const supabase = getSupabase();
    if (!supabase) { setLoading(false); return; }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) setUser(await buildUser(session.user));
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) setUser(await buildUser(session.user));
        else setUser(null);
      }
    );

    return () => subscription.unsubscribe();
  }, [buildUser]);

  const signUp = async (email: string, password: string, fullName: string, role: 'tenant' | 'owner' = 'tenant') => {
    const supabase = getSupabase();
    if (!supabase) return { error: new Error('Not available') };
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName, role } },
    });
    return { error: error ? new Error(error.message) : null };
  };

  const signIn = async (email: string, password: string) => {
    const supabase = getSupabase();
    if (!supabase) return { error: new Error('Not available') };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: new Error(error.message) };
    if (data.user) setUser(await buildUser(data.user));
    return { error: null };
  };

  const signOut = async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  };

  const hasRole = (role: 'admin' | 'owner' | 'tenant') => user?.role === role;

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, hasRole, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
