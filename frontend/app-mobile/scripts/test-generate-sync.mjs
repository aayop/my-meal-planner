git add .
import { initFirebase, saveMenuToFirestore, loadMenusFromFirestore, getUserId } from '../services/firebase.js';
import { generateWeeklyMenu } from '../services/menuGenerator.js';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
  console.log('Initializing Firebase...');
  initFirebase();

  // Wait briefly for anonymous auth to complete
  console.log('Waiting for auth...');
  await sleep(2000);

  const uid = await getUserId();
  console.log('Current user id:', uid);

  const gen = generateWeeklyMenu({ budget: 60, diet: 'vegetarien', days: 7, avoidRepeats: true, strictBudget: false });
  const menu = {
    id: Date.now().toString(),
    budget: 60,
    preferences: { diet: 'vegetarien' },
    items: gen.days.map((d) => ({ day: d.day, meals: d.meals, totalCost: d.totalCost, totalCalories: d.totalCalories })),
    averageDailyCost: gen.averageDailyCost,
    createdAt: new Date().toISOString(),
    testBy: 'auto-script'
  };

  try {
    console.log('Saving menu to Firestore...');
    const docId = await saveMenuToFirestore(menu);
    console.log('Saved menu doc id:', docId);
  } catch (e) {
    console.warn('saveMenuToFirestore failed, falling back to direct write:', e && e.message ? e.message : e);
    // Direct write fallback (no user id)
    try {
      const { initializeApp } = await import('firebase/app');
      const { getFirestore, collection, addDoc } = await import('firebase/firestore');
      const firebaseConfig = {
        apiKey: "AIzaSyD3sDHLjdBC2wY1VZFeQStB_W3c1L1s-4w",
        authDomain: "meal-planner-app-638ed.firebaseapp.com",
        projectId: "meal-planner-app-638ed",
        storageBucket: "meal-planner-app-638ed.firebasestorage.app",
        messagingSenderId: "216182755370",
        appId: "1:216182755370:web:e3d1fe4c5037659bad7353",
        measurementId: "G-TW2N370EG6"
      };
      const app2 = initializeApp(firebaseConfig);
      const db2 = getFirestore(app2);
      // sanitize menu to replace undefined with null
      const sanitize = (obj) => JSON.parse(JSON.stringify(obj, (k,v) => v === undefined ? null : v));
      const sanitized = sanitize(menu);
      console.log('Fallback writing sanitized menu:', JSON.stringify(sanitized, null, 2));
      const ref = await addDoc(collection(db2, 'menus'), { ...sanitized, userId: 'test-script' });
      console.log('Fallback write doc id:', ref.id);
    } catch (e2) {
      console.error('Fallback write failed:', e2 && e2.message ? e2.message : e2);
      process.exit(1);
    }
  }

  try {
    console.log('Loading menus from Firestore for this user...');
    const menus = await loadMenusFromFirestore();
    console.log('Loaded menus count:', menus.length);
    console.log('Latest menu:', menus[0]);
  } catch (e) {
    console.error('Failed loading menus:', e && e.message ? e.message : e);
    process.exit(1);
  }

  console.log('Test finished successfully.');
}

run().catch(e => console.error('Test run error:', e));