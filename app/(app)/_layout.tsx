import { Stack } from 'expo-router';
import React from 'react';
import { theme } from '@/src/constant/theme';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.white },
      }}
    >
      <Stack.Screen 
        name="(customer)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="(mitra)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
