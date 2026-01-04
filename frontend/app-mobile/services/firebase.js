// Firebase initializer and helpers
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';

// User-provided config
const firebaseConfig = {
  apiKey: "AIzaSyD3sDHLjdBC2wY1VZFeQStB_W3c1L1s-4w",
  authDomain: "meal-planner-app-638ed.firebaseapp.com",
  projectId: "meal-planner-app-638ed",
  storageBucket: "meal-planner-app-638ed.firebasestorage.app",
  messagingSenderId: "216182755370",
  appId: "1:216182755370:web:e3d1fe4c5037659bad7353",
  measurementId: "G-TW2N370EG6"
};

let app;
let auth;
let db;
let currentUser = null;

export function initFirebase() {
  if (!app) {
    app = initializeApp(firebaseConfig);

    // Prefer persistent auth with React Native AsyncStorage if available
    try {
      initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) });
      auth = getAuth(app);
    } catch (e) {
      // fallback to default auth if initializeAuth not available in this environment
      auth = getAuth(app);
    }

    db = getFirestore(app);

    // sign in anonymously if no user
    onAuthStateChanged(auth, (user) => {
      currentUser = user;
      if (!user) {
        signInAnonymously(auth).catch((e) => {
          console.warn('Firebase anon sign-in failed — check that Anonymous Authentication is enabled in the Firebase Console (Auth → Sign-in method → Anonymous).', e);
        });
      }
    });

    // Setup automatic sync queue processing if network comes back
    try {
      const { setupNetworkListener } = require('./sync');
      setupNetworkListener();
    } catch (e) {
      // ignore if sync module missing
    }
  }
  return { app, auth, db };
}

export async function getUserId() {
  if (!auth) initFirebase();
  if (currentUser) return currentUser.uid;

  // wait briefly for auth to resolve
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      resolve(user ? user.uid : null);
    });
  });
}

// Menus: store in collection `menus` with field userId
export async function saveMenuToFirestore(menu) {
  if (!db) initFirebase();
  const uid = await getUserId();
  if (!uid) throw new Error('No user id');
  const menusRef = collection(db, 'menus');
  const docRef = await addDoc(menusRef, { ...menu, userId: uid, syncedAt: new Date().toISOString() });
  return docRef.id;
}

export async function loadMenusFromFirestore() {
  if (!db) initFirebase();
  const uid = await getUserId();
  if (!uid) return [];
  const menusRef = collection(db, 'menus');

  try {
    const q = query(menusRef, where('userId', '==', uid), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.warn('Failed to load remote menus with ordered query (index may be missing). Falling back to simple query:', e.message || e);
    try {
      const q2 = query(menusRef, where('userId', '==', uid));
      const snapshot2 = await getDocs(q2);
      return snapshot2.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (e2) {
      console.warn('Fallback remote menus query also failed, returning empty list', e2);
      return [];
    }
  }
}

// Profile: stored in document `profiles/{uid}`
export async function saveProfileToFirestore(profile) {
  if (!db) initFirebase();
  const uid = await getUserId();
  if (!uid) throw new Error('No user id');
  const docRef = doc(db, 'profiles', uid);
  await setDoc(docRef, profile, { merge: true });
}

export async function loadProfileFromFirestore() {
  if (!db) initFirebase();
  const uid = await getUserId();
  if (!uid) return null;
  const docRef = doc(db, 'profiles', uid);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? snapshot.data() : null;
}
