import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/src/constant/theme';
import { Button, ButtonText, Container, Description, Title } from '@/src/components/ui';

const slides = [
  {
    id: '1',
    image: require('@/assets/images/handyman.png'),
    description: 'Cari tukang untuk berbagai pekerjaan rumah atau renovasi.',
  },
  {
    id: '2',
    image: require('@/assets/images/cleaning.png'),
    description: 'Pesan layanan kebersihan untuk rumah atau kantor Anda.',
  },
  {
    id: '3',
    image: require('@/assets/images/trash.png'),
    description: 'Layanan pungut sampah untuk lingkungan yang lebih bersih.',
  },
  {
    id: '4',
    image: require('@/assets/images/delivery.png'),
    description: 'Tersedia berbagai layanan lainnya sesuai kebutuhan Anda.',
  },
];

export default function StartScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleGetStarted = () => {
    router.push('/');
  };

  const renderItem = ({ item }: { item: typeof slides[0] }) => (
    <Container style={[styles.slide, theme.containers.slide]}>
      <Image source={item.image} style={theme.images.slide} />
      <Description style={styles.description}>{item.description}</Description>
    </Container>
  );

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / theme.layout.screenWidth);
    setCurrentIndex(index);
  };

  return (
    <Container style={styles.container}>
      <LinearGradient
        colors={theme.gradients.primary}
        style={StyleSheet.absoluteFill}
      />
      <Title style={styles.title}>PanggilIn</Title>
      <FlatList
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        style={styles.slider}
      />
      <Container style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <Container
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </Container>
      <Button style={styles.button} onPress={handleGetStarted}>
        <Ionicons name="people-outline" size={24} color={theme.colors.primary} />
        <ButtonText style={styles.buttonText}>Cari Layanan</ButtonText>
      </Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    ...theme.containers.centered,
  },
  slide: {
    width: theme.layout.screenWidth,
  },
  title: {
    ...theme.typography.title,
  },
  description: {
    ...theme.typography.description,
  },
  slider: {
    flexGrow: 0,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.white,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 12,
    height: 12,
    backgroundColor: theme.colors.primary,
  },
  button: {
    ...theme.buttons.primary,
  },
  buttonText: {
    ...theme.typography.button,
    marginLeft: theme.spacing.sm,
  },
});
