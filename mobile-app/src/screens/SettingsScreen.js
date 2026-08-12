import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { colors, spacing, radii } from '../theme/tokens';

function SettingsRow({ label, onPress, destructive }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <Text style={[styles.rowText, destructive && styles.destructive]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function SettingsScreen({ navigation }) {
  const handleLogout = () => {
    // TODO: Supabase signOut
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  };

  const handleDelete = () => {
    Alert.alert('Delete account', 'This will permanently remove all your data. Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => { /* TODO: DELETE /api/profiles/me */ } },
    ]);
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <SettingsRow label="Edit profile" onPress={() => {}} />
        <SettingsRow label="Change password" onPress={() => {}} />
        <SettingsRow label="Privacy policy" onPress={() => {}} />
        <SettingsRow label="Terms of service" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <SettingsRow label="Log out" onPress={handleLogout} />
        <SettingsRow label="Delete account" onPress={handleDelete} destructive />
      </View>

      <Text style={styles.version}>ScanByNexlink v0.1.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll:    { flex: 1, backgroundColor: colors.bgBase },
  container: { padding: spacing.lg, paddingTop: 60 },
  title:     { color: colors.textOnDark, fontSize: 24, fontWeight: '800', marginBottom: 24 },
  section:   { backgroundColor: colors.bgCardDark, borderRadius: radii.lg, borderWidth: 0.5, borderColor: colors.border, marginBottom: 20, overflow: 'hidden' },
  row:       { padding: 18, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  rowText:   { color: colors.textOnDark, fontSize: 15 },
  destructive: { color: '#f44' },
  version:   { color: colors.textOnDarkMuted, fontSize: 12, textAlign: 'center', marginTop: 32 },
});
