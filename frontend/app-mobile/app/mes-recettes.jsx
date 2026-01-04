import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function MesRecettes() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Retour</Text>
      </Pressable>
      <Text style={styles.title}>🍳 Mes recettes</Text>
      <Text style={styles.subtitle}>Aucune recette enregistrée.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#0f172a' },
  back: { marginBottom: 12 },
  backText: { color: 'rgba(255,255,255,0.7)' },
  title: { color: 'white', fontSize: 24, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: 'rgba(255,255,255,0.7)' },
});