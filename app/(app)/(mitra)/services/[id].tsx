import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { theme } from '@/src/constant/theme';

export default function ServiceDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View style={theme.containers.centered}>
      <Text style={theme.typography.title}>Service Detail</Text>
      <Text style={theme.typography.description}>Service ID: {id}</Text>
    </View>
  );
}
