import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '../theme/tokens';
import Input from '../components/Input';
import Button from '../components/Button';
import Header from '../components/Header';

export default function SignUpScreen({ navigation }) {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // TODO: Supabase auth
    navigation.replace('ProfileSetup');
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Header title="Create your card" subtitle="Sign up free — takes under 2 minutes" />

      <View style={styles.card}>
        <Input label="Full name" value={name} onChangeText={setName} placeholder="Your name" />
        <Input label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" />
        <Input label="Password" value={password} onChangeText={setPassword} placeholder="At least 8 characters" secureTextEntry />
        <Button title="Create account" onPress={handleSignUp} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>Log in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll:     { flex: 1, backgroundColor: colors.bgBase },
  container:  { padding: spacing.lg, paddingTop: 80 },
  card:       { backgroundColor: colors.bgCardDark, borderRadius: radii.lg, padding: 28, borderWidth: 0.5, borderColor: colors.border, marginTop: 24 },
  footer:     { flexDirection: 'row', justifyContent: 'center', marginTop: 28 },
  footerText: { color: colors.textOnDarkMuted, fontSize: 14 },
  footerLink: { color: colors.accentCoral, fontSize: 14, fontWeight: '600' },
});
