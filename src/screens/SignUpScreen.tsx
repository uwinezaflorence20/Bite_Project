import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../theme/colors';
import { fonts } from '../theme/typography';
import { RootStackParamList } from '../navigation/types';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    if (!name.trim()) {
      setError('Enter your full name');
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Main');
    }, 900);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&q=80' }}
        style={styles.banner}
      />
      <Text style={styles.brand}>Foodgo</Text>
      <View style={styles.card}>
        <Text style={styles.title}>Create account</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Full Name"
          placeholderTextColor={colors.textMuted}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.textMuted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {!!error && <Text style={styles.error}>{error}</Text>}
        <PrimaryButton
          label="Sign Up"
          icon="arrow-forward"
          style={styles.button}
          loading={loading}
          onPress={handleSignUp}
        />
        <Text style={styles.or}>Or</Text>
        <View style={styles.socialRow}>
          <View style={styles.socialIcon}>
            <Ionicons name="logo-google" size={22} color="#EA4335" />
          </View>
          <View style={styles.socialIcon}>
            <Ionicons name="logo-facebook" size={22} color="#1877F2" />
          </View>
        </View>
        <Text style={styles.switchText} onPress={() => navigation.replace('SignIn')}>
          Already have an account? <Text style={styles.switchLink}>Sign In</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 60,
    backgroundColor: colors.white,
  },
  banner: {
    width: '100%',
    height: 220,
    borderBottomLeftRadius: radii.lg,
    borderBottomRightRadius: radii.lg,
  },
  brand: {
    alignSelf: 'center',
    marginTop: spacing.lg,
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.primary,
  },
  card: {
    margin: spacing.lg,
    marginTop: spacing.lg,
    backgroundColor: colors.cardBg,
    borderRadius: radii.md,
    padding: spacing.lg,
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    color: colors.black,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black,
    marginBottom: spacing.md,
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.danger,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  button: {
    marginTop: spacing.xs,
  },
  or: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.black,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchText: {
    textAlign: 'center',
    marginTop: spacing.lg,
    fontFamily: fonts.regular,
    color: colors.textMuted,
  },
  switchLink: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
  },
});
