import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Login() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Tela visual simples para teste.</Text>
            <Link href="/cadastro" style={styles.link}>
                <Text style={styles.linkText}>Ir para Cadastro</Text>
            </Link>
            <Link href="/esqueci_senha" style={styles.link}>
                <Text style={styles.linkText}>Esqueci minha senha</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: "#444",
        marginBottom: 24,
        textAlign: "center",
    },
    link: {
        width: "100%",
        paddingVertical: 14,
        paddingHorizontal: 18,
        marginBottom: 12,
        backgroundColor: "#007AFF",
        borderRadius: 10,
        alignItems: "center",
    },
    linkText: {
        color: "#fff",
        fontWeight: "600",
    },
});
