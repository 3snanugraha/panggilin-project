import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, ScrollView, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/src/constant/theme';
import { Container, Title, Description, Button, ButtonText } from '@/src/components/ui';
import { supabase } from '@/src/api/supabase';
import { linking } from '@/src/utils/linking';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VerifyScreen() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleResendVerification = async () => {
    try {
      setIsLoading(true);
      const email = await AsyncStorage.getItem('verificationEmail');
      console.log('Resending verification email to:', email);

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email as string,
        options: {
          emailRedirectTo: `${linking.prefixes[0]}verify`
        }
      });
      
      if (error) throw error;
      
      Alert.alert('Success', 'Verification email has been resent');
      setError(null);
      setCountdown(300);
    } catch (error: any) {
      console.error('Resend verification error:', error);
      setError('Failed to resend verification email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (token: string) => {
    try {
      setIsLoading(true);
      const email = await AsyncStorage.getItem('verificationEmail');
      
      const { data, error } = await supabase.auth.verifyOtp({
        email: email as string,
        token: decodeURIComponent(token),
        type: 'signup'
      });
  
      if (error) {
        if (error.message.includes('expired')) {
          throw new Error('Verification link has expired. Please request a new one.');
        }
        throw error;
      }
  
      if (data?.user) {
        setIsVerified(true);
        await AsyncStorage.removeItem('verificationEmail');
        setTimeout(() => router.replace('/(auth)/login'), 2000);
      }
    } catch (error: any) {
      console.error('Verification failed:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      const parsedUrl = Linking.parse(url);
      
      if (parsedUrl.hostname === 'verify') {
        console.log('Received verification URL:', url);
        console.log('Parsed verification data:', parsedUrl);
        
        const token = parsedUrl.queryParams?.token;
        if (token && typeof token === 'string') {
          handleVerification(token);
        }
      }
    });

    // Handle initial URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        const parsedUrl = Linking.parse(url);
        if (parsedUrl.hostname === 'verify') {
          const token = parsedUrl.queryParams?.token;
          if (token && typeof token === 'string') {
            handleVerification(token);
          }
        }
      }
    });

    return () => subscription.remove();
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <Container style={styles.container}>
        <LinearGradient
          colors={theme.gradients.primary}
          style={StyleSheet.absoluteFill}
        />
        
        <View style={styles.heroContainer}>
          <Image 
            source={require('@/assets/images/auth.png')} 
            style={styles.hero}
          />
        </View>

        <View style={styles.formContainer}>
          <Title style={styles.title}>
            {isVerified ? 'Email Berhasil Diverifikasi! 🎉' : 'Verifikasi Email Kamu Dulu Yuk! ✨'}
          </Title>
          <Description style={styles.description}>
            {isVerified 
              ? 'Sedang mengarahkan ke halaman login...'
              : isLoading 
                ? 'Sedang memverifikasi email Anda...'
                : error 
                  ? error
                  : 'Silakan periksa email Anda dan klik tautan verifikasi untuk melanjutkan. Kami sudah mengirimkan sesuatu yang spesial untuk Anda! ✨📧'}
          </Description>
          
          {!isVerified && !isLoading && (
            <>
              <Description style={styles.timerText}>
                Waktu tersisa: {formatTime(countdown)}
              </Description>
              
              {error ? (
                <Button 
                  style={styles.button}
                  onPress={handleResendVerification}
                  disabled={isLoading}
                >
                  <ButtonText style={styles.buttonText}>
                    Kirim Ulang Email Verifikasi
                  </ButtonText>
                </Button>
              ) : (
                <Button 
                  style={styles.button}
                  onPress={() => Linking.openURL('mailto:')}
                >
                  <ButtonText style={styles.buttonText}>Buka Email</ButtonText>
                </Button>
              )}

              <Button 
                style={styles.linkButton}
                onPress={() => router.replace('/(auth)/login')}
              >
                <ButtonText style={styles.linkText}>Kembali ke Login</ButtonText>
              </Button>
            </>
          )}
        </View>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: theme.layout.screenHeight,
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
  formContainer: {
    flex: 1,
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  title: {
    ...theme.typography.title,
    marginBottom: theme.spacing.sm,
  },
  description: {
    ...theme.typography.description,
    marginBottom: theme.spacing.xl,
  },
  timerText: {
    ...theme.typography.description,
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: theme.spacing.lg,
  },
  button: {
    backgroundColor: theme.colors.white,
    width: '100%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: theme.spacing.md,
  },
  linkText: {
    color: theme.colors.white,
    fontSize: 16,
  },
});
