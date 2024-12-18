import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { locationService } from '@/src/services/location';
import { theme } from '@/src/constant/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function MapsScreen() {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState({
    latitude: -7.3305,
    longitude: 108.2241,
  });
  const [address, setAddress] = useState('');

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    try {
      const location = await locationService.getCurrentLocation();
      setUserLocation({
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
      });
      setAddress(location.address);
    } catch (error) {
      console.error('Error loading location:', error);
    }
  };

  const getMapUrl = () => {
    const { latitude, longitude } = userLocation;
    const zoom = 18; // Higher zoom level for better detail
    return `https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.002}%2C${latitude-0.002}%2C${longitude+0.002}%2C${latitude+0.002}&layer=mapnik&marker=${latitude}%2C${longitude}&zoom=${zoom}&layers=CG`;
  };

  return (
    <View style={styles.container}>
      <WebView
        style={styles.map}
        source={{ uri: getMapUrl() }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />

      <View style={styles.addressContainer}>
        <Text style={styles.addressText} numberOfLines={2}>
          {address}
        </Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.currentLocationButton}
        onPress={loadLocation}
      >
        <Ionicons name="locate" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  map: {
    flex: 1,
  },
  addressContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addressText: {
    color: theme.colors.white,
    fontSize: 16,
    flex: 1,
    marginRight: 16,
  },
  backButton: {
    padding: 8,
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: theme.colors.white,
    borderRadius: 30,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
