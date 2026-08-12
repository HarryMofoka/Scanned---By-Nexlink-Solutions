import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '../theme/tokens';
import Input from '../components/Input';
import Button from '../components/Button';
import Header from '../components/Header';

export default function ProfileSetupScreen({ navigation }) {
  const [name, setName]   = useState('');
  const [phone, setPhone] = useState('');
  const [linkedin, setLinkedin] = useState('');

  const handleCreate = () => {
    // TODO: POST /api/profiles
    navigation.replace('Main');
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Header title="Set up your card" subtitle="Add your details — skip whatever you don't need" />

      <View style={styles.card}>
        <Input label="Name" value={name} onChangeText={setName} placeholder="Your name" />
        <Input label="Phone (optional)" value={phone} onChangeText={setPhone} placeholder="+27 12 345 6789" keyboardType="phone-pad" />
        <Input label="LinkedIn URL (optional)" value={linkedin} onChangeText={setLinkedin} placeholder="https://linkedin.com/in/you" />
        <Text style={styles.hint}>You can add more links later from your dashboard.</Text>
        <Button title="Create my card" onPress={handleCreate} style={{ marginTop: 8 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll:    { flex: 1, backgroundColor: colors.bgBase },
  container: { padding: spacing.lg, paddingTop: 80 },
  card:      { backgroundColor: colors.bgCardDark, borderRadius: radii.lg, padding: 28, borderWidth: 0.5, borderColor: colors.border, marginTop: 24 },
  hint:      { color: colors.textOnDarkMuted, fontSize: 13, marginBottom: 12 },
});
