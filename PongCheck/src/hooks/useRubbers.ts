import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fallback from '../../assets/json/rubbers.json';


const CACHE_KEY = 'rubbers_data';
const CACHE_TTL = 1000 * 60 * 60; // 1 heure
const SERVER_URL = 'https://raw.githubusercontent.com/Antidino72/raquettescannerapp/main/rubbers.json';

type Rubber = {
  brand: string;
  product: string;
  appr_code: string;
  pimple_type: string;
  top_sheet_colors: string;
  expires_on: string | null;
};

export function useRubbers() {
  const [rubbers, setRubbers] = useState<Rubber[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        // 1. Charge le cache d'abord (affichage immédiat)
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          setRubbers(data);

          // Si le cache est encore frais, on s'arrête là
          if (Date.now() - timestamp < CACHE_TTL) {
            setLoading(false);
            return;
          }
        }

        // 2. Fetch le serveur
        const res = await fetch(SERVER_URL);
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        const data: Rubber[] = await res.json();

        // 3. Met à jour l'état et le cache
        setRubbers(data);
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({
          data,
          timestamp: Date.now(),
        }));

      } catch (e: any) {
        setError(e.message);
        // garde les données déjà chargées (cache ou fallback)
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function refresh() {
    setLoading(true);
    setError(null);
    // Vide le cache pour forcer un nouveau fetch
    await AsyncStorage.removeItem(CACHE_KEY);
    // Relance le useEffect en remontant le composant, ou rappelle load() directement
  }

  return { rubbers, loading, error, refresh };
}