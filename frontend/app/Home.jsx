import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";

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
    const [showMenu, setShowMenu] = useState(false);

    return (
        <View style={styles.container}>
            <Navbar />

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        Planifiez vos repas facilement
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        Menus adaptés à votre budget et régime
                    </Text>
                </View>

                <View style={styles.cardsContainer}>
                    <BudgetSelector budget={budget} setBudget={setBudget} />
                    <PreferencesForm
                        preferences={preferences}
                        setPreferences={setPreferences}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => setShowMenu(true)}
                        style={styles.generateButton}
                    >
                        <Text style={styles.generateButtonText}>
                            Générer le menu
                        </Text>
                    </TouchableOpacity>
                </View>

                {showMenu && (
                    <View style={styles.successContainer}>
                        <Text style={styles.successText}>
                            ✅ Menu généré avec succès
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

/* ====== STYLES ====== */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    navbar: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
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
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 24,
    },
    navbarEmoji: {
        fontSize: 28,
        marginRight: 8,
    },
    navbarTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#818CF8',
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
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 12,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
    },
    cardsContainer: {
        gap: 24,
        marginBottom: 40,
    },
    card: {
        backgroundColor: 'rgba(30, 41, 59, 0.6)',
        padding: 24,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        marginBottom: 20,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    budgetText: {
        marginTop: 16,
        textAlign: 'center',
        color: '#818CF8',
        fontSize: 18,
        fontWeight: 'bold',
    },
    selectContainer: {
        gap: 12,
    },
    selectOption: {
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#0f172a',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    selectOptionActive: {
        borderColor: '#818CF8',
        backgroundColor: 'rgba(129, 140, 248, 0.1)',
    },
    selectOptionText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center',
    },
    selectOptionTextActive: {
        color: '#818CF8',
        fontWeight: 'bold',
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    generateButton: {
        backgroundColor: '#4F46E5',
        paddingHorizontal: 40,
        paddingVertical: 16,
        borderRadius: 12,
    },
    generateButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    successContainer: {
        alignItems: 'center',
        padding: 24,
    },
    successText: {
        color: '#A5B4FC',
        fontSize: 18,
        textAlign: 'center',
    },
});