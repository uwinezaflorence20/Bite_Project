import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '../theme/colors';
import { fonts } from '../theme/typography';
import { FoodItem } from '../data/food';

export default function FoodCard({ item, onPress }: { item: FoodItem; onPress?: () => void }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
      <View style={styles.row}>
        <Ionicons name="star" size={14} color={colors.star} />
        <Text style={styles.rating}>{item.rating}</Text>
        <Ionicons name="heart-outline" size={14} color={colors.black} style={styles.heart} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 149,
    height: 230,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    padding: 9,
  },
  image: {
    width: '100%',
    height: 142,
    borderRadius: radii.md,
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.black,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  rating: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.black,
    marginLeft: 4,
  },
  heart: {
    marginLeft: 'auto',
  },
});
