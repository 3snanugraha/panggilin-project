import React, { useState } from 'react';
import { Image, StyleSheet, ScrollView, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/src/constant/theme';
import { Button, ButtonText, Container, Input, Title, Description } from '@/src/components/ui';
import { useAuth } from '@/src/hooks/useAuth';

type Role = 'mitra' | 'pengguna';

const RoleOption = ({ 
  label, 
  selected, 
  onSelect 
}: { 
  label: string; 
  selected: boolean; 
  onSelect: () => void;
}) => (
  <Pressable 
    style={[styles.roleOption, selected && styles.roleOptionSelected]} 
    onPress={onSelect}
  >
    <View style={[styles.radio, selected && styles.radioSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
    <ButtonText style={[styles.roleText, selected && styles.roleTextSelected]}>
      {label}
    </ButtonText>
  </Pressable>
);

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('pengguna');

  const handleRegister = async () => {
    try {
      await signUp(email, password, role);
      router.replace('/(auth)/login');
    } catch (error) {
      console.error(error);
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
          <Title style={styles.title}>Daftar</Title>
          <Description style={styles.description}>
            Buat akun baru
          </Description>
          
          <Input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholderTextColor={theme.colors.shadow}
          />
          <Input
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={theme.colors.shadow}
          />
          
          <View style={styles.roleContainer}>
            <Description style={styles.roleLabel}>Daftar sebagai:</Description>
            <RoleOption 
              label="Pengguna" 
              selected={role === 'pengguna'} 
              onSelect={() => setRole('pengguna')}
            />
            <RoleOption 
              label="Mitra" 
              selected={role === 'mitra'} 
              onSelect={() => setRole('mitra')}
            />
          </View>

          <Button style={styles.button} onPress={handleRegister}>
            <ButtonText style={styles.buttonText}>Daftar</ButtonText>
          </Button>
          
          <Button 
            style={styles.linkButton} 
            onPress={() => router.push('/login')}
          >
            <ButtonText style={styles.linkText}>
              Sudah punya akun? Masuk
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
    width: theme.layout.screenWidth * 0.4,
    height: theme.layout.screenWidth * 0.4,
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
  roleContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  roleLabel: {
    color: theme.colors.white,
    marginBottom: theme.spacing.md,
    fontSize: 14,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
    borderRadius: 10,
  },
  roleOptionSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: theme.colors.white,
    marginRight: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: theme.colors.white,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.white,
  },
  roleText: {
    color: theme.colors.white,
    fontSize: 16,
  },
  roleTextSelected: {
    fontWeight: 'bold',
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
