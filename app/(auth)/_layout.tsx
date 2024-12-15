import { Stack } from 'expo-router';
import React from 'react';
import { theme } from '@/src/constant/theme';
import { AuthProvider } from "@/src/providers/auth";

export default function AuthLayout() {
  return (
    <AuthProvider>
    <Stack 
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.white }
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
    </AuthProvider>
  );
}