import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/tokens';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Welcome'), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>ScanByNexlink</Text>
      <Text style={styles.tagline}>Your contact card, one tap away</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgBase, alignItems: 'center', justifyContent: 'center' },
  brand:     { color: colors.textOnDark, fontSize: 32, fontWeight: '800', letterSpacing: -1 },
  tagline:   { color: colors.textOnDarkMuted, fontSize: 14, marginTop: 8 },
});
