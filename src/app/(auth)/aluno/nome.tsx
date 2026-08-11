import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import { Sparkles } from "lucide-react-native";
import { FormField } from "../../../components/form/FormField";
import { AuthHeader } from "../../../components/Headers";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { ScreenShell } from "../../../components/ScreenShell";

import { AUTH_ROUTES } from "@/router";
import { STUDENT_AUTH_CONSTANTS } from "../../../constants/auth";
import { useAuth } from "../../../hooks/useAuth";
import { styles } from "../../../styles";
import { StudentNameSearchParams } from "../../../types/auth";

export default function StudentNameRoute() {
  const router = useRouter();
  const { classId, schoolId } = useLocalSearchParams<StudentNameSearchParams>();
  const { verifyStudentAccessCode } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const canContinue = accessCode.trim().length > 0;

  const handleDone = async () => {
    if (!canContinue || loading) return;

    if (!classId || !schoolId) {
      router.replace(AUTH_ROUTES.STUDENT.LOGIN as any);
      return;
    }

    setError("");
    setLoading(true);

    try {
      // 1. Pegamos o studentId retornado pelo código de acesso
      const accessData = await verifyStudentAccessCode(
        classId as string,
        accessCode.trim(),
      );

      if (!accessData?.studentId) {
        throw new Error("Aluno não encontrado para este código de acesso.");
      }

      // Se o aluno já tem nome cadastrado no sistema, usamos esse nome como 'explorerName'.
      // Caso não tenha, seguimos sem nome (o app exibirá 'Explorador' como fallback).
      const explorerName = accessData.name || '';

      router.push({
        pathname: "/aluno/concluido",
        params: { explorerName },
      });
    } catch (err: any) {
      console.error("❌ Erro ao validar/cadastrar aluno:", err);
      setError(err?.message || "Não foi possível cadastrar o aluno.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenShell
      onBack={() => router.back()}
      footer={
        <PrimaryButton
          disabled={!canContinue}
          onPress={() => canContinue && handleDone()}
        >
          {STUDENT_AUTH_CONSTANTS.TEXTS.BUTTON_CONTINUE}
        </PrimaryButton>
      }
    >
      <AuthHeader
        Icon={Sparkles}
        title={STUDENT_AUTH_CONSTANTS.TEXTS.NAME_TITLE}
        subtitle={STUDENT_AUTH_CONSTANTS.TEXTS.NAME_SUBTITLE}
        align="center"
      />

      <View>
        <View style={styles.formGroup}>
          <Text style={styles.manualLabel}>Código de acesso do aluno</Text>

          <FormField
            value={accessCode}
            onChangeText={setAccessCode}
            placeholder="Código de acesso"
            preset="student"
          />
        </View>

        {!!error && <Text style={styles.inputErrorText}>{error}</Text>}
      </View>
    </ScreenShell>
  );
}
