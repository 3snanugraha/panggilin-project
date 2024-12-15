import { View, Text } from 'react-native';
import React from 'react';
import { theme } from '@/src/constant/theme';

export default function OrdersList() {
  return (
    <View style={theme.containers.centered}>
      <Text style={theme.typography.title}>Orders List</Text>
    </View>
  );
}
