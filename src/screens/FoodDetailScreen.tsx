import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radii, spacing } from '../theme/colors';
import { fonts } from '../theme/typography';
import { RootStackParamList } from '../navigation/types';
import { foods } from '../data/food';
import PrimaryButton from '../components/PrimaryButton';
import ScreenHeader from '../components/ScreenHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'FoodDetail'>;

export default function FoodDetailScreen({ route }: Props) {
  const item = foods.find((f) => f.id === route.params.id) ?? foods[0];
  const [qty, setQty] = useState(2);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader title="" />
      <Image source={{ uri: item.image }} style={styles.image} />

      <Text style={styles.title}>{item.code}</Text>
      <View style={styles.metaRow}>
        <Ionicons name="star" size={20} color={colors.star} />
        <Text style={styles.rating}>{item.rating}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>

      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.spicyRow}>
        <Text style={styles.spicyLabel}>Spicy</Text>
      </View>
      <View style={styles.spicyTrack}>
        <View style={styles.spicyFill} />
        <View style={styles.spicyKnob} />
      </View>
      <View style={styles.spicyLabels}>
        <Text style={styles.spicyText}>Mad</Text>
        <Text style={styles.spicyText}>Spicy</Text>
      </View>

      <View style={styles.footerRow}>
        <View style={styles.qtyBox}>
          <Text style={styles.qtyMinus} onPress={() => setQty((q) => Math.max(1, q - 1))}>
            -
          </Text>
          <Text style={styles.qtyValue}>{qty}</Text>
          <Text style={styles.qtyPlus} onPress={() => setQty((q) => q + 1)}>
            +
          </Text>
        </View>
        <Text style={styles.price}>${(item.price * qty).toFixed(2)}</Text>
      </View>

      <PrimaryButton label="Order now" icon="bicycle-outline" variant="dark" style={styles.orderButton} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 60,
  },
  image: {
    width: '100%',
    height: 320,
    borderRadius: radii.md,
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.md,
  },
  rating: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.black,
  },
  time: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 8,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.black,
    lineHeight: 18,
    marginBottom: spacing.lg,
  },
  spicyRow: {
    marginBottom: spacing.sm,
  },
  spicyLabel: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.black,
  },
  spicyTrack: {
    height: 2,
    backgroundColor: colors.chipInactive,
    borderRadius: 2,
    marginBottom: 6,
    justifyContent: 'center',
  },
  spicyFill: {
    position: 'absolute',
    width: '60%',
    height: 2,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  spicyKnob: {
    position: 'absolute',
    left: '58%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  spicyLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  spicyText: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.black,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.black,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  qtyMinus: {
    color: colors.white,
    fontSize: 22,
    fontFamily: fonts.regular,
    paddingHorizontal: 6,
  },
  qtyPlus: {
    color: colors.white,
    fontSize: 22,
    fontFamily: fonts.regular,
    paddingHorizontal: 6,
  },
  qtyValue: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.regular,
  },
  price: {
    color: colors.white,
    fontSize: 24,
    fontFamily: fonts.regular,
  },
  orderButton: {
    backgroundColor: colors.accent,
  },
});
