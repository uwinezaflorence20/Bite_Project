import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radii, spacing } from '../theme/colors';
import { fonts } from '../theme/typography';
import { RootStackParamList } from '../navigation/types';
import { useCart, CartLine } from '../context/CartContext';
import PrimaryButton from '../components/PrimaryButton';
import EmptyState from '../components/EmptyState';

export default function CartScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { items, removeItem, updateQty, subtotal, deliveryFee, total } = useCart();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Your Cart</Text>
        <View style={styles.cartIconWrap}>
          <Ionicons name="cart" size={18} color={colors.primary} />
        </View>
      </View>

      {items.length === 0 ? (
        <EmptyState
          icon="cart-outline"
          title="Your cart is empty"
          message="Browse the menu and add something delicious."
        />
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }: { item: CartLine }) => (
              <View style={styles.row}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.code} numberOfLines={1}>{item.code}</Text>
                  <Text style={styles.price}>${(item.price * item.qty).toFixed(2)}</Text>
                </View>
                <Pressable onPress={() => removeItem(item.id)} style={styles.closeButton} hitSlop={8}>
                  <Ionicons name="close" size={16} color={colors.textMuted} />
                </Pressable>
                <View style={styles.qtyBox}>
                  <Pressable onPress={() => updateQty(item.id, -1)} hitSlop={8}>
                    <Text style={styles.qtySign}>-</Text>
                  </Pressable>
                  <Text style={styles.qtyValue}>{item.qty}</Text>
                  <Pressable onPress={() => updateQty(item.id, 1)} hitSlop={8}>
                    <Text style={styles.qtySign}>+</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery fee</Text>
              <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryTotalRow]}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>

          <PrimaryButton
            label="Continue to Payment"
            icon="bicycle-outline"
            style={styles.continueButton}
            onPress={() => navigation.navigate('Payment')}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.black,
  },
  cartIconWrap: {
    width: 34,
    height: 34,
    borderRadius: radii.sm,
    backgroundColor: colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    position: 'relative',
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: radii.md,
  },
  info: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.black,
  },
  code: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  price: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.primary,
    marginTop: 6,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.borderMid,
    borderRadius: radii.sm,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  qtySign: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.black,
  },
  qtyValue: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.black,
  },
  summary: {
    backgroundColor: colors.cardBg,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
  },
  summaryValue: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.black,
  },
  summaryTotalRow: {
    marginBottom: 0,
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  summaryTotalLabel: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.black,
  },
  summaryTotalValue: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.primary,
  },
  continueButton: {
    marginBottom: spacing.lg,
  },
});
