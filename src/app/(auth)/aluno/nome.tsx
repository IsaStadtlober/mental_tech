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
  const { registerStudent, verifyStudentAccessCode } = useAuth();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const canContinue = name.trim().length > 0 && accessCode.trim().length > 0;

  const handleDone = async () => {
    if (!canContinue || loading) return;

    if (!classId || !schoolId) {
      router.replace(AUTH_ROUTES.STUDENT.LOGIN as any);
      return;
    }

    setError("");
    setLoading(true);

    try {
      await verifyStudentAccessCode(classId as string, accessCode.trim());
      await registerStudent(name.trim(), classId, schoolId);
      router.push({
        pathname: "/aluno/concluido",
        params: { explorerName: name.trim() },
      });
    } catch (err: any) {
      // 💡 LOG ADICIONADO AQUI:
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
        <Text style={styles.manualLabel}>Código de acesso do aluno</Text>

        <FormField
          value={accessCode}
          onChangeText={setAccessCode}
          placeholder="Código de acesso"
          preset="student"
        />

        <Text style={styles.manualLabel}>
          {STUDENT_AUTH_CONSTANTS.LABELS.EXPLORER_NAME}
        </Text>

        <FormField
          value={name}
          onChangeText={setName}
          placeholder={STUDENT_AUTH_CONSTANTS.PLACEHOLDERS.EXPLORER_NAME}
          preset="student"
        />

        {!!error && <Text style={styles.inputErrorText}>{error}</Text>}
      </View>
    </ScreenShell>
  );
}
