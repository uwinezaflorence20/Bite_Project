import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '../theme/colors';
import { fonts } from '../theme/typography';
import { FoodItem } from '../data/food';
import { useFavorites } from '../context/FavoritesContext';

export default function FoodCard({ item, onPress }: { item: FoodItem; onPress?: () => void }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(item.id);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
      <View style={styles.row}>
        <Ionicons name="star" size={14} color={colors.star} />
        <Text style={styles.rating}>{item.rating}</Text>
        <Pressable onPress={() => toggleFavorite(item.id)} hitSlop={8} style={styles.heart}>
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={16}
            color={favorite ? colors.primary : colors.black}
          />
        </Pressable>
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
