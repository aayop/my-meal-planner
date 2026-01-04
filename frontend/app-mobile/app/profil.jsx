import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/theme';

export default function Profil() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('profile');
        if (raw) setProfile(JSON.parse(raw));

        // attempt to load remote profile and merge
        try {
          const { isSyncEnabled } = await import('../services/sync');
          const enabled = await isSyncEnabled();
          if (enabled) {
            const remote = await import('../services/firebase').then(m => m.loadProfileFromFirestore());
            if (remote) setProfile((p) => ({ ...(p || {}), ...remote }));
          }
        } catch (e) {
          console.warn('Failed to load remote profile', e);
        }
      } catch (e) {
        console.error('Failed to load profile', e);
      }
    })();
  }, []);

  const [syncEnabled, setSyncEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { isSyncEnabled } = await import('../services/sync');
        const enabled = await isSyncEnabled();
        setSyncEnabled(enabled);
      } catch (e) {
        console.warn('Failed to load sync flag', e);
      }
    })();
  }, []);

  const toggleSync = async () => {
    const { setSyncEnabled } = await import('../services/sync');
    await setSyncEnabled(!syncEnabled);
    setSyncEnabled(!syncEnabled);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Retour</Text>
      </Pressable>
      <Text style={styles.title}>👤 Mon profil</Text>

      {profile ? (
        <View style={styles.profileCard}>
          <Image source={{ uri: profile.avatar || 'https://source.unsplash.com/200x200/?chef' }} style={styles.avatar} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.name}>{profile.name || 'Utilisateur'}</Text>
            <Text style={styles.info}>{profile.email}</Text>
            <Pressable onPress={() => router.push('/profil-edit')} style={[styles.editBtn, { marginTop: 8 }] }>
              <Text style={styles.editText}>Modifier le profil</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.subtitle}>Aucun profil configuré.</Text>
          <Pressable onPress={() => router.push('/profil-edit')} style={styles.editBtn}>
            <Text style={styles.editText}>Configurer le profil</Text>
          </Pressable>
        </View>
      )}

      <View style={{ marginTop: 24 }}>
        <Text style={{ color: Colors.light.muted, marginBottom: 8 }}>Synchronisation cloud</Text>
        <Pressable onPress={toggleSync} style={[styles.editBtn, { backgroundColor: syncEnabled ? '#10b981' : '#6b7280' }]}>
          <Text style={styles.editText}>{syncEnabled ? 'Synchronisation activée' : 'Activer la synchronisation'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: Colors.light.background || '#F8FAFC' },
  back: { marginBottom: 12 },
  backText: { color: Colors.light.muted },
  title: { color: Colors.light.text, fontSize: 24, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: Colors.light.muted },
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.card, padding: 14, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 4 },
  avatar: { width: 78, height: 78, borderRadius: 78, backgroundColor: '#eee' },
  name: { color: Colors.light.text, fontSize: 18, fontWeight: '700' },
  info: { color: Colors.light.muted, marginBottom: 6 },
  editBtn: { marginTop: 12, backgroundColor: Colors.light.tint, padding: 12, borderRadius: 10, alignItems: 'center' },
  editText: { color: 'white', fontWeight: '700' },
});