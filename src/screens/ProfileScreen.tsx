import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../theme/colors';
import { fonts } from '../theme/typography';

const menuItems: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: 'document-text-outline', label: 'Document' },
  { icon: 'bookmark-outline', label: 'Book Marks' },
  { icon: 'location-outline', label: 'Live Location' },
  { icon: 'download-outline', label: 'Download' },
  { icon: 'settings-outline', label: 'Settings' },
];

export default function ProfileScreen() {
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
        <View style={styles.actionPill}>
          <Ionicons name="bicycle-outline" size={14} color={colors.white} />
          <Text style={styles.actionPillText}>Your Profile</Text>
        </View>
        <View style={[styles.actionPill, styles.saveButton]}>
          <Ionicons name="bicycle-outline" size={14} color={colors.white} />
          <Text style={styles.actionPillText}>Save</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.menuList}>
        {menuItems.map((item) => (
          <View key={item.label} style={styles.menuRow}>
            <Ionicons name={item.icon} size={22} color={colors.black} />
            <Text style={styles.menuLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      <Text style={styles.contactTitle}>Contact</Text>
      <Text style={styles.contactLine}>+250-791-348-662</Text>
      <Text style={styles.contactLine}>+250-791-348-662</Text>
      <Text style={styles.contactLine}>Kigali Rwanda</Text>
      <Text style={styles.footer}>@ 2024 Bites</Text>
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
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 89,
    height: 85,
    borderRadius: radii.pill,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  saveButton: {
    paddingHorizontal: 20,
  },
  actionPillText: {
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
    gap: spacing.lg,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuLabel: {
    fontFamily: fonts.regular,
    fontSize: 16,
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
    fontSize: 16,
    color: colors.black,
    marginBottom: spacing.md,
  },
  footer: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black,
    marginTop: spacing.sm,
  },
});
