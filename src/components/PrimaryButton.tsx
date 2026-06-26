import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '../theme/colors';
import { fonts } from '../theme/typography';

type Props = {
  label: string;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  variant?: 'primary' | 'dark';
  loading?: boolean;
  disabled?: boolean;
};

export default function PrimaryButton({
  label,
  onPress,
  icon,
  style,
  variant = 'primary',
  loading = false,
  disabled = false,
}: Props) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      style={[
        styles.button,
        { backgroundColor: variant === 'primary' ? colors.primary : colors.black },
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} style={styles.icon} />
      ) : (
        icon && <Ionicons name={icon} size={18} color={colors.white} style={styles.icon} />
      )}
      <Text style={styles.label}>{loading ? 'Please wait...' : label}</Text>
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
  disabled: {
    opacity: 0.6,
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
