import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function RubberCard({ item }) {
  const isExpired = item.expires_on
    ? new Date(item.expires_on) < new Date()
    : false;

  const isRed = item.top_sheet_colors?.toLowerCase().includes('red');
  const isBlack = item.top_sheet_colors?.toLowerCase().includes('black');

  return (
    <View style={styles.card}>

      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.product}>{item.product}</Text>
          <Text style={styles.brand}>{item.brand}</Text>
        </View>
        <View style={styles.dots}>
          {isRed   && <View style={[styles.dot, { backgroundColor: '#ef4444' }]} />}
          {isBlack && <View style={[styles.dot, { backgroundColor: '#1f2937' }]} />}
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <Text style={styles.label}>Code</Text>
        <Text style={styles.value}>{item.appr_code}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Type</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.pimple_type}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Expire</Text>
        <Text style={[styles.value, isExpired && styles.expired]}>
          {item.expires_on ?? '—'}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#e5e7eb',
    padding: 14,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  headerText: { flex: 1 },
  product:    { fontSize: 16, fontWeight: '600', color: '#111827' },
  brand:      { fontSize: 13, color: '#6b7280', marginTop: 2 },

  dots:       { flexDirection: 'row', gap: 6, paddingTop: 2 },
  dot:        { width: 12, height: 12, borderRadius: 99 },

  divider:    { height: 0.5, backgroundColor: '#e5e7eb', marginBottom: 10 },

  infoRow:    {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  label:      { fontSize: 13, color: '#6b7280' },
  value:      { fontSize: 13, fontWeight: '500', color: '#111827' },
  expired:    { color: '#ef4444' },

  badge: {
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText:  { fontSize: 12, fontWeight: '500', color: '#374151' },
});