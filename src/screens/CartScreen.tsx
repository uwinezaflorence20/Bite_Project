import React, { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radii, spacing } from '../theme/colors';
import { fonts } from '../theme/typography';
import { cartItems as initialItems, CartItem } from '../data/food';
import { RootStackParamList } from '../navigation/types';
import PrimaryButton from '../components/PrimaryButton';

export default function CartScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const updateQty = (id: string, delta: number) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)),
    );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Cart</Text>
        <Ionicons name="cart" size={20} color={colors.black} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <Text style={styles.code}>{item.code}</Text>
            </View>
            <Pressable onPress={() => removeItem(item.id)} style={styles.closeButton}>
              <Ionicons name="close" size={18} color={colors.black} />
            </Pressable>
            <View style={styles.qtyBox}>
              <Pressable onPress={() => updateQty(item.id, -1)}>
                <Text style={styles.qtySign}>-</Text>
              </Pressable>
              <Text style={styles.qtyValue}>{item.qty}</Text>
              <Pressable onPress={() => updateQty(item.id, 1)}>
                <Text style={styles.qtySign}>+</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <PrimaryButton
        label="Continue to Payment"
        icon="bicycle-outline"
        style={styles.continueButton}
        onPress={() => navigation.navigate('Payment')}
      />
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
    fontSize: 12,
    color: colors.black,
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    position: 'relative',
  },
  image: {
    width: 138,
    height: 129,
    borderRadius: radii.md,
  },
  info: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.black,
  },
  price: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.black,
    marginTop: 6,
  },
  code: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.black,
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
  continueButton: {
    marginBottom: spacing.lg,
  },
});
