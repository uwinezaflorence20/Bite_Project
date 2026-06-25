import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radii } from '../theme/colors';
import { fonts } from '../theme/typography';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export default function LandingScreen({ navigation }: Props) {
  return (
    <Pressable style={styles.container} onPress={() => navigation.replace('SignIn')}>
      <Text style={styles.brand}>Foodgo</Text>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=700&q=80' }}
        style={styles.image}
      />
      <Text style={styles.tap}>Tap to continue</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    position: 'absolute',
    top: 90,
    fontFamily: fonts.bold,
    fontSize: 36,
    color: colors.white,
  },
  image: {
    width: 230,
    height: 470,
    borderRadius: radii.md,
  },
  tap: {
    position: 'absolute',
    bottom: 60,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
  },
});
