import { Stack } from 'expo-router';
import React from 'react';

export default function StartLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false 
        }} 
      />
    </Stack>
  );
}