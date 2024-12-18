import { Stack } from 'expo-router';

export default function MapsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index"
        options={{
          headerTitle: 'Lokasi Kamu',
          headerShown: true,
        }}
      />
    </Stack>
  );
}