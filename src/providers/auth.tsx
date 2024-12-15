import React, { createContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import { supabase } from '@/src/api/supabase';
import { Tables } from '@/src/api/supabase';

type AuthContextType = {
  session: Session | null;
  user: Tables['users'] | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: 'mitra' | 'pengguna') => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<Tables['users'] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
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

      if (error) throw error;
      if (data) setUser(data);
    } catch (error) {
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
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } catch (error: any) {
        Alert.alert('Error signing in', error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },

    signUp: async (email: string, password: string, role: 'mitra' | 'pengguna') => {
      try {
        setLoading(true);
        const { error: signUpError, data } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: { role }
          }
        });
        if (signUpError) throw signUpError;
    
        if (data.user) {
          const { error: insertError } = await supabase
            .from('users')
            .insert([{ 
              id: data.user.id, 
              email, 
              role 
            }]);
          if (insertError) throw insertError;
        }
    
        if (!data.session) {
          Alert.alert('Verification email sent', 'Please check your inbox for email verification!');
        }
      } catch (error: any) {
        Alert.alert('Error signing up', error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },

    signOut: async () => {
      try {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (error: any) {
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
