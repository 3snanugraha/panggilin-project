import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
});


// Auto-refresh auth session
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
});

// Types based on your database schema
export type Tables = {
  users: {
    id: string;
    email: string;
    role: 'admin' | 'mitra' | 'pengguna';
    created_at: string;
  };
  services: {
    id: string;
    name: string;
    description: string;
    price_min: number;
    price_max: number;
    category_id: string;
  };
  orders: {
    id: string;
    user_id: string;
    service_id: string;
    mitra_id: string;
    status: 'requested' | 'in_progress' | 'completed' | 'cancelled';
    scheduled_at: string;
    total_price: number;
    payment_status: 'pending' | 'paid' | 'failed';
  };
};
