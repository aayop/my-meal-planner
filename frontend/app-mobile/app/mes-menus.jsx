import { View, Text, StyleSheet, Pressable, FlatList, Image } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { recipes } from '../services/recipes';
import { Colors } from '../constants/theme';

export default function MesMenus() {
  const router = useRouter();
  const [menus, setMenus] = useState([]);

  const loadMenus = async () => {
    try {
      const raw = await AsyncStorage.getItem('menus');
      const parsed = raw ? JSON.parse(raw) : [];
      setMenus(parsed);
    } catch (e) {
      console.error('Failed to load menus', e);
    }
  };

  useEffect(() => {
    (async () => {
      // load local menus first
      await loadMenus();
      // then attempt to load from Firestore and merge
      try {
        const remote = await import('../services/firebase').then(m => m.loadMenusFromFirestore());
        if (remote && remote.length > 0) {
          // Merge without duplicates (by createdAt)
          const merged = [...remote, ...menus].filter((v, i, a) => a.findIndex(x => x.createdAt === v.createdAt) === i);
          setMenus(merged);
        }
      } catch (e) {
        console.warn('Failed to load remote menus', e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Retour</Text>
      </Pressable>
      <Text style={styles.title}>📋 Mes menus</Text>

      {menus.length === 0 ? (
        <Text style={styles.subtitle}>Aucun menu généré pour l'instant.</Text>
      ) : (
        <FlatList
          data={menus}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            // find a representative image from first meal
            const firstMeal = item.items?.[0]?.meals?.[0];
            const recipe = recipes.find(r => r.name === (firstMeal?.name)) || {}; 

            return (
              <View style={styles.card}>
                <View style={styles.cardRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{new Date(item.createdAt).toLocaleString()}</Text>
                    <Text style={styles.cardSubtitle}>Budget: {item.budget} MAD • Avg: {item.averageDailyCost || item.averageDailyCost} MAD</Text>
                  </View>

                  {recipe.image ? (
                    <Image source={{ uri: recipe.image }} style={styles.thumbnail} />
                  ) : null}
                </View>

                {item.items.map((d, di) => (
                  <View key={`${item.id}-${d.day}-${di}`} style={{ marginTop: 12 }}>
                    <Text style={styles.dayTitle}>{d.day} — Total: {d.totalCost} MAD • Calories: {d.totalCalories || '—'}</Text>
                    {d.meals.map((m, mi) => (
                      <Text key={`${m.id}-${mi}-${d.day}`} style={styles.dayText}>• {m.name} — {m.cost} MAD • {m.calories || '—'} kcal</Text>
                    ))}
                  </View>
                ))}
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: Colors.light.background || '#F8FAFC' },
  back: { marginBottom: 12 },
  backText: { color: Colors.light.muted },
  title: { color: Colors.light.text, fontSize: 24, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: Colors.light.muted },
  card: { backgroundColor: Colors.light.card, padding: 14, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width:0, height:6 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 3 },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  thumbnail: { width: 86, height: 64, borderRadius: 8 },
  cardTitle: { color: Colors.light.text, fontWeight: '700' },
  cardSubtitle: { color: Colors.light.muted, marginBottom: 8 },
  dayTitle: { color: Colors.light.text, fontWeight: '600' },
  dayText: { color: Colors.light.muted },
});