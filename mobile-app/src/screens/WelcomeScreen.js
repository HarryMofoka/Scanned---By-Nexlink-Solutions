import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme/tokens';
import Button from '../components/Button';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Share your contact info{'\n'}with a single tap</Text>
        <Text style={styles.sub}>One QR code, always up to date.{'\n'}No app needed for people you share with.</Text>
      </View>
      <View style={styles.actions}>
        <Button title="Get started" onPress={() => navigation.navigate('SignUp')} />
        <Button title="Log in" variant="outline" onPress={() => navigation.navigate('Login')} style={{ marginTop: 12 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgBase, padding: spacing.lg, justifyContent: 'space-between' },
  content:   { flex: 1, justifyContent: 'center' },
  title:     { color: colors.textOnDark, fontSize: 34, fontWeight: '800', letterSpacing: -0.5, lineHeight: 40 },
  sub:       { color: colors.textOnDarkMuted, fontSize: 16, marginTop: 16, lineHeight: 24 },
  actions:   { paddingBottom: 40 },
});
