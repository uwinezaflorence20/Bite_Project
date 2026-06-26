import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radii, spacing } from '../theme/colors';
import { fonts } from '../theme/typography';
import { foods, FoodItem } from '../data/food';
import { RootStackParamList } from '../navigation/types';
import { useFavorites } from '../context/FavoritesContext';
import EmptyState from '../components/EmptyState';

export default function FavoritesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const favoriteFoods = foods.filter((f) => favoriteIds.includes(f.id));

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Favorites</Text>
        <View style={styles.iconWrap}>
          <Ionicons name="heart" size={16} color={colors.primary} />
        </View>
      </View>

      {favoriteFoods.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title="No favorites yet"
          message="Tap the heart on a dish to save it here."
        />
      ) : (
        <FlatList
          data={favoriteFoods}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }: { item: FoodItem }) => (
            <Pressable
              style={styles.row}
              onPress={() => navigation.navigate('FoodDetail', { id: item.id })}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.code} numberOfLines={1}>{item.code}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={13} color={colors.star} />
                  <Text style={styles.rating}>{item.rating}</Text>
                  <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                </View>
              </View>
              <Pressable
                onPress={() => toggleFavorite(item.id)}
                style={styles.closeButton}
                hitSlop={8}
              >
                <Ionicons name="close" size={16} color={colors.textMuted} />
              </Pressable>
            </Pressable>
          )}
        />
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
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: radii.sm,
    backgroundColor: colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 120,
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
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  rating: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.black,
    marginRight: 10,
  },
  price: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.primary,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
