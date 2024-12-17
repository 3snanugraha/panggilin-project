import React from 'react';
import { Image, ScrollView } from 'react-native';
import { theme } from '@/src/constant/theme';
import { Container, Card, Title, Description, Button, ButtonText, Row, Column } from '@/src/components/ui';
import { styles } from '@/src/components/ui';

export default function HomeScreen() {
  return (
    <Container style={{ backgroundColor: theme.colors.primary }}>
      <ScrollView>
        <Card style={[styles.card, { marginTop: theme.spacing.lg }]}>
          {/* Header Section */}
          <Row style={{ justifyContent: 'space-between', marginBottom: theme.spacing.md }}>
            <Column>
              <Description style={{ color: theme.colors.black }}>Halo,</Description>
              <Title style={[styles.title, { color: theme.colors.black }]}>Temukan Layanan Anda</Title>
            </Column>
            <Image 
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </Row>

          {/* Service Type Selection */}
          <Row style={{ justifyContent: 'space-around', marginBottom: theme.spacing.lg }}>
            <Button style={[styles.button, { backgroundColor: theme.colors.primary }]}>
              <ButtonText style={[styles.buttonText, { color: theme.colors.white }]}>Tukang</ButtonText>
            </Button>
            <Button style={[styles.button, { backgroundColor: theme.colors.white }]}>
              <ButtonText style={styles.buttonText}>Pembersihan</ButtonText>
            </Button>
            <Button style={[styles.button, { backgroundColor: theme.colors.white }]}>
              <ButtonText style={styles.buttonText}>Sampah</ButtonText>
            </Button>
          </Row>

          {/* Search Form */}
          <Card style={[styles.card, { marginVertical: theme.spacing.sm }]}>
            <Column style={{ gap: theme.spacing.md }}>
              <Column>
                <Description style={{ color: theme.colors.black }}>Lokasi</Description>
                <Button style={[styles.button, { backgroundColor: theme.colors.white }]}>
                  <ButtonText>Pilih lokasi Anda</ButtonText>
                </Button>
              </Column>

              <Column>
                <Description style={{ color: theme.colors.black }}>Jenis Layanan</Description>
                <Button style={[styles.button, { backgroundColor: theme.colors.white }]}>
                  <ButtonText>Layanan apa yang Anda butuhkan?</ButtonText>
                </Button>
              </Column>

              <Button 
                style={[styles.button, { 
                  backgroundColor: theme.colors.primary,
                  marginTop: theme.spacing.md 
                }]}
              >
                <ButtonText style={{ color: theme.colors.white }}>Cari Layanan</ButtonText>
              </Button>
            </Column>
          </Card>
        </Card>

        {/* Popular Services Section */}
        <Card style={[styles.card, { marginTop: theme.spacing.lg }]}>
          <Title style={[styles.title, { color: theme.colors.black, fontSize: 20 }]}>Layanan Populer</Title>
          <Row style={{ marginTop: theme.spacing.md }}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/150x100' }}
              style={{ width: 150, height: 100, borderRadius: 8, marginRight: theme.spacing.sm }}
            />
            <Image 
              source={{ uri: 'https://via.placeholder.com/150x100' }}
              style={{ width: 150, height: 100, borderRadius: 8 }}
            />
          </Row>
        </Card>
      </ScrollView>
    </Container>
  );
}