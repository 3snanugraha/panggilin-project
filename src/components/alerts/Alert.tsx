import React, { useEffect } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/constant/theme';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertProps {
  type: AlertType;
  message: string;
  duration?: number;
  onClose?: () => void;
}

const getAlertStyle = (type: AlertType): { backgroundColor: string; icon: keyof typeof Ionicons.glyphMap } => {
  switch (type) {
    case 'success':
      return {
        backgroundColor: '#4CAF50',
        icon: 'checkmark-circle'
      };
    case 'error':
      return {
        backgroundColor: '#F44336',
        icon: 'alert-circle'
      };
    case 'warning':
      return {
        backgroundColor: '#FF9800',
        icon: 'warning'
      };
    case 'info':
    default:
      return {
        backgroundColor: theme.colors.primary,
        icon: 'information-circle'
      };
  }
};

export function Alert({ type, message, duration = 3000, onClose }: AlertProps) {
  const translateY = new Animated.Value(-100);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => onClose?.());
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const alertStyle = getAlertStyle(type);

  return (
    <Animated.View 
      style={[
        styles.container,
        { backgroundColor: alertStyle.backgroundColor },
        { transform: [{ translateY }], opacity }
      ]}
    >
      <Ionicons name={alertStyle.icon} size={24} color="white" />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.spacing.sm,
    margin: theme.spacing.md,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  message: {
    color: 'white',
    marginLeft: theme.spacing.sm,
    fontSize: 16,
  },
});
