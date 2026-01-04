import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { saveMenuToFirestore, saveProfileToFirestore } from './firebase';

const QUEUE_KEY = 'syncQueue';
const SYNC_FLAG = 'syncEnabled';

export async function isSyncEnabled() {
  const raw = await AsyncStorage.getItem(SYNC_FLAG);
  return raw === 'true';
}

export async function setSyncEnabled(value) {
  await AsyncStorage.setItem(SYNC_FLAG, value ? 'true' : 'false');
  if (value) {
    // Try to process queue immediately when enabling
    processQueue();
  }
}

export async function enqueue(operation) {
  // operation: { type: 'menu'|'profile', payload }
  const raw = await AsyncStorage.getItem(QUEUE_KEY);
  const queue = raw ? JSON.parse(raw) : [];
  queue.push(operation);
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export async function getQueue() {
  const raw = await AsyncStorage.getItem(QUEUE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function clearQueue() {
  await AsyncStorage.removeItem(QUEUE_KEY);
}

export async function processQueue() {
  const enabled = await isSyncEnabled();
  if (!enabled) return;

  const state = await NetInfo.fetch();
  if (!state.isConnected) return;

  // If there is no signed-in Firebase user, skip processing now to avoid repeated "No user id" errors
  try {
    const { getUserId } = await import('./firebase');
    const uid = await getUserId();
    if (!uid) {
      console.warn('No authenticated user — skipping sync queue processing (will retry later)');
      return;
    }
  } catch (e) {
    console.warn('Could not verify auth status — skipping sync (will retry later)', e);
    return;
  }

  const queue = await getQueue();
  if (!queue.length) return;

  const remaining = [];
  for (const op of queue) {
    try {
      console.log('Processing sync op', op.type, op.payload && op.payload.id);
      if (op.type === 'menu') {
        await saveMenuToFirestore(op.payload);
        console.log('Synced menu', op.payload.id);
      } else if (op.type === 'profile') {
        await saveProfileToFirestore(op.payload);
        console.log('Synced profile');
      }
    } catch (e) {
      // If any operation fails, keep it in remaining queue
      console.warn('Sync op failed, will retry later', e);
      remaining.push(op);
    }
  }

  if (remaining.length) {
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
  } else {
    await clearQueue();
  }
}

// Listen to network changes and automatically process when back online
let _listenerSetup = false;
export function setupNetworkListener() {
  if (_listenerSetup) return;
  NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      processQueue();
    }
  });
  _listenerSetup = true;
}