import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, radii } from '../theme/tokens';

/**
 * Reusable card — dark surface with subtle border.
 * Pass `bg` to override (e.g. 'coral', 'peri', 'white').
 */
export default function Card({ children, bg, style }) {
  const backgroundColor =
    bg === 'coral' ? colors.accentCoral :
    bg === 'peri'  ? colors.accentPeri  :
    bg === 'white' ? colors.surfaceWhite :
    colors.bgCardDark;

  return (
    <View style={[styles.card, { backgroundColor }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    padding: 24,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
});
