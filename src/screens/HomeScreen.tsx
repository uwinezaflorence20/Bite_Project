import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radii, spacing } from '../theme/colors';
import { fonts } from '../theme/typography';
import { homeCategories, foods } from '../data/food';
import { RootStackParamList } from '../navigation/types';
import FoodCard from '../components/FoodCard';

const categoryIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  Food: 'fast-food-outline',
  Drink: 'cafe-outline',
  'Take away': 'bag-handle-outline',
  Stake: 'restaurant-outline',
};

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeCategory, setActiveCategory] = useState('Food');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topRow}>
        <Pressable onPress={() => navigation.navigate('Browse')} style={styles.iconButton}>
          <Ionicons name="menu" size={22} color={colors.black} />
        </Pressable>

        <Pressable style={styles.locationPill}>
          <Ionicons name="location-outline" size={14} color={colors.primary} />
          <Text style={styles.locationText} numberOfLines={1}>
            Kigali, Nyarugenge
          </Text>
          <Ionicons name="chevron-down" size={14} color={colors.textSecondary} />
        </Pressable>

        <Pressable style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={22} color={colors.black} />
          <View style={styles.notifDot} />
        </Pressable>
      </View>

      <Text style={styles.greeting}>Hey, foodie 👋</Text>
      <Text style={styles.greetingSubtitle}>What would you like to eat today?</Text>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={colors.textSecondary} />
          <Text style={styles.searchText}>Search dishes, restaurants...</Text>
        </View>
        <Pressable style={styles.filterButton}>
          <Ionicons name="options-outline" size={18} color={colors.white} />
        </Pressable>
      </View>

      <Pressable style={styles.heroCard}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=700&q=80' }}
          style={styles.heroBanner}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.75)']}
          style={styles.heroOverlay}
        >
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>30% OFF</Text>
          </View>
          <Text style={styles.heroTitle}>Today's special deal</Text>
          <Text style={styles.heroSubtitle}>Free delivery on your first order</Text>
        </LinearGradient>
      </Pressable>

      <View style={styles.categoryRow}>
        {homeCategories.map((c) => (
          <Pressable
            key={c}
            onPress={() => setActiveCategory(c)}
            style={[styles.categoryChip, activeCategory === c && styles.categoryChipActive]}
          >
            <Ionicons
              name={categoryIcons[c] ?? 'restaurant-outline'}
              size={14}
              color={activeCategory === c ? colors.white : colors.textSecondary}
            />
            <Text style={[styles.categoryText, activeCategory === c && styles.categoryTextActive]}>{c}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular near you</Text>
        <Pressable onPress={() => navigation.navigate('Browse')}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.popularRow}
      >
        {foods.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
            onPress={() => navigation.navigate('FoodDetail', { id: item.id })}
          />
        ))}
      </ScrollView>
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
    marginBottom: spacing.lg,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    maxWidth: 180,
  },
  locationText: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.black,
  },
  greeting: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.black,
    marginBottom: 2,
  },
  greetingSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.cardBg,
    borderRadius: radii.pill,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  searchText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.textSecondary,
  },
  filterButton: {
    width: 42,
    height: 42,
    borderRadius: radii.sm,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCard: {
    borderRadius: radii.md,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  heroBanner: {
    width: '100%',
    height: 180,
  },
  heroOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    paddingTop: 40,
    paddingBottom: spacing.md,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    borderRadius: radii.sm,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  heroBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: colors.white,
  },
  heroTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.white,
  },
  heroSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.white,
    marginTop: 2,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.black,
  },
  seeAll: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.primary,
  },
  popularRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingRight: spacing.md,
  },
});
