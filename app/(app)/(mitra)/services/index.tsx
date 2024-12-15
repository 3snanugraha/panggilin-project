import { View, Text } from 'react-native';
import React from 'react';
import { theme } from '@/src/constant/theme';

export default function ServicesList() {
  return (
    <View style={theme.containers.centered}>
      <Text style={theme.typography.title}>My Services</Text>
    </View>
  );
}
