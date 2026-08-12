import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, radii } from '../theme/tokens';

/**
 * Reusable button — supports 'primary', 'secondary', and 'outline' variants.
 */
export default function Button({ title, onPress, variant = 'primary', style }) {
  const bg = variant === 'primary'   ? colors.accentCoral
           : variant === 'secondary' ? colors.accentPeri
           : 'transparent';

  const border = variant === 'outline' ? colors.inputBorder : bg;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.base, { backgroundColor: bg, borderColor: border }, style]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: radii.pill,
    alignItems: 'center',
    borderWidth: 1,
  },
  text: {
    color: colors.textOnDark,
    fontWeight: '700',
    fontSize: 15,
  },
});
