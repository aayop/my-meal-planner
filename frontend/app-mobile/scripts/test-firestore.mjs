import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD3sDHLjdBC2wY1VZFeQStB_W3c1L1s-4w",
  authDomain: "meal-planner-app-638ed.firebaseapp.com",
  projectId: "meal-planner-app-638ed",
  storageBucket: "meal-planner-app-638ed.firebasestorage.app",
  messagingSenderId: "216182755370",
  appId: "1:216182755370:web:e3d1fe4c5037659bad7353",
  measurementId: "G-TW2N370EG6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  console.log('Running Firestore test...');
  const menu = {
    budget: 123,
    preferences: { diet: 'test' },
    items: [{ day: 'TestDay', meals: ['TestMeal'] }],
    createdAt: new Date().toISOString(),
    testBy: 'local-script'
  };

  try {
    const ref = await addDoc(collection(db, 'menus'), menu);
    console.log('Added doc id', ref.id);
  } catch (e) {
    console.error('Write failed:', e && e.message ? e.message : e);
  }

  try {
    const q = query(collection(db, 'menus'), orderBy('createdAt', 'desc'), limit(5));
    const snap = await getDocs(q);
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    console.log('Latest docs:', docs);
  } catch (e) {
    console.error('Read failed:', e && e.message ? e.message : e);
  }
}

run().catch((e) => console.error('Test script error:', e));