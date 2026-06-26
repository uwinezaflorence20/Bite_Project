import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radii, spacing } from '../theme/colors';
import { fonts } from '../theme/typography';
import { RootStackParamList } from '../navigation/types';

const menuItems: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: 'document-text-outline', label: 'Order history' },
  { icon: 'bookmark-outline', label: 'Saved addresses' },
  { icon: 'location-outline', label: 'Live location' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'settings-outline', label: 'Settings' },
];

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Profile</Text>
        <Ionicons name="person-circle-outline" size={22} color={colors.black} />
      </View>

      <View style={styles.profileRow}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={36} color={colors.textLight} />
        </View>
        <View style={styles.nameBlock}>
          <Text style={styles.name}>Foodie</Text>
          <Text style={styles.email}>ndinayo_223011982@stud.ur.ac.rw</Text>
        </View>
      </View>

      <Pressable style={styles.editPill}>
        <Ionicons name="create-outline" size={14} color={colors.white} />
        <Text style={styles.editPillText}>Edit profile</Text>
      </Pressable>

      <View style={styles.divider} />

      <View style={styles.menuList}>
        {menuItems.map((item) => (
          <Pressable key={item.label} style={styles.menuRow}>
            <View style={styles.menuIconWrap}>
              <Ionicons name={item.icon} size={18} color={colors.primary} />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textLight} />
          </Pressable>
        ))}
      </View>

      <View style={styles.divider} />

      <Text style={styles.contactTitle}>Contact</Text>
      <Text style={styles.contactLine}>+250-791-348-662</Text>
      <Text style={styles.contactLine}>Kigali, Rwanda</Text>

      <Pressable
        style={styles.logoutRow}
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Landing' }] })}
      >
        <Ionicons name="log-out-outline" size={18} color={colors.danger} />
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>

      <Text style={styles.footer}>© 2026 Foodgo</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: 60,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.black,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: radii.pill,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameBlock: {
    flex: 1,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.black,
    marginBottom: 4,
  },
  email: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
  editPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: spacing.lg,
  },
  editPillText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.lg,
  },
  menuList: {
    gap: spacing.md,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuIconWrap: {
    width: 34,
    height: 34,
    borderRadius: radii.sm,
    backgroundColor: colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.black,
  },
  contactTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.black,
    marginBottom: spacing.md,
  },
  contactLine: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: spacing.lg,
  },
  logoutText: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.danger,
  },
  footer: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textLight,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
});
