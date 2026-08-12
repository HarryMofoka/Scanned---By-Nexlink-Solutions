import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '../theme/tokens';
import Input from '../components/Input';
import Button from '../components/Button';
import Header from '../components/Header';

export default function LoginScreen({ navigation }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Supabase auth
    navigation.replace('Main');
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Header title="Welcome back" subtitle="Log in to manage your card" />

      <View style={styles.card}>
        <Input label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" />
        <Input label="Password" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
        <Button title="Log in" onPress={handleLogin} />

        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.footerLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll:     { flex: 1, backgroundColor: colors.bgBase },
  container:  { padding: spacing.lg, paddingTop: 80 },
  card:       { backgroundColor: colors.bgCardDark, borderRadius: radii.lg, padding: 28, borderWidth: 0.5, borderColor: colors.border, marginTop: 24 },
  linkRow:    { alignItems: 'center', marginTop: 16 },
  linkText:   { color: colors.accentCoral, fontSize: 14 },
  footer:     { flexDirection: 'row', justifyContent: 'center', marginTop: 28 },
  footerText: { color: colors.textOnDarkMuted, fontSize: 14 },
  footerLink: { color: colors.accentCoral, fontSize: 14, fontWeight: '600' },
});
