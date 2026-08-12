import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors, radii } from '../theme/tokens';

/**
 * Labeled text input — matches the auth form styling.
 */
export default function Input({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType }) {
  return (
    <View style={styles.group}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#555"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: 18 },
  label: {
    color: colors.textOnDarkMuted,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.bgBase,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 14,
    padding: 14,
    color: colors.textOnDark,
    fontSize: 15,
  },
});
