import React from 'react';
import { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, View, TextInput, Text, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { theme } from '@/src/constant/theme';
import { Container } from '@/src/components/ui';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace('/(auth)/login');
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
                  <Text>Akun Saya</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dropdownItem}
                  onPress={() => {
                    setShowDropdown(false);
                    handleLogout();
                  }}
                >
                  <Text>Logout</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>Lokasi User</Text>
              <Ionicons name="location" size={16} color={theme.colors.white} />
            </View>
            <Ionicons name="chatbubble-outline" size={24} color={theme.colors.white} />
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
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  },
  profileContainer: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 45,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
});
