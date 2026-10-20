import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { theme } from "@/constants/theme";

interface ProfessorLoadingScreenProps {
  message?: string;
}

export function ProfessorLoadingScreen({
  message = "Carregando...",
}: ProfessorLoadingScreenProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.primary} />
      {!!message && <Text style={styles.text}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // Fundo esmaecido/semi-transparente usando a cor de fundo ou branco
    backgroundColor: "rgba(244, 246, 248, 0.88)",
    padding: 24,
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "500",
    color: theme.textMuted || "#64748B",
    textAlign: "center",
    letterSpacing: 0.3,
  },
});
