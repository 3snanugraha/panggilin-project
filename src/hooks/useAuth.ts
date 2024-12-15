import { useContext } from 'react';
import { AuthContext } from '@/src/providers/auth';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}