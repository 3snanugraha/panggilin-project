import React, { createContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import { supabase } from '@/src/api/supabase';
import { Tables } from '@/src/api/supabase';

type AuthContextType = {
  session: Session | null;
  user: Tables['users'] | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: 'mitra' | 'pengguna') => Promise<{
    data: {
      user: User | null;
      session: Session | null;
    };
  }>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<Tables['users'] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUser(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUser(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchUser(userId: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        return;
      }

      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.error('Fetch user error:', error);
      Alert.alert('Error fetching user data');
    } finally {
      setLoading(false);
    }
  }

  const value = {
    session,
    user,
    loading,
    signIn: async (email: string, password: string) => {
      try {
        setLoading(true);
        
        const { data: { user }, error } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        });
        
        if (error) throw error;
        
        if (!user?.user_metadata.email_verified) {
          throw new Error('Please verify your email before logging in');
        }
    
      } catch (error: any) {
        console.error('Sign in error:', error);
        Alert.alert('Error signing in', error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },

    signUp: async (email: string, password: string, role: 'mitra' | 'pengguna') => {
      try {
        setLoading(true);
        console.log('Starting signup for:', email, 'with role:', role);
        
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: { 
              role,
              email_verified: false
            }
          }
        });
        
        console.log('Signup response:', {
          user: data.user?.id,
          session: data.session?.access_token?.substring(0, 10) + '...',
          error
        });

        if (error) throw error;
        return { data };
      } catch (error: any) {
        console.error('Detailed signup error:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    signOut: async () => {
      try {
        setLoading(true);
        
        setUser(null);
        setSession(null);
        
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
      } catch (error: any) {
        console.error('Sign out error:', error);
        Alert.alert('Error signing out', error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
