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
      let targetStudentIds: string[] | undefined = undefined; // 👈 Array para guardar os IDs dos alunos selecionados

      const safeStudents = Array.isArray(students) ? students : [];
      const safeClasses = Array.isArray(classes) ? classes : [];

      const isSpecificStudents =
        formData.className === "Alunos específicos" ||
        formData.className === "Alunos Específicos";

      // Passo A: Tratar "Alunos específicos" vs "Turma Inteira"
      if (isSpecificStudents) {
        const selectedNames: string[] = formData.studentNames || [];

        // Busca os objetos dos alunos selecionados no estado local
        const matchedStudents = safeStudents.filter((s: any) =>
          selectedNames.includes(s.name),
        );

        // Extrai os IDs dos alunos para envio direcionado
        targetStudentIds = matchedStudents.map((s: any) => s.id);

        // Pega o nome da turma a partir do primeiro aluno encontrado
        const firstStudent = matchedStudents[0];
        targetClassName = firstStudent?.className || "";

        console.log(
          `1.1. Alunos específicos identificados (${targetStudentIds.length}):`,
          selectedNames,
          "| Turma vinculada:",
          targetClassName,
        );
      } else {
        targetClassName = formData.className;
      }

      // Passo B: Tentar pegar o ID da turma pelo estado local
      const localClass = safeClasses.find((c) => c.name === targetClassName);
      targetClassId = localClass?.id;

      // Passo C: Se não achou localmente, busca direto no Supabase
      if (!targetClassId && targetClassName) {
        console.log(
          `1.2. Buscando ID da turma '${targetClassName}' direto no Supabase...`,
        );

        const { data: dbClass, error: dbError } = await supabase
          .from("classes")
          .select("id")
          .eq("name", targetClassName)
          .maybeSingle();

        if (dbClass) {
          targetClassId = dbClass.id;
          console.log("1.3. Turma encontrada no banco! ID:", targetClassId);
        } else {
          console.log("⚠️ Erro/Aviso na busca direta do banco:", dbError);
        }
      }

      // Validação final de turma
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
        "e targetStudentIds:",
        targetStudentIds,
      );

      // Passo D: Chama o serviço passando targetStudentIds
      const result = await saveActivityToSupabase({
        formData,
        classId: targetClassId,
        fileUriOrBlob: formData.attachmentUri,
        targetStudentIds, // 👈 Se for undefined (turma inteira), a função envia pra todos
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
