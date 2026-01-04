import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Index() {
    const router = useRouter();
    const [isExiting, setIsExiting] = useState(false);

    const navigateWithAnimation = (path) => {
        setIsExiting(true);
        setTimeout(() => router.push(path), 400);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>🥗 MealPlanner</Text>

                <View style={styles.headerButtons}>
                    <Pressable
                        style={styles.loginBtn}
                        onPress={() => navigateWithAnimation("/login")}
                    >
                        <Text style={styles.btnText}>Connexion</Text>
                    </Pressable>

                    <Pressable
                        style={styles.signupBtn}
                        onPress={() => navigateWithAnimation("/signup")}
                    >
                        <Text style={styles.btnText}>Inscription</Text>
                    </Pressable>
                </View>
            </View>

            {/* Contenu */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.badge}>✨ Planification intelligente</Text>

                <Text style={styles.title}>
                    Planifiez vos repas{" "}
                    <Text style={styles.gradientText}>en quelques secondes</Text>
                </Text>

                <Text style={styles.subtitle}>
                    Générez des menus hebdomadaires personnalisés adaptés à votre budget,
                    vos préférences alimentaires et votre emploi du temps.
                </Text>

                <Pressable
                    style={styles.startBtn}
                    onPress={() => navigateWithAnimation("/home")}
                >
                    <Text style={styles.startText}>Commencer gratuitement</Text>
                </Pressable>

                <Text style={styles.note}>Aucune carte bancaire requise</Text>

                <View style={styles.features}>
                    <Feature icon="📅" title="Menus hebdomadaires" text="Plans détaillés pour toute la semaine" />
                    <Feature icon="💰" title="Budget optimisé" text="Économisez sur vos courses" />
                    <Feature icon="🥗" title="Personnalisé" text="Adapté à vos goûts et régimes" />
                    <Feature icon="⚡" title="Rapide & Simple" text="Résultats en quelques clics" />
                </View>
            </ScrollView>
        </View>
    );
}

function Feature({ icon, title, text }) {
    return (
        <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>{icon}</Text>
            <Text style={styles.featureTitle}>{title}</Text>
            <Text style={styles.featureText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f172a",
    },

    header: {
        paddingTop: 50,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    logo: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },

    headerButtons: {
        flexDirection: "row",
        gap: 10,
    },

    loginBtn: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 12,
        backgroundColor: "rgba(255,255,255,0.15)",
    },

    signupBtn: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 12,
        backgroundColor: "#6366f1",
    },

    btnText: {
        color: "white",
        fontWeight: "600",
    },

    content: {
        padding: 24,
        alignItems: "center",
    },

    badge: {
        color: "white",
        backgroundColor: "rgba(255,255,255,0.1)",
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        marginBottom: 20,
    },

    title: {
        fontSize: 32,
        fontWeight: "800",
        color: "white",
        textAlign: "center",
        marginBottom: 16,
    },

    gradientText: {
        color: "#a78bfa",
    },

    subtitle: {
        color: "rgba(255,255,255,0.7)",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 30,
    },

    startBtn: {
        backgroundColor: "#6366f1",
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 20,
        marginBottom: 10,
    },

    startText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700",
    },

    note: {
        color: "rgba(255,255,255,0.6)",
        marginBottom: 30,
    },

    features: {
        width: "100%",
        gap: 16,
    },

    featureCard: {
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
    },

    featureIcon: {
        fontSize: 36,
        marginBottom: 10,
    },

    featureTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 6,
    },

    featureText: {
        color: "rgba(255,255,255,0.7)",
        textAlign: "center",
    },
});
