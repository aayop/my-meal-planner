import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function Signup() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = () => {
        if (formData.password !== formData.confirmPassword) {
            Alert.alert("Erreur", "Les mots de passe ne correspondent pas !");
            return;
        }

        console.log("Inscription :", formData);

        // Simulation inscription réussie
        router.push("/home");
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Bouton retour */}
                <Pressable onPress={() => router.back()} style={styles.backBtn}>
                    <Text style={styles.backText}>← Retour</Text>
                </Pressable>

                {/* Carte inscription */}
                <View style={styles.card}>
                    <Text style={styles.logo}>🥗</Text>
                    <Text style={styles.title}>Inscription</Text>
                    <Text style={styles.subtitle}>
                        Créez votre compte MealPlanner
                    </Text>

                    {/* Nom / Prénom */}
                    <View style={styles.row}>
                        <View style={styles.flex}>
                            <Text style={styles.label}>Nom</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nom"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                value={formData.nom}
                                onChangeText={(text) =>
                                    setFormData({ ...formData, nom: text })
                                }
                            />
                        </View>

                        <View style={styles.flex}>
                            <Text style={styles.label}>Prénom</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Prénom"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                value={formData.prenom}
                                onChangeText={(text) =>
                                    setFormData({ ...formData, prenom: text })
                                }
                            />
                        </View>
                    </View>

                    {/* Email */}
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="votre@email.com"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        value={formData.email}
                        onChangeText={(text) =>
                            setFormData({ ...formData, email: text })
                        }
                    />

                    {/* Mot de passe */}
                    <Text style={styles.label}>Mot de passe</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        secureTextEntry
                        value={formData.password}
                        onChangeText={(text) =>
                            setFormData({ ...formData, password: text })
                        }
                    />
                    <Text style={styles.helper}>Minimum 6 caractères</Text>

                    {/* Confirmation */}
                    <Text style={styles.label}>Confirmer le mot de passe</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        secureTextEntry
                        value={formData.confirmPassword}
                        onChangeText={(text) =>
                            setFormData({ ...formData, confirmPassword: text })
                        }
                    />

                    {/* Bouton inscription */}
                    <Pressable style={styles.submitBtn} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Créer mon compte</Text>
                    </Pressable>

                    {/* Lien connexion */}
                    <Pressable onPress={() => router.push("/login")}>
                        <Text style={styles.loginText}>
                            Déjà un compte ?{" "}
                            <Text style={styles.loginLink}>Connectez-vous</Text>
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#020617",
    },
    content: {
        padding: 24,
        paddingTop: 60,
    },
    backBtn: {
        marginBottom: 20,
    },
    backText: {
        color: "rgba(255,255,255,0.7)",
        fontSize: 16,
    },
    card: {
        backgroundColor: "rgba(255,255,255,0.06)",
        borderRadius: 24,
        padding: 24,
    },
    logo: {
        fontSize: 48,
        textAlign: "center",
        marginBottom: 10,
    },
    title: {
        color: "white",
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
    },
    subtitle: {
        color: "rgba(255,255,255,0.7)",
        textAlign: "center",
        marginBottom: 24,
    },
    row: {
        flexDirection: "row",
        gap: 12,
    },
    flex: {
        flex: 1,
    },
    label: {
        color: "white",
        marginBottom: 8,
        marginTop: 14,
    },
    input: {
        backgroundColor: "rgba(255,255,255,0.12)",
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        color: "white",
    },
    helper: {
        color: "rgba(255,255,255,0.5)",
        fontSize: 12,
        marginTop: 4,
    },
    submitBtn: {
        backgroundColor: "#6366f1",
        paddingVertical: 16,
        borderRadius: 18,
        alignItems: "center",
        marginTop: 24,
    },
    submitText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700",
    },
    loginText: {
        color: "rgba(255,255,255,0.7)",
        textAlign: "center",
        marginTop: 20,
    },
    loginLink: {
        color: "#818cf8",
        fontWeight: "700",
    },
});
