import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '../theme/tokens';
import Card from '../components/Card';

const barData = [128, 276, 346, 400, 310, 118];
const maxVal  = Math.max(...barData);

export default function StatsScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Stats</Text>

      <Card style={styles.chartCard}>
        <View style={styles.bars}>
          {barData.map((val, i) => (
            <View key={i} style={styles.barCol}>
              <Text style={styles.barLabel}>{val}</Text>
              <View style={[styles.bar, { height: (val / maxVal) * 140 }, val === maxVal && styles.barPeak]} />
            </View>
          ))}
        </View>
      </Card>

      <View style={styles.statGrid}>
        {[
          ['1.2k', 'Total views'],
          ['+18%', 'vs last month'],
          ['340',  'NFC taps'],
          ['98%',  'Scan success'],
        ].map(([num, label], i) => (
          <Card key={i} bg="white" style={styles.statBox}>
            <Text style={styles.statNum}>{num}</Text>
            <Text style={styles.statLabel}>{label}</Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll:    { flex: 1, backgroundColor: colors.bgBase },
  container: { padding: spacing.lg, paddingTop: 60 },
  title:     { color: colors.textOnDark, fontSize: 24, fontWeight: '800', marginBottom: 24 },
  chartCard: { marginBottom: 20 },
  bars:      { flexDirection: 'row', alignItems: 'flex-end', height: 160, gap: 8 },
  barCol:    { flex: 1, alignItems: 'center' },
  bar:       { width: '100%', borderRadius: 6, backgroundColor: colors.accentCoral },
  barPeak:   { backgroundColor: '#0c0c0c' },
  barLabel:  { color: colors.textOnDark, fontSize: 11, fontWeight: '700', marginBottom: 4 },
  statGrid:  { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statBox:   { width: '47%', alignItems: 'center', padding: 18 },
  statNum:   { color: colors.textOnLight, fontSize: 26, fontWeight: '800' },
  statLabel: { color: colors.textOnLightMuted, fontSize: 12, marginTop: 4 },
});
