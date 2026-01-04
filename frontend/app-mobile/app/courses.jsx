import { View, Text, StyleSheet, Pressable, FlatList, Switch } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { aggregateIngredients, prettyString } from '../services/shoppingList';
import { Colors } from '../constants/theme';

export default function Courses() {
  const router = useRouter();
  const [menu, setMenu] = useState(null);
  const [items, setItems] = useState([]);
  const [checked, setChecked] = useState({});

  const load = async () => {
    try {
      const raw = await AsyncStorage.getItem('menus');
      const menus = raw ? JSON.parse(raw) : [];
      if (menus.length === 0) {
        setMenu(null);
        return;
      }
      const latest = menus[0];
      setMenu(latest);
      const agg = aggregateIngredients(latest);
      setItems(agg);
      // load saved checked state
      const saved = await AsyncStorage.getItem('shoppingChecked');
      setChecked(saved ? JSON.parse(saved) : {});
    } catch (e) {
      console.error('Failed to load menus for courses', e);
    }
  };

  useEffect(() => { load(); }, []);

  const toggle = async (key) => {
    const next = { ...checked, [key]: !checked[key] };
    setChecked(next);
    await AsyncStorage.setItem('shoppingChecked', JSON.stringify(next));
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Retour</Text>
      </Pressable>
      <Text style={styles.title}>🛒 Courses</Text>

      {!menu ? (
        <Text style={styles.subtitle}>Aucun menu trouvé — générez un menu pour créer automatiquement une liste de courses.</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(it) => `${it.name}-${it.unit}`}
          renderItem={({ item }) => (
            <Pressable style={styles.itemRow} onPress={() => toggle(`${item.name}-${item.unit}`)}>
              <Text style={styles.itemText}>{prettyString(item)}</Text>
              <Switch value={!!checked[`${item.name}-${item.unit}`]} onValueChange={() => toggle(`${item.name}-${item.unit}`)} thumbColor={Colors.light.tint} />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: Colors.light.background },
  back: { marginBottom: 12 },
  backText: { color: Colors.light.muted },
  title: { color: Colors.light.text, fontSize: 24, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: Colors.light.muted },
  itemRow: { padding: 12, backgroundColor: Colors.light.card, borderRadius: 10, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemText: { color: Colors.light.text },
});