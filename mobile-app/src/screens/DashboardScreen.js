import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, radii } from '../theme/tokens';
import Card from '../components/Card';

export default function DashboardScreen({ navigation }) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>Hello 👋</Text>
      <Text style={styles.name}>Demo User</Text>

      <View style={styles.cardRow}>
        <Card bg="coral" style={styles.halfCard}>
          <Text style={styles.cardLabel}>Your QR code</Text>
          <TouchableOpacity onPress={() => navigation.navigate('QR Code')}>
            <Text style={styles.cardAction}>View →</Text>
          </TouchableOpacity>
        </Card>
        <Card bg="peri" style={styles.halfCard}>
          <Text style={styles.cardLabel}>Write NFC tag</Text>
          <TouchableOpacity onPress={() => navigation.navigate('NFCWrite')}>
            <Text style={styles.cardAction}>Write →</Text>
          </TouchableOpacity>
        </Card>
      </View>

      <Card bg="white" style={styles.statCard}>
        <View style={styles.statRow}>
          <View>
            <Text style={styles.statNum}>47</Text>
            <Text style={styles.statLabel}>Total views</Text>
          </View>
          <View>
            <Text style={styles.statNum}>+12</Text>
            <Text style={styles.statLabel}>This week</Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll:    { flex: 1, backgroundColor: colors.bgBase },
  container: { padding: spacing.lg, paddingTop: 60 },
  greeting:  { color: colors.textOnDarkMuted, fontSize: 14 },
  name:      { color: colors.textOnDark, fontSize: 28, fontWeight: '800', marginBottom: 24 },
  cardRow:   { flexDirection: 'row', gap: 12, marginBottom: 12 },
  halfCard:  { flex: 1 },
  cardLabel: { color: '#fff', fontSize: 14, fontWeight: '600', marginBottom: 12 },
  cardAction:{ color: '#fff', fontSize: 13, fontWeight: '700', opacity: 0.9 },
  statCard:  { marginBottom: 24 },
  statRow:   { flexDirection: 'row', justifyContent: 'space-around' },
  statNum:   { color: colors.textOnLight, fontSize: 28, fontWeight: '800', textAlign: 'center' },
  statLabel: { color: colors.textOnLightMuted, fontSize: 12, textAlign: 'center', marginTop: 4 },
});
