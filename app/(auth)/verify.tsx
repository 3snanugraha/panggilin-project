import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, ScrollView, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/src/constant/theme';
import { Container, Title, Description, Button, ButtonText } from '@/src/components/ui';
import { supabase } from '@/src/api/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openInbox } from 'react-native-email-link';

export default function VerifyScreen() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔄 VerifyScreen mounted');
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
      console.log('📨 Resending verification email to:', email);

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email as string,
        options: {
          emailRedirectTo: `${Linking.createURL('verify')}`
        }
      });
      
      if (error) throw error;
      
      Alert.alert('Success', 'Verification email has been resent');
      console.log('✅ Verification email resent successfully');
      setError(null);
      setCountdown(300);
    } catch (error: any) {
      console.error('❌ Resend verification error:', error);
      setError('Failed to resend verification email');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔄 Setting up deep link handlers');
    
    const handleVerification = async (token: string) => {
      try {
        setIsLoading(true);
        const email = await AsyncStorage.getItem('verificationEmail');
        console.log('🔐 Starting email verification:', { email, token });
    
        const { data, error } = await supabase.auth.verifyOtp({
          email: email as string,
          token,
          type: 'email'
        });
    
        if (error) throw error;
    
        if (data?.user) {
          // Update email_verified flag
          const { error: updateError } = await supabase.auth.updateUser({
            data: { email_verified: true }
          });
    
          if (updateError) throw updateError;
    
          // Insert into public users table
          const { error: insertError } = await supabase
            .from('users')
            .insert([{ 
              id: data.user.id, 
              email: data.user.email,
              role: data.user.user_metadata.role 
            }])
            .select()
            .single();
    
          if (insertError) throw insertError;
    
          setIsVerified(true);
          await AsyncStorage.removeItem('verificationEmail');
          setTimeout(() => router.replace('/(auth)/login'), 2000);
        }
      } catch (error: any) {
        console.error('❌ Verification failed:', error);
        setError('Verification failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };           

    // Handle initial URL
    const handleInitialURL = async () => {
      const url = await Linking.getInitialURL();
      console.log('🔍 Initial URL:', url);
      
      if (url) {
        const parsedUrl = Linking.parse(url);
        console.log('📎 Parsed initial URL:', parsedUrl);
        
        const token = parsedUrl.queryParams?.token;
        if (token && typeof token === 'string') {
          handleVerification(token);
        }
      }
    };

    handleInitialURL();

    // Handle deep linking
    const subscription = Linking.addEventListener('url', ({ url }) => {
      console.log('📱 Received URL:', url);
      const parsedUrl = Linking.parse(url);
      console.log('🔗 Parsed URL data:', parsedUrl);
      
      const token = parsedUrl.queryParams?.token;
      if (token && typeof token === 'string') {
        handleVerification(token);
      }
    });

    return () => {
      console.log('♻️ Cleaning up VerifyScreen');
      subscription.remove();
    };
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
                  onPress={() => openInbox()}
                >
                  <ButtonText style={styles.buttonText}>Buka Email</ButtonText>
                </Button>
              )}
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
