import { Stack } from 'expo-router';
import React from 'react';
import { theme } from '@/src/constant/theme';

export default function MitraOrdersLayout() {
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
          title: 'Customer Orders'
        }}
      />
    </Stack>
  );
}
