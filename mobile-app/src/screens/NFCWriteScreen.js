import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme/tokens';
import Button from '../components/Button';

export default function NFCWriteScreen({ navigation }) {
  const [status, setStatus] = useState('ready'); // 'ready' | 'writing' | 'success' | 'error'

  const handleWrite = () => {
    setStatus('writing');
    // TODO: Use expo-nfc to write tag
    setTimeout(() => setStatus('success'), 2000); // Simulated
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Write NFC Tag</Text>

      {status === 'ready' && (
        <>
          <Text style={styles.instruction}>Hold your phone near a blank NFC tag to program it with your profile link.</Text>
          <Button title="Write tag" onPress={handleWrite} style={{ marginTop: 32 }} />
        </>
      )}

      {status === 'writing' && (
        <Text style={styles.status}>Scanning… hold your phone near the tag</Text>
      )}

      {status === 'success' && (
        <>
          <Text style={[styles.status, { color: colors.accentCoral }]}>✓ Tag programmed!</Text>
          <Button title="Done" onPress={() => navigation.goBack()} style={{ marginTop: 24 }} />
        </>
      )}

      {status === 'error' && (
        <>
          <Text style={[styles.status, { color: '#f44' }]}>Tag not found — try again</Text>
          <Button title="Retry" onPress={() => setStatus('ready')} style={{ marginTop: 24 }} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: colors.bgBase, padding: spacing.lg, paddingTop: 80, alignItems: 'center' },
  title:       { color: colors.textOnDark, fontSize: 24, fontWeight: '800', marginBottom: 24 },
  instruction: { color: colors.textOnDarkMuted, fontSize: 16, textAlign: 'center', lineHeight: 24, maxWidth: 280 },
  status:      { color: colors.textOnDark, fontSize: 18, fontWeight: '600', marginTop: 32, textAlign: 'center' },
});
