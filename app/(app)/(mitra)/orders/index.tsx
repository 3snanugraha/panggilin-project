import { View, Text } from 'react-native';
import React from 'react';
import { theme } from '@/src/constant/theme';

export default function OrdersFromCustomers() {
  return (
    <View style={theme.containers.centered}>
      <Text style={theme.typography.title}>Orders from Customers</Text>
    </View>
  );
}
