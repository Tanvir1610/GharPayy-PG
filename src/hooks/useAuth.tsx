'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { createBrowserClient } from '@supabase/ssr';
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

// Create Supabase client safely — only in browser, only when env vars exist
function getSB(): SupabaseClient | null {
  if (typeof window === 'undefined') return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createBrowserClient(url, key);
}

// Module-level singleton so we don't recreate on every render
let _sb: SupabaseClient | null = null;
function getClient(): SupabaseClient | null {
  if (!_sb) _sb = getSB();
  return _sb;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const buildUser = useCallback(async (sbUser: User): Promise<AuthUser> => {
    const sb = getClient();
    if (!sb) return { id: sbUser.id, email: sbUser.email ?? '', fullName: '', role: 'tenant' };
    const { data: profile } = await sb
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
    const sb = getClient();
    if (!sb) return;
    const { data: { user: sbUser } } = await sb.auth.getUser();
    if (sbUser) setUser(await buildUser(sbUser));
    else setUser(null);
  }, [buildUser]);

  useEffect(() => {
    const sb = getClient();
    if (!sb) { setLoading(false); return; }

    sb.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) setUser(await buildUser(session.user));
      setLoading(false);
    });

    const { data: { subscription } } = sb.auth.onAuthStateChange(async (_e, session) => {
      if (session?.user) setUser(await buildUser(session.user));
      else setUser(null);
    });

    return () => subscription.unsubscribe();
  }, [buildUser]);

  const signUp = async (email: string, password: string, fullName: string, role: 'tenant' | 'owner' = 'tenant') => {
    const sb = getClient();
    if (!sb) return { error: new Error('Supabase not initialised') };
    const { error } = await sb.auth.signUp({ email, password, options: { data: { full_name: fullName, role } } });
    return { error: error ? new Error(error.message) : null };
  };

  const signIn = async (email: string, password: string) => {
    const sb = getClient();
    if (!sb) return { error: new Error('Supabase not initialised') };
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) return { error: new Error(error.message) };
    if (data.user) setUser(await buildUser(data.user));
    return { error: null };
  };

  const signOut = async () => {
    const sb = getClient();
    if (!sb) return;
    await sb.auth.signOut();
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
