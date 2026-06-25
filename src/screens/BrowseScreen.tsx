import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radii, spacing } from '../theme/colors';
import { fonts } from '../theme/typography';
import { categories, foods } from '../data/food';
import { RootStackParamList } from '../navigation/types';
import FoodCard from '../components/FoodCard';

export default function BrowseScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Foodgo</Text>
      <Text style={styles.subtitle}>Order your favorite food</Text>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={colors.black} />
          <Text style={styles.searchText}>Search</Text>
        </View>
        <Pressable style={styles.filterButton}>
          <Ionicons name="options-outline" size={18} color={colors.white} />
        </Pressable>
      </View>

      <View style={styles.categoryRow}>
        {categories.map((c) => (
          <Pressable
            key={c}
            onPress={() => setActiveCategory(c)}
            style={[styles.categoryChip, activeCategory === c && styles.categoryChipActive]}
          >
            <Text style={[styles.categoryText, activeCategory === c && styles.categoryTextActive]}>{c}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <FoodCard item={item} onPress={() => navigation.navigate('FoodDetail', { id: item.id })} />
        )}
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
  brand: {
    fontFamily: fonts.bold,
    fontSize: 36,
    color: colors.black,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  searchText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.black,
  },
  filterButton: {
    width: 37,
    height: 37,
    borderRadius: radii.sm,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: radii.pill,
    backgroundColor: colors.chipInactive,
  },
  categoryChipActive: {
    backgroundColor: colors.accent,
  },
  categoryText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.black,
  },
  categoryTextActive: {
    color: colors.white,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  listContent: {
    paddingBottom: 120,
  },
});
