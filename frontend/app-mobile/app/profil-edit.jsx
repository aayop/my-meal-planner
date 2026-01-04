import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/theme';

export default function ProfilEdit() {
  const router = useRouter();
  const [profile, setProfile] = useState({ name: '', email: '' });

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('profile');
        if (raw) setProfile(JSON.parse(raw));
      } catch (e) {
        console.error('Failed to load profile', e);
      }
    })();
  }, []);

  const save = async () => {
    try {
      await AsyncStorage.setItem('profile', JSON.stringify(profile));
      // try to sync to Firestore or enqueue
      try {
        const { isSyncEnabled, enqueue } = await import('../services/sync');
        const enabled = await isSyncEnabled();
        const NetInfo = (await import('@react-native-community/netinfo')).default;
        const netState = await NetInfo.fetch();
        if (enabled && netState.isConnected) {
          await saveProfileToFirestore(profile);
        } else {
          await enqueue({ type: 'profile', payload: profile });
        }
      } catch (e) {
        console.warn('Profile sync failed/enqueued', e);
      }

      Alert.alert('Profil', 'Profil enregistré');
      router.back();
    } catch (e) {
      console.error('Failed to save profile', e);
      Alert.alert('Erreur', 'Impossible d\'enregistrer le profil');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier le profil</Text>

      <Text style={styles.label}>Nom</Text>
      <TextInput style={styles.input} value={profile.name} onChangeText={(t) => setProfile({ ...profile, name: t })} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={profile.email} onChangeText={(t) => setProfile({ ...profile, email: t })} />

      <Pressable style={styles.saveBtn} onPress={save}>
        <Text style={styles.saveText}>Enregistrer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: Colors.light.background },
  title: { color: Colors.light.text, fontSize: 24, fontWeight: '700', marginBottom: 12 },
  label: { color: Colors.light.muted, marginTop: 12 },
  input: { backgroundColor: Colors.light.card, padding: 12, borderRadius: 8, color: Colors.light.text, marginTop: 8 },
  saveBtn: { marginTop: 20, backgroundColor: Colors.light.tint, padding: 14, borderRadius: 12, alignItems: 'center' },
  saveText: { color: '#ffffff', fontWeight: '700' },
});