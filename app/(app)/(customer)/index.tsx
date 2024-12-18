import React from 'react';
import { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, View, TextInput, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import { theme } from '@/src/constant/theme';
import { Container } from '@/src/components/ui';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'expo-router';
import { locationService } from '@/src/services/location';

export default function HomeScreen() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [location, setLocation] = useState<string>('Loading...');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { signOut } = useAuth();
  const router = useRouter();


  const formatDisplayAddress = (address: string) => {
    if (!address || address === 'Loading...' || address === 'Location unavailable') {
      return address;
    }
    const firstPart = address.split(',')[0];
    return `${firstPart}...`;
  };

  const loadLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const userLocation = await locationService.getCurrentLocation();
      setLocation(userLocation.address);
    } catch (error) {
      setLocation('Location unavailable');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  useEffect(() => {
    loadLocation();
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  const handleLocationPress = () => {
    router.push('/(app)/(maps)');
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Keluar aplikasi?', 'Apakah anda yakin ingin keluar?', [
        {
          text: 'Tidak',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Ya', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => setShowDropdown(!showDropdown)}
              style={styles.profileContainer}
            >
              <Image 
                source={{ uri: 'https://storage.googleapis.com/a1aa/image/YMZldHxcjwZiAtXmzeZpw7K98yC1JEF6qNYYboLOqSnZDf7TA.jpg' }}
                style={styles.profilePic}
              />
              {showDropdown && (
                <View style={styles.dropdown}>
                  <TouchableOpacity 
                    style={styles.dropdownItem}
                    onPress={() => {
                      setShowDropdown(false);
                      // Navigate to account page
                    }}
                  >
                    <Ionicons name="person-outline" size={20} color={theme.colors.black} />
                    <Text style={styles.dropdownText}>Akun Saya</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.dropdownItem}
                    onPress={() => {
                      setShowDropdown(false);
                      handleLogout();
                    }}
                  >
                    <Ionicons name="log-out-outline" size={20} color={theme.colors.black} />
                    <Text style={styles.dropdownText}>Logout</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.locationContainer}
              onPress={handleLocationPress}
            >
              <Text style={styles.locationText}>{formatDisplayAddress(location)}</Text>
              <TouchableOpacity 
                onPress={(e) => {
                  e.stopPropagation();
                  loadLocation();
                }}
                disabled={isLoadingLocation}
                style={styles.reloadButton}
              >
                {isLoadingLocation ? (
                  <ActivityIndicator size="small" color={theme.colors.white} />
                ) : (
                  <Ionicons name="reload-outline" size={16} color={theme.colors.white} />
                )}
              </TouchableOpacity>
              <Ionicons name="location" size={16} color={theme.colors.white} />
            </TouchableOpacity>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color={theme.colors.white} />
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
              <TextInput 
                placeholder="Cari Jasa"
                style={styles.searchInput}
              />
            </View>
          </View>
        </View>

        {/* Category Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Kategori Jasa</Text>
          <View style={styles.categoryContainer}>
            {['Kebersihan', 'Pijat', 'Tukang', 'Tarik Sampah', 'Lainnya'].map((category) => (
              <View key={category} style={styles.categoryItem}>
                <View style={styles.categoryIcon} />
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Popular Services */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Jasa Terpopuler</Text>
            <Text style={styles.seeAllText}>Lihat Semua</Text>
          </View>
          <View style={styles.servicesGrid}>
            <View style={styles.serviceCard}>
              <Image 
                source={{ uri: 'https://storage.googleapis.com/a1aa/image/tAIMzfFGK2XwB60tFyFowKAxvqje53SXl7rO4stfMArtN83nA.jpg' }}
                style={styles.serviceImage}
              />
              <Text style={styles.serviceTitle}>Jasa Tarik Sampah - Budi</Text>
              <Text style={styles.servicePrice}>Rp. 10.000 / 3 Rumah</Text>
            </View>
            <View style={styles.serviceCard}>
              <Image 
                source={{ uri: 'https://storage.googleapis.com/a1aa/image/tAIMzfFGK2XwB60tFyFowKAxvqje53SXl7rO4stfMArtN83nA.jpg' }}
                style={styles.serviceImage}
              />
              <Text style={styles.serviceTitle}>Jasa Pijat Badan - Agus</Text>
              <Text style={styles.servicePrice}>
                Rp. 45.000 <Text style={styles.strikethrough}>Rp. 50.000</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Nearby Services */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Terdekat</Text>
            <Text style={styles.seeAllText}>Lihat Semua</Text>
          </View>
          <View style={styles.servicesGrid}>
            <View style={styles.serviceCard}>
              <Image 
                source={{ uri: 'https://storage.googleapis.com/a1aa/image/tAIMzfFGK2XwB60tFyFowKAxvqje53SXl7rO4stfMArtN83nA.jpg' }}
                style={styles.serviceImage}
              />
              <Text style={styles.serviceTitle}>Jasa Tarik Sampah - Budi</Text>
              <Text style={styles.servicePrice}>Rp. 10.000 / 3 Rumah</Text>
            </View>
            <View style={styles.serviceCard}>
              <Image 
                source={{ uri: 'https://storage.googleapis.com/a1aa/image/tAIMzfFGK2XwB60tFyFowKAxvqje53SXl7rO4stfMArtN83nA.jpg' }}
                style={styles.serviceImage}
              />
              <Text style={styles.serviceTitle}>Jasa Pijat Badan - Agus</Text>
              <Text style={styles.servicePrice}>
                Rp. 45.000 <Text style={styles.strikethrough}>Rp. 50.000</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerContainer: {
    backgroundColor: theme.colors.primary,
    borderBottomStartRadius: 35,
    borderBottomRightRadius: 35,
  },
  profileContainer: {
    position: 'relative',
    zIndex: 2,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  dropdown: {
    position: 'absolute',
    top: 45,
    left: 0,
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    width: 180,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: theme.colors.black,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.primarybgglass,
    borderRadius: 50,
  },
  locationText: {
    fontSize: 14,
    color: theme.colors.white,
  },
  reloadButton: {
    padding: 4,
    marginHorizontal: 4,
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    padding: 8,
  },
  searchIcon: {
    marginLeft: 12,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sectionContainer: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  seeAllText: {
    color: theme.colors.primary,
    fontSize: 14,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
  },
  servicesGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  serviceCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 14,
    color: 'gray',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  }
});
