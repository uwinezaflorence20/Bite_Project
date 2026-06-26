import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export default function LandingScreen({ navigation }: Props) {
  return (
    <Pressable style={styles.container} onPress={() => navigation.replace('SignIn')}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=700&q=80' }}
        style={styles.image}
      />
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.75)']} style={styles.overlay} />
      <Text style={styles.brand}>Foodgo</Text>
      <Text style={styles.tagline}>Great food, delivered fast</Text>
      <View style={styles.tap}>
        <Text style={styles.tapText}>Tap to continue</Text>
        <Ionicons name="arrow-forward" size={16} color={colors.white} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  image: {
    ...StyleSheet.absoluteFill,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
  },
  brand: {
    position: 'absolute',
    top: 90,
    alignSelf: 'center',
    fontFamily: fonts.bold,
    fontSize: 40,
    color: colors.white,
  },
  tagline: {
    position: 'absolute',
    top: 146,
    alignSelf: 'center',
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
  },
  tap: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tapText: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.white,
  },
});
