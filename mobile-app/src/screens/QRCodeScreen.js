import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { colors, spacing, radii } from '../theme/tokens';
import Card from '../components/Card';
import Button from '../components/Button';

export default function QRCodeScreen() {
  const profileUrl = 'https://scanbynexlink.com/p/a7f3k9';

  const handleShare = async () => {
    try {
      await Share.share({ message: profileUrl });
    } catch (e) { /* user cancelled */ }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your QR Code</Text>

      <Card bg="white" style={styles.qrCard}>
        {/* TODO: Replace with <QRCode value={profileUrl} /> once deps installed */}
        <View style={styles.qrPlaceholder}>
          <Text style={styles.qrText}>QR</Text>
        </View>
        <Text style={styles.url}>{profileUrl}</Text>
      </Card>

      <View style={styles.actions}>
        <Button title="Share card" onPress={handleShare} />
        <Button title="Copy link" variant="outline" onPress={() => {}} style={{ marginTop: 12 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: colors.bgBase, padding: spacing.lg, paddingTop: 60 },
  title:         { color: colors.textOnDark, fontSize: 24, fontWeight: '800', marginBottom: 24, textAlign: 'center' },
  qrCard:        { alignItems: 'center', padding: 32 },
  qrPlaceholder: { width: 200, height: 200, backgroundColor: '#f2f2f2', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  qrText:        { color: colors.textOnLightMuted, fontSize: 32, fontWeight: '700' },
  url:           { color: colors.textOnLightMuted, fontSize: 12, textAlign: 'center' },
  actions:       { marginTop: 28 },
});
