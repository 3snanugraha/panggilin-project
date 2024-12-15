import { View, Text } from 'react-native';
import React from 'react';
import { theme } from '@/src/constant/theme';

export default function MitraDashboard() {
  return (
    <View style={theme.containers.centered}>
      <Text style={theme.typography.title}>Mitra Dashboard</Text>
    </View>
  );
}
