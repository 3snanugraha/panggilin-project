import { Stack } from 'expo-router';
import React from 'react';
import { theme } from '@/src/constant/theme';

export default function OrdersLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.white,
      }}
    >
      <Stack.Screen 
        name="index"
        options={{
          title: 'My Orders'
        }}
      />
    </Stack>
  );
}
