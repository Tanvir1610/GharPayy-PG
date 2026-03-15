'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const buildUser = useCallback(async (supabaseUser: User): Promise<AuthUser> => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, role, phone, avatar_url')
      .eq('id', supabaseUser.id)
      .single();

    return {
      id: supabaseUser.id,
      email: supabaseUser.email ?? '',
      fullName: profile?.full_name ?? supabaseUser.user_metadata?.full_name ?? '',
      role: (profile?.role ?? 'tenant') as AuthUser['role'],
      phone: profile?.phone ?? undefined,
      avatar: profile?.avatar_url ?? undefined,
    };
  }, [supabase]);

  const refreshUser = useCallback(async () => {
    const { data: { user: sbUser } } = await supabase.auth.getUser();
    if (sbUser) {
      const authUser = await buildUser(sbUser);
      setUser(authUser);
    } else {
      setUser(null);
    }
  }, [supabase, buildUser]);

  useEffect(() => {
    // Initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const authUser = await buildUser(session.user);
        setUser(authUser);
      }
      setLoading(false);
    });

    // Auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const authUser = await buildUser(session.user);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, buildUser]);

  const signUp = async (email: string, password: string, fullName: string, role: 'tenant' | 'owner' = 'tenant') => {
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName, role } },
    });
    if (error) return { error: new Error(error.message) };
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: new Error(error.message) };
    if (data.user) {
      const authUser = await buildUser(data.user);
      setUser(authUser);
    }
    return { error: null };
  };

  const signOut = async () => {
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
