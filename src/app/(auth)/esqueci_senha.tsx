import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function EsqueciSenha() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Esqueci a senha</Text>
            <Text style={styles.subtitle}>Tela visual para teste.</Text>
            <Link href="/nova_senha" style={styles.link}>
                <Text style={styles.linkText}>Ir para Nova Senha</Text>
            </Link>
            <Link href="/login" style={styles.link}>
                <Text style={styles.linkText}>Voltar ao Login</Text>
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
        backgroundColor: "#FF9500",
        borderRadius: 10,
        alignItems: "center",
    },
    linkText: {
        color: "#fff",
        fontWeight: "600",
    },
});
