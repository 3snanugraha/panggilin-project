import React, { createContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import { supabase } from '@/src/api/supabase';
import { Tables } from '@/src/api/supabase';
import { linking } from '@/src/utils/linking';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  session: Session | null;
  user: Tables['users'] | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: 'mitra' | 'pengguna') => Promise<{
    data: {
      user: User | null;
      session: Session | null;
    }
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
      console.log('Session state:', session);
      setSession(session);
      if (session?.user) {
        fetchUser(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event);
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
      console.log('Fetching user with ID:', userId);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
  
      console.log('Database query result:', { data, error });
  
      if (error) {
        console.log('User not found in database, signing out');
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        return;
      }
  
      if (data) {
        console.log('User data fetched:', data);
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
        console.log('Attempting sign in for:', email);
        
        const { data: { user }, error } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        });
        
        if (error) throw error;
        
        if (!user?.user_metadata.email_verified) {
          throw new Error('Please verify your email before logging in');
        }
    
        console.log('Sign in successful:', user);
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
        
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: { 
              role,
              email_verified: false
            },
            emailRedirectTo: 'https://panggilin.artadev.my.id/verify'  // Use full URL
          }
        });
        
        if (error) throw error;
        await AsyncStorage.setItem('verificationEmail', email);
        return { data };
      } catch (error: any) {
        throw error;
      } finally {
        setLoading(false);
      }
    },

    signOut: async () => {
      try {
        setLoading(true);
        console.log('Initiating sign out');
        
        setUser(null);
        setSession(null);
        
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        console.log('Sign out successful');
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
