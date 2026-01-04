import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, ImageBackground, Platform } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initFirebase, saveMenuToFirestore } from './services/firebase';
import { generateWeeklyMenu } from './services/menuGenerator';
import { Colors } from './constants/theme';

initFirebase();

/* ====== NAVBAR ====== */
function Navbar() {
    const router = useRouter();

    return (
        <View style={styles.navbar}>
            <View style={styles.navbarContainer}>
                <View style={styles.navbarLeft}>
                    <TouchableOpacity
                        onPress={() => router.replace("/")}
                        style={styles.backButton}
                    >
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.navbarEmoji}>🍽️</Text>
                    <Text style={styles.navbarTitle}>MealPlanner</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navbarRight}>
                    <TouchableOpacity onPress={() => router.push("/home")} style={styles.navLink}>
                        <Text style={styles.navLinkText}>🎯 Générateur</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/mes-menus")} style={styles.navLink}>
                        <Text style={styles.navLinkText}>📋 Mes menus</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/courses")} style={styles.navLink}>
                        <Text style={styles.navLinkText}>🛒 Courses</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/mes-recettes")} style={styles.navLink}>
                        <Text style={styles.navLinkText}>🍳 Mes recettes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/profil")} style={styles.navLink}>
                        <Text style={styles.navLinkText}>👤 Mon profil</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}

/* ====== BUDGET SELECTOR ====== */
function BudgetSelector({ budget, setBudget }) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>💰 Budget journalier</Text>
            <Slider
                style={styles.slider}
                minimumValue={30}
                maximumValue={150}
                value={budget}
                onValueChange={(value) => setBudget(Math.round(value))}
                minimumTrackTintColor="#818CF8"
                maximumTrackTintColor="#334155"
                thumbTintColor="#818CF8"
            />
            <Text style={styles.budgetText}>
                {budget} MAD / jour
            </Text>
        </View>
    );
}

