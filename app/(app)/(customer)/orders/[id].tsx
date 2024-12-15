import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { theme } from '@/src/constant/theme';

export default function OrderDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View style={theme.containers.centered}>
      <Text style={theme.typography.title}>Order Detail</Text>
      <Text style={theme.typography.description}>Order ID: {id}</Text>
    </View>
  );
}
