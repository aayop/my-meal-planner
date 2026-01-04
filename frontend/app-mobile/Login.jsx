import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        userType: "user", // "user" | "admin"
    });

    const handleSubmit = () => {
        console.log("Connexion :", formData);

        // Simulation connexion réussie
        if (formData.userType === "admin") {
            router.push("/admin-dashboard");
        } else {
            router.push("/home");
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Bouton retour */}
                <Pressable onPress={() => router.back()} style={styles.backBtn}>
                    <Text style={styles.backText}>← Retour</Text>
                </Pressable>

                {/* Carte Login */}
                <View style={styles.card}>
                    <Text style={styles.logo}>🥗</Text>
                    <Text style={styles.title}>Connexion</Text>
                    <Text style={styles.subtitle}>
                        Accédez à votre compte MealPlanner
                    </Text>

                    {/* Type de compte */}
                    <Text style={styles.label}>Type de compte</Text>
                    <View style={styles.userTypeRow}>
                        <Pressable
                            onPress={() =>
                                setFormData({ ...formData, userType: "user" })
                            }
                            style={[
                                styles.userTypeBtn,
                                formData.userType === "user" && styles.activeBtn,
                            ]}
                        >
                            <Text style={styles.btnText}>👤 Utilisateur</Text>
                        </Pressable>

                        <Pressable
                            onPress={() =>
                                setFormData({ ...formData, userType: "admin" })
                            }
                            style={[
                                styles.userTypeBtn,
                                formData.userType === "admin" && styles.activeBtn,
                            ]}
                        >
                            <Text style={styles.btnText}>👨‍💼 Admin</Text>
                        </Pressable>
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

                    {/* Mot de passe oublié */}
                    <Pressable onPress={() => router.push("/forgot-password")}>
                        <Text style={styles.forgot}>Mot de passe oublié ?</Text>
                    </Pressable>

                    {/* Bouton connexion */}
                    <Pressable style={styles.submitBtn} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Se connecter</Text>
                    </Pressable>

                    {/* Lien inscription */}
                    <Pressable onPress={() => router.push("/signup")}>
                        <Text style={styles.signup}>
                            Pas encore de compte ?{" "}
                            <Text style={styles.signupLink}>Inscrivez-vous</Text>
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
    label: {
        color: "white",
        marginBottom: 8,
        marginTop: 14,
    },
    userTypeRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 10,
    },
    userTypeBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 14,
        backgroundColor: "rgba(255,255,255,0.12)",
        alignItems: "center",
    },
    activeBtn: {
        backgroundColor: "#6366f1",
    },
    btnText: {
        color: "white",
        fontWeight: "600",
    },
    input: {
        backgroundColor: "rgba(255,255,255,0.12)",
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        color: "white",
    },
    forgot: {
        color: "#818cf8",
        textAlign: "right",
        marginTop: 10,
        marginBottom: 20,
    },
    submitBtn: {
        backgroundColor: "#6366f1",
        paddingVertical: 16,
        borderRadius: 18,
        alignItems: "center",
    },
    submitText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700",
    },
    signup: {
        color: "rgba(255,255,255,0.7)",
        textAlign: "center",
        marginTop: 20,
    },
    signupLink: {
        color: "#818cf8",
        fontWeight: "700",
    },
});
