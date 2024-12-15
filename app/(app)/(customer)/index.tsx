import { View, Text } from 'react-native';
import React from 'react';
import { theme } from '@/src/constant/theme';

export default function CustomerHome() {
  return (
    <View style={theme.containers.centered}>
      <Text style={theme.typography.title}>Home Screen</Text>
    </View>
  );
}
