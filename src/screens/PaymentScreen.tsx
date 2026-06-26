import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radii, spacing } from '../theme/colors';
import { fonts } from '../theme/typography';
import { RootStackParamList } from '../navigation/types';
import { useCart } from '../context/CartContext';
import PrimaryButton from '../components/PrimaryButton';
import ScreenHeader from '../components/ScreenHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;

const paymentMethods: { id: string; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'cash', label: 'Cash on delivery', icon: 'cash-outline' },
  { id: 'card', label: 'Credit / Debit card', icon: 'card-outline' },
];

export default function PaymentScreen({ navigation }: Props) {
  const { items, subtotal, deliveryFee, total, clear } = useCart();
  const [method, setMethod] = useState('cash');
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);

  const handlePlaceOrder = () => {
    if (!items.length) return;
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setPlaced(true);
      clear();
    }, 1200);
  };

  if (placed) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIconCircle}>
          <Ionicons name="checkmark" size={40} color={colors.white} />
        </View>
        <Text style={styles.successTitle}>Order placed!</Text>
        <Text style={styles.successMessage}>
          Your order is being prepared and will be on its way shortly.
        </Text>
        <PrimaryButton
          label="Back to Home"
          icon="home-outline"
          style={styles.successButton}
          onPress={() => navigation.navigate('Main', { screen: 'Home' })}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader title="Payment" />

      <View style={styles.optionRow}>
        <Ionicons name="location-outline" size={22} color={colors.black} />
        <Text style={styles.optionLabel}>Kigali, Nyarugenge</Text>
        <Ionicons name="chevron-forward" size={18} color={colors.black} style={styles.chevron} />
      </View>
      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Payment method</Text>
      {paymentMethods.map((m) => (
        <View key={m.id} style={styles.methodRow} onTouchEnd={() => setMethod(m.id)}>
          <Ionicons name={m.icon} size={20} color={colors.black} />
          <Text style={styles.optionLabel}>{m.label}</Text>
          <Ionicons
            name={method === m.id ? 'radio-button-on' : 'radio-button-off'}
            size={20}
            color={method === m.id ? colors.primary : colors.borderMid}
          />
        </View>
      ))}
      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Order summary</Text>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Items ({items.reduce((s, i) => s + i.qty, 0)})</Text>
        <Text style={styles.detailValue}>${subtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Delivery fee</Text>
        <Text style={styles.detailValue}>${deliveryFee.toFixed(2)}</Text>
      </View>
      <View style={[styles.detailRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>

      <PrimaryButton
        label="Place order"
        icon="bicycle-outline"
        style={styles.continueButton}
        loading={placing}
        disabled={!items.length}
        onPress={handlePlaceOrder}
      />
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
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  optionLabel: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.black,
  },
  chevron: {
    marginLeft: 'auto',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.black,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
  },
  detailValue: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.black,
  },
  totalRow: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  totalLabel: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.black,
  },
  totalValue: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.primary,
  },
  continueButton: {
    marginTop: spacing.lg,
  },
  successContainer: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  successIconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  successTitle: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  successMessage: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  successButton: {
    width: '100%',
  },
});
