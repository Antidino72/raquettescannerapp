import { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, SafeAreaView,
  TextInput, ActivityIndicator, RefreshControl,
} from 'react-native';
import { useRubbers } from '../hooks/useRubbers';
import { RubberCard } from '../components/RubbersCards';

export default function RubbersScreen() {
  const { rubbers, loading, error, refresh } = useRubbers();
  const [query, setQuery] = useState('');

  const filtered = rubbers.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.product.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q)
    );
  });

  return (
    <SafeAreaView style={styles.screen}>
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher un rubber..."
        placeholderTextColor="#9ca3af"
        value={query}
        onChangeText={setQuery}
        clearButtonMode="while-editing"
      />

      {error && (
        <Text style={styles.errorBanner}>⚠ {error} — données en cache</Text>
      )}

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.appr_code}
        renderItem={({ item }) => <RubberCard item={item} />}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        // Pull-to-refresh
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen:      { flex: 1, backgroundColor: '#f9fafb' },
  searchBar: {
    margin: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#e5e7eb',
    fontSize: 15,
    color: '#111827',
  },
  list:        { paddingHorizontal: 12, paddingBottom: 12, gap: 10 },
  errorBanner: { marginHorizontal: 12, marginBottom: 8, fontSize: 13, color: '#ef4444' },
});