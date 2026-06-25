import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../theme/colors';
import { fonts } from '../theme/typography';
import PrimaryButton from '../components/PrimaryButton';
import ScreenHeader from '../components/ScreenHeader';

export default function PaymentScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader title="Payment" />

      <View style={styles.optionRow}>
        <Ionicons name="location-outline" size={22} color={colors.black} />
        <Text style={styles.optionLabel}>See where the Product</Text>
        <Ionicons name="chevron-forward" size={18} color={colors.black} style={styles.chevron} />
      </View>
      <View style={styles.divider} />

      <View style={styles.optionRow}>
        <Ionicons name="card-outline" size={22} color={colors.black} />
        <Text style={styles.optionLabel}>Payment</Text>
        <Ionicons name="chevron-forward" size={18} color={colors.black} style={styles.chevron} />
      </View>
      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Details</Text>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>The Price</Text>
        <Text style={styles.detailValue}>3452</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Quantity</Text>
        <Text style={styles.detailValue}>3452</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Location</Text>
        <Text style={styles.detailValue}>Kigali Rwanda</Text>
      </View>

      <PrimaryButton label="Continue" icon="bicycle-outline" style={styles.continueButton} />
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
    paddingBottom: 60,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  optionLabel: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black,
  },
  chevron: {
    marginLeft: 'auto',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
  },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.black,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  detailLabel: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black,
  },
  detailValue: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black,
  },
  continueButton: {
    marginTop: spacing.lg,
  },
});