/* ====== PREFERENCES FORM ====== */
function PreferencesForm({ preferences, setPreferences }) {
    const diets = [
        { value: "normal", label: "Normal" },
        { value: "economique", label: "Économique" },
        { value: "vegetarien", label: "Végétarien" },
        { value: "sport", label: "Sport" },
        { value: "diabetique", label: "Diabétique" }
    ];

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>🥗 Préférences alimentaires</Text>
            <View style={styles.selectContainer}>
                {diets.map((diet) => (
                    <TouchableOpacity
                        key={diet.value}
                        onPress={() => setPreferences({ ...preferences, diet: diet.value })}
                        style={[
                            styles.selectOption,
                            preferences.diet === diet.value && styles.selectOptionActive
                        ]}
                    >
                        <Text style={[
                            styles.selectOptionText,
                            preferences.diet === diet.value && styles.selectOptionTextActive
                        ]}>
                            {diet.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

/* ====== HOME ====== */
export default function Home() {
    const router = useRouter();
    const [budget, setBudget] = useState(50);
    const [preferences, setPreferences] = useState({ diet: "normal" });

    const [daysCount, setDaysCount] = useState(7);
    const [avoidRepeats, setAvoidRepeats] = useState(true);
    const [strictBudget, setStrictBudget] = useState(false);

    const generateMenu = async () => {
        // Use generator to create a weekly menu based on budget and preferences
        const gen = generateWeeklyMenu({ budget, diet: preferences.diet, days: daysCount, avoidRepeats, strictBudget });

        const menu = {
            id: Date.now().toString(),
            budget,
            preferences,
            items: gen.days.map((d, i) => ({ day: d.day, meals: d.meals, totalCost: d.totalCost })),
            averageDailyCost: gen.averageDailyCost,
            meta: { avoidRepeats: gen.avoidRepeats, strictBudget: gen.strictBudget },
            createdAt: new Date().toISOString(),
        };

        try {
            const raw = await AsyncStorage.getItem('menus');
            const menus = raw ? JSON.parse(raw) : [];
            menus.unshift(menu);
            await AsyncStorage.setItem('menus', JSON.stringify(menus));

            console.log('Generated menu saved locally', menu.id, menu.averageDailyCost, menu.meta);

            // Try to sync with Firestore or enqueue if offline / disabled
            try {
                const { isSyncEnabled, enqueue, processQueue } = await import('./services/sync');
                const enabled = await isSyncEnabled();
                const NetInfo = (await import('@react-native-community/netinfo')).default;
                const netState = await NetInfo.fetch();

                if (enabled && netState.isConnected) {
                    try {
                        await saveMenuToFirestore(menu);
                        console.log('Menu synced to Firestore', menu.id);
                    } catch (syncErr) {
                        console.warn('Firestore sync failed, enqueueing', syncErr);
                        await enqueue({ type: 'menu', payload: menu });
                    }
                } else {
                    await enqueue({ type: 'menu', payload: menu });
                }

                // Try to process queue in background
                processQueue();
            } catch (err) {
                console.warn('Sync helper failed', err);
            }

            Alert.alert('Succès', 'Menu généré et sauvegardé');
            router.push('/mes-menus');
        } catch (e) {
            console.error('Error saving menu', e);
            Alert.alert('Erreur', 'Impossible de sauvegarder le menu');
        }
    };

    return (
        <View style={styles.container}>
            <Navbar />

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                <ImageBackground
                    source={{ uri: 'https://source.unsplash.com/1200x600/?food,meal,flatlay' }}
                    style={styles.headerBg}
                    imageStyle={{ borderRadius: 16 }}
                >
                    <LinearGradient colors={[Colors.light.tint, Colors.light.tintSecondary]} style={styles.headerGradient}>
                        <Text style={styles.headerTitle}>
                            Planifiez vos repas facilement
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            Menus adaptés à votre budget et régime
                        </Text>
                    </LinearGradient>
                </ImageBackground>

                <View style={styles.cardsContainer}>
                    <BudgetSelector budget={budget} setBudget={setBudget} />
                    <PreferencesForm
                        preferences={preferences}
                        setPreferences={setPreferences}
                    />

                    <View style={[styles.card, { marginTop: 12 }]}> 
                        <Text style={styles.cardTitle}>📅 Durée (jours)</Text>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            {[3,5,7].map(n => (
                                <TouchableOpacity key={n} onPress={() => setDaysCount(n)} style={[styles.selectOption, daysCount === n && styles.selectOptionActive]}>
                                    <Text style={[styles.selectOptionText, daysCount === n && styles.selectOptionTextActive]}>{n} jours</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={[styles.cardTitle, { marginTop: 12 }]}>⚙️ Options</Text>
                        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                            <TouchableOpacity onPress={() => setAvoidRepeats(!avoidRepeats)} style={[styles.selectOption, avoidRepeats && styles.selectOptionActive]}>
                                <Text style={[styles.selectOptionText, avoidRepeats && styles.selectOptionTextActive]}>{avoidRepeats ? 'Pas de répétitions' : 'Permettre répétitions'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setStrictBudget(!strictBudget)} style={[styles.selectOption, strictBudget && styles.selectOptionActive]}>
                                <Text style={[styles.selectOptionText, strictBudget && styles.selectOptionTextActive]}>{strictBudget ? 'Budget strict' : 'Budget flexible'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={generateMenu}>
                        <LinearGradient
                            colors={[Colors.light.tint, Colors.light.tintSecondary]}
                            style={styles.generateButton}
                        >
                            <Text style={styles.generateButtonText}>
                                Générer le menu
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

/* ====== STYLES ====== */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background || '#0f172a',
    },
    navbar: {
        backgroundColor: Platform.OS === 'web' ? Colors.light.card : 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.06)',
        paddingTop: 40,
    },
    navbarContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    navbarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    backButton: {
        padding: 8,
        borderRadius: 8,
        marginRight: 12,
    },
    backButtonText: {
        color: Colors.light.muted,
        fontSize: 24,
    },
    navbarEmoji: {
        fontSize: 28,
        marginRight: 8,
    },
    navbarTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.tint,
    },
    navbarRight: {
        flexDirection: 'row',
    },
    navLink: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
    },
    navLinkText: {
        color: Colors.light.muted,
        fontSize: 14,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        padding: 24,
    },
    headerBg: {
        height: 160,
        marginBottom: 24,
        borderRadius: 16,
        overflow: 'hidden',
    },
    headerGradient: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.light.text,
        textAlign: 'center',
        marginBottom: 6,
        textShadowColor: 'rgba(0,0,0,0.06)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    headerSubtitle: {
        fontSize: 14,
        color: Colors.light.muted,
        textAlign: 'center',
    },
    cardsContainer: {
        gap: 24,
        marginBottom: 40,
    },
    card: {
        backgroundColor: Colors.light.card,
        padding: 20,
        borderRadius: 16,
        borderWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 20,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    budgetText: {
        marginTop: 16,
        textAlign: 'center',
        color: Colors.light.tint,
        fontSize: 18,
        fontWeight: 'bold',
    },
    selectContainer: {
        gap: 12,
    },
    selectOption: {
        padding: 12,
        borderRadius: 12,
        backgroundColor: Colors.light.card,
        borderWidth: 0,
        minWidth: 110,
        alignItems: 'center',
    },
    selectOptionActive: {
        borderColor: Colors.light.tint,
        backgroundColor: 'rgba(99,102,241,0.06)'
    },
    selectOptionText: {
        color: Colors.light.muted,
        fontSize: 16,
        textAlign: 'center',
    },
    selectOptionTextActive: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    generateButton: {
        paddingHorizontal: 40,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.light.tint,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 18,
        elevation: 8,
    },
    generateButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.3,
    },
    successContainer: {
        alignItems: 'center',
        padding: 24,
    },
    successText: {
        color: Colors.light.tintSecondary,
        fontSize: 18,
        textAlign: 'center',
    },
});