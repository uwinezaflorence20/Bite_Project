import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radii, spacing } from '../theme/colors';
import { fonts } from '../theme/typography';
import { RootStackParamList } from '../navigation/types';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export default function LandingScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80' }}
        style={styles.image}
      />
      <LinearGradient colors={['transparent', colors.white]} style={styles.fade} />

      <View style={styles.brandRow}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoMark}>F</Text>
        </View>
        <Text style={styles.brand}>Foodgo</Text>
      </View>

      <View style={styles.sheet}>
        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <Text style={styles.title}>Hot &amp; tasty food{`\n`}delivered to your door</Text>
        <Text style={styles.subtitle}>
          Order from your favorite local restaurants and get it delivered fast, fresh and on time.
        </Text>

        <PrimaryButton
          label="Get Started"
          icon="arrow-forward"
          style={styles.primaryButton}
          onPress={() => navigation.replace('SignUp')}
        />
        <Text style={styles.switchText} onPress={() => navigation.replace('SignIn')}>
          Already have an account? <Text style={styles.switchLink}>Sign In</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    width: '100%',
    height: '58%',
  },
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '38%',
    height: '24%',
  },
  brandRow: {
    position: 'absolute',
    top: 56,
    left: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMark: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.white,
  },
  brand: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.white,
  },
  sheet: {
    flex: 1,
    marginTop: -32,
    backgroundColor: colors.white,
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.chipInactive,
  },
  dotActive: {
    width: 22,
    backgroundColor: colors.primary,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 36,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  primaryButton: {
    marginBottom: spacing.md,
  },
  switchText: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
  },
  switchLink: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
  },
});
