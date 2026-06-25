import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '../theme/colors';
import { fonts } from '../theme/typography';

type Props = {
  label: string;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  variant?: 'primary' | 'dark';
};

export default function PrimaryButton({ label, onPress, icon, style, variant = 'primary' }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: variant === 'primary' ? colors.primary : colors.black },
        style,
      ]}
    >
      {icon && <Ionicons name={icon} size={18} color={colors.white} style={styles.icon} />}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.pill,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
  },
});
