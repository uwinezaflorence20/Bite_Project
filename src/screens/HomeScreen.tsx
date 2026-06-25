import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radii, spacing } from '../theme/colors';
import { fonts } from '../theme/typography';
import { homeCategories, fries } from '../data/food';
import { RootStackParamList } from '../navigation/types';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeCategory, setActiveCategory] = useState('Food');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <Pressable onPress={() => navigation.navigate('Browse')}>
          <Ionicons name="menu" size={24} color={colors.black} />
        </Pressable>
        <Text style={styles.brand}>Foodgo</Text>
        <Ionicons name="location-outline" size={24} color={colors.black} />
      </View>

      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=700&q=80' }}
        style={styles.heroBanner}
      />

      <View style={styles.categoryRow}>
        {homeCategories.map((c) => (
          <Pressable
            key={c}
            onPress={() => setActiveCategory(c)}
            style={[styles.categoryChip, activeCategory === c && styles.categoryChipActive]}
          >
            <Text style={[styles.categoryText, activeCategory === c && styles.categoryTextActive]}>{c}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Popular near you</Text>
      <View style={styles.popularRow}>
        {fries.map((item) => (
          <Pressable
            key={item.id}
            style={styles.popularCard}
            onPress={() => navigation.navigate('FoodDetail', { id: '1' })}
          >
            <Image source={{ uri: item.image }} style={styles.popularImage} />
            <Text style={styles.popularTitle}>{item.name}</Text>
            <View style={styles.popularRowBottom}>
              <Text style={styles.popularPrice}>${item.price}</Text>
              <Text style={styles.popularCode}>{item.code}</Text>
            </View>
          </Pressable>
        ))}
      </View>
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
    paddingBottom: 120,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  brand: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.primary,
  },
  heroBanner: {
    width: '100%',
    height: 216,
    borderRadius: radii.md,
    marginBottom: spacing.lg,
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
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.textSecondary,
  },
  categoryTextActive: {
    color: colors.white,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  popularRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  popularCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borderMid,
    borderRadius: radii.md,
    padding: 9,
  },
  popularImage: {
    width: '100%',
    height: 107,
    borderRadius: radii.md,
    marginBottom: 8,
  },
  popularTitle: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.black,
    marginBottom: 8,
  },
  popularRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popularPrice: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.black,
  },
  popularCode: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.black,
  },
});
