import { useState } from "react";
import { Alert, ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import ActivityFormScreen from "@/components/professor/ActivityForm";
import { saveActivityToSupabase } from "@/service/activityService";
import { useProfessorData } from "@/hooks/professor/useProfessorData";
import { PROFESSOR_ROUTES } from "@/router/professor.routes";
import { supabase } from "@/service/supabase";

export default function NewActivityRoute() {
  const router = useRouter();
  const { students, classes } = useProfessorData();
  const [loading, setLoading] = useState(false);

  const handleSave = async (formData: any) => {
    try {
      console.log("1. Dados recebidos do formulário:", formData);

      let targetClassId: string | undefined;
      let targetClassName = "";

      const safeStudents = Array.isArray(students) ? students : [];
      const safeClasses = Array.isArray(classes) ? classes : [];

      // Passo A: Descobrir o NOME da turma que precisamos buscar
      if (
        formData.className === "Alunos específicos" ||
        formData.className === "Alunos Específicos"
      ) {
        const firstStudentName = formData.studentNames?.[0];
        const student = safeStudents.find(
          (s: any) => s.name === firstStudentName,
        );

        targetClassName = student?.className || "";
        console.log(
          "1.1. Aluno selecionado:",
          student?.name,
          "| Turma do aluno:",
          targetClassName,
        );
      } else {
        targetClassName = formData.className;
      }

      // Passo B: Tentar pegar o ID pelo estado local (que no seu log estava vazio)
      const localClass = safeClasses.find((c) => c.name === targetClassName);
      targetClassId = localClass?.id;

      // Passo C: O SALVA-VIDAS! Se não achou o ID, busca direto no banco de dados
      if (!targetClassId && targetClassName) {
        console.log(
          `1.2. Buscando ID da turma '${targetClassName}' direto no Supabase...`,
        );

        const { data: dbClass, error: dbError } = await supabase
          .from("classes")
          .select("id")
          .eq("name", targetClassName)
          .single();

        if (dbClass) {
          targetClassId = dbClass.id;
          console.log("1.3. Turma encontrada no banco! ID:", targetClassId);
        } else {
          console.log("⚠️ Erro na busca direta do banco:", dbError);
        }
      }

      // Validação final: Se depois de tudo ainda não tem ID, é porque a turma não existe no banco
      if (!targetClassId) {
        console.warn("⚠️ [AVISO] targetClassId não foi encontrado.");
        Alert.alert(
          "Erro",
          `A turma "${targetClassName}" não foi encontrada no banco de dados. Verifique se ela está cadastrada.`,
        );
        return;
      }

      setLoading(true);
      console.log(
        "2. Iniciando envio para o Supabase com classId:",
        targetClassId,
      );

      const result = await saveActivityToSupabase({
        formData,
        classId: targetClassId,
        fileUriOrBlob: formData.attachmentUri,
      });

      console.log("3. Sucesso ao salvar no Supabase:", result);
      Alert.alert("Sucesso!", "Atividade criada com sucesso.");

      router.replace(PROFESSOR_ROUTES.ACTIVITIES);
    } catch (error: any) {
      console.error("❌ ERRO CRÍTICO NO HANDLE SAVE:", error);
      Alert.alert(
        "Erro ao Salvar",
        error.message || "Ocorreu um erro inesperado.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ActivityFormScreen
      availableStudents={students as any}
      classes={classes}
      onBack={() => router.back()}
      onSave={handleSave}
    />
  );
}
