import React, { useState } from 'react';
import { Image, StyleSheet, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/src/constant/theme';
import { Button, ButtonText, Container, Input, Title, Description } from '@/src/components/ui';
import { useAuth } from '@/src/hooks/useAuth';
import { supabase } from '@/src/api/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await signIn(email, password);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user?.user_metadata.email_verified) {
        setError('Please verify your email before logging in');
        return;
      }

      if (user?.user_metadata.role === 'mitra') {
        router.replace('/(app)/(mitra)');
      } else {
        router.replace('/(app)/(customer)');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
          <Title style={styles.title}>Masuk</Title>
          <Description style={styles.description}>
            Selamat datang kembali
          </Description>
          
          {error && (
            <View style={styles.errorContainer}>
              <Description style={styles.errorText}>{error}</Description>
            </View>
          )}
          
          <Input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError('');
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor={theme.colors.shadow}
            editable={!loading}
          />
          <Input
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError('');
            }}
            secureTextEntry
            placeholderTextColor={theme.colors.shadow}
            editable={!loading}
          />
          
          <Button 
            style={styles.button} 
            onPress={handleLogin}
            disabled={loading}
          >
            <ButtonText style={styles.buttonText}>
              {loading ? 'Loading...' : 'Masuk'}
            </ButtonText>
          </Button>
          
          <Button 
            style={styles.linkButton} 
            onPress={() => router.push('/register')}
            disabled={loading}
          >
            <ButtonText style={styles.linkText}>
              Belum punya akun? Daftar
            </ButtonText>
          </Button>
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
  errorContainer: {
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    padding: theme.spacing.md,
    borderRadius: 8,
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  errorText: {
    color: '#FF4444',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    padding: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    width: '100%',
    height: 50,
    fontSize: 16,
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
    marginTop: theme.spacing.lg,
  },
  linkText: {
    color: theme.colors.white,
    fontSize: 16,
  },
});
