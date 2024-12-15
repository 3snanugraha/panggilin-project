import React from 'react';
import { Image, StyleSheet, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/src/constant/theme';
import { Button, ButtonText, Container, Title, Description } from '@/src/components/ui';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <Container style={styles.container}>
        <View style={styles.heroContainer}>
          <Image 
            source={require('@/assets/images/auth.png')} 
            style={styles.hero}
          />
        </View>
        
        <View style={styles.content}>
          <Title style={styles.title}>Selamat Datang di PanggilIn</Title>
          <Description style={styles.description}>
            Temukan jasa terpercaya untuk kebutuhan Anda dengan mudah dan cepat
          </Description>

          <View style={styles.buttonContainer}>
            <Button 
              style={styles.primaryButton}
              onPress={() => router.push('/(auth)/login')}
            >
              <ButtonText style={styles.primaryButtonText}>Masuk</ButtonText>
            </Button>

            <Button 
              style={styles.outlineButton}
              onPress={() => router.push('/(auth)/register')}
            >
              <ButtonText style={styles.outlineButtonText}>Daftar</ButtonText>
            </Button>
          </View>

          <View style={styles.oauthContainer}>
            <Description style={styles.dividerText}>Daftar dengan</Description>
            <Button style={styles.oauthButton}>
              <Ionicons name="logo-google" size={24} color={theme.colors.primary} />
            </Button>
          </View>
        </View>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: theme.layout.screenHeight,
    backgroundColor: theme.colors.white,
  },
  heroContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  hero: {
    width: theme.layout.screenWidth * 0.7,
    height: theme.layout.screenWidth * 0.7,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.primary,
    textAlign: 'center',
    fontSize: 28,
    marginBottom: theme.spacing.sm,
  },
  description: {
    ...theme.typography.description,
    color: theme.colors.black,
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    width: '80%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    width: '80%',
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  oauthContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  dividerText: {
    color: theme.colors.shadow,
    marginBottom: theme.spacing.md,
  },
  oauthButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.shadow,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
