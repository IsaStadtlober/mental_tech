import { supabase } from "@/service/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { INITIAL_STUDENT_PROTOTYPE_STATE } from "../../constants/aluno/fixtures";
import type {
  PurchaseResult,
  ShopItem,
  StudentPrototypeContextValue,
  SubmissionResult,
} from "../../types/aluno";
import { studentPrototypeReducer } from "./studentPrototypeReducer";

const StudentPrototypeContext =
  createContext<StudentPrototypeContextValue | null>(null);

export function StudentPrototypeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(
    studentPrototypeReducer,
    INITIAL_STUDENT_PROTOTYPE_STATE,
  );
  const studentIdRef = useRef<string | null>(null);

  useEffect(() => {
    async function loadFromSupabase() {
      try {
        console.log("🔍 [1] Buscando usuário logado no Supabase...");

        let student: { id: string; name?: string; coins?: number } | null =
          null;

        // 1. Tenta buscar pelo Auth oficial do Supabase
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user?.id) {
          const { data, error } = await supabase
            .from("students")
            .select("id, name, coins")
            .or(`id.eq.${user.id},profile_id.eq.${user.id}`)
            .maybeSingle();

          if (!error && data) {
            student = data;
          }
        }

        // 2. Fallback: Se não usar Auth padrão (ex: login por PIN), busca o ID salvo no AsyncStorage
        if (!student) {
          try {
            const storedStudentId =
              (await AsyncStorage.getItem("@student_id")) ||
              (await AsyncStorage.getItem("student_id"));

            if (storedStudentId) {
              const { data } = await supabase
                .from("students")
                .select("id, name, coins")
                .eq("id", storedStudentId)
                .maybeSingle();

              if (data) student = data;
            }
          } catch (storageErr) {
            console.log("⚠️ Erro ao ler AsyncStorage:", storageErr);
          }
        }

        if (!student) {
          console.log("❌ [1] Nenhum aluno logado encontrado.");
          return;
        }

        const studentId = student.id;
        studentIdRef.current = studentId;
        console.log("✅ [1] Aluno logado:", student.name, "| ID:", studentId);

        console.log(
          "🔍 [2] Buscando a trilha de missões (tabela 'submissions')...",
        );
        // Puxa todas as missões atribuídas a este aluno
        const { data: submissions, error: subError } = await supabase
          .from("submissions")
          .select("*")
          .eq("student_id", studentId);

        if (subError) console.error("❌ [2] Erro nas submissões:", subError);
        console.log("✅ [2] Missões atribuídas:", submissions?.length || 0);

        if (!submissions || submissions.length === 0) {
          console.log(
            "⚠️ [2] Nenhuma atividade foi atribuída a este aluno ainda.",
          );
          return;
        }

        // A missão ATIVA é a primeira da lista que não está finalizada/aprovada
        const activeSub =
          submissions.find((sub: any) => sub.status !== "corrected") ||
          submissions[0];

        console.log("🔍 [3] Buscando detalhes da atividade atual...");
        console.log(
          "-> ID da Atividade a ser buscada:",
          activeSub?.activity_id,
        );

        // 1. Busca os dados da atividade
        const { data: activity, error: actError } = await supabase
          .from("activities")
          .select("*")
          .eq("id", activeSub?.activity_id)
          .maybeSingle();

        if (actError || !activity) {
          console.error(
            "❌ [3] Erro ou Vazio! actError:",
            actError,
            "| activity:",
            activity,
          );
          return;
        }

        // 2. 🎯 BUSCA O NOME DO PROFESSOR pelo teacher_id da atividade
        let resolvedTeacherName = "Professor";
        if (activity.teacher_id) {
          // Pega o profile_id na tabela teachers
          const { data: teacherData } = await supabase
            .from("teachers")
            .select("profile_id")
            .eq("id", activity.teacher_id)
            .maybeSingle();

          if (teacherData?.profile_id) {
            // Busca o full_name na tabela profiles
            const { data: profileData } = await supabase
              .from("profiles")
              .select("full_name")
              .eq("id", teacherData.profile_id)
              .maybeSingle();

            if (profileData?.full_name) {
              resolvedTeacherName = profileData.full_name;
            }
          }
        }

        const dbStatus = activeSub.status ?? "not_submitted";

        // Regra de status visual do Mapa
        let frontendStatus: any = "pending";
        if (dbStatus === "revision") {
          frontendStatus = "revision";
        } else if (dbStatus === "pending") {
          frontendStatus = "awaitingReview";
        } else if (dbStatus === "corrected") {
          frontendStatus = "approved";
        }

        console.log("🚀 [4] Tudo pronto! Montando a missão:", activity.title);

        console.log(
          "🔍 [DEBUG] Valor exato salvo em content_url:",
          activity.content_url,
        );

        const rawAttachment = activity.content_url || "";
        let finalFileUrl = "";

        if (rawAttachment) {
          if (
            rawAttachment.startsWith("http://") ||
            rawAttachment.startsWith("https://")
          ) {
            finalFileUrl = rawAttachment;
          } else {
            let cleanPath = rawAttachment.replace(/^\/+/, "");

            if (cleanPath.startsWith("exercicios/")) {
              cleanPath = cleanPath.replace("exercicios/", "");
            }

            const { data: urlData } = supabase.storage
              .from("exercicios")
              .getPublicUrl(cleanPath);

            finalFileUrl = urlData.publicUrl;
          }
        }

        console.log("🔗 [DEBUG] URL gerada no final:", finalFileUrl);

        dispatch({
          type: "loadSupabaseData",
          explorerName: student.name || "Explorador",
          coins: student.coins ?? 0,
          mission: {
            id: String(activity.id),
            title: activity.title ?? "Atividade Sem Título",
            instruction: activity.description ?? "",
            attachmentName:
              activity.attachment_name || activity.attachment_url || "",
            fileUrl: finalFileUrl,
            teacherName: resolvedTeacherName, // 👈 Passa o nome buscado aqui
            estimate: "20 min",
            rewardCoins: activity.reward_coins ?? 30,
            status: frontendStatus,
            responseName:
              activeSub.student_answers || activeSub.attachment_url || "",
            firstRewardGranted: dbStatus === "corrected",
          },
        });
      } catch (err) {
        console.error("💥 Erro fatal ao conectar Supabase:", err);
      }
    }

    loadFromSupabase();
  }, []);
  const setExplorerName = useCallback(
    (name: string) => dispatch({ type: "setExplorerName", name }),
    [],
  );
  const saveMission = useCallback(() => dispatch({ type: "saveMission" }), []);
  const submitMission = useCallback(
    async (
      fileUriOrName: string,
      fileName?: string,
    ): Promise<SubmissionResult> => {
      const actualFileName = fileName ? fileName : fileUriOrName;
      const actualFileUri = fileName ? fileUriOrName : "";

      if (!actualFileName.trim()) {
        return {
          kind: "invalid",
          message: "Escolha um arquivo antes de enviar.",
        };
      }

      try {
        const activeStudentId =
          studentIdRef.current ||
          (await AsyncStorage.getItem("@student_id")) ||
          (await AsyncStorage.getItem("student_id"));

        if (!activeStudentId) {
          return {
            kind: "invalid",
            message: "Aluno não identificado. Faça login novamente.",
          };
        }

        let uploadedUrl = "";

        // 1. Verifica se é um arquivo local válido (file:// ou content:// do Android)
        const isLocalFile =
          actualFileUri &&
          (actualFileUri.startsWith("file://") ||
            actualFileUri.startsWith("content://") ||
            actualFileUri.startsWith("blob:"));

        if (isLocalFile) {
          console.log("📤 Enviando resposta para exercicios/respostas/...");
          const fileResponse = await fetch(actualFileUri);
          const uploadBody = await fileResponse.arrayBuffer();

          const sanitizedName = actualFileName.replace(/[^a-zA-Z0-9._-]/g, "_");
          // 📁 Caminho organizado: exercicios > respostas / ID_ALUNO / ID_ATIVIDADE / arquivo.ext
          const filePath = `respostas/${activeStudentId}/${state.mission.id}/${Date.now()}_${sanitizedName}`;

          const { error: uploadError } = await supabase.storage
            .from("exercicios")
            .upload(filePath, uploadBody, {
              contentType:
                fileResponse.headers.get("content-type") ||
                "application/octet-stream",
              upsert: true,
            });

          if (uploadError) {
            console.error("❌ Erro no upload Storage:", uploadError);
            throw new Error("Falha ao enviar o arquivo anexo.");
          }

          const { data: publicUrlData } = supabase.storage
            .from("exercicios")
            .getPublicUrl(filePath);

          uploadedUrl = publicUrlData.publicUrl;
        }

        // 2. Grava na coluna student_answer e atualiza status para pending
        const { error: dbError } = await supabase
          .from("submissions")
          .update({
            status: "pending",
            student_answers: uploadedUrl || actualFileName, // 👈 Salva a URL da resposta do aluno aqui
            submitted_at: new Date().toISOString(),
          })
          .eq("student_id", activeStudentId)
          .eq("activity_id", state.mission.id);

        if (dbError) {
          console.error("❌ Erro ao atualizar submissions no banco:", dbError);
          throw new Error("Erro ao salvar a submissão no banco.");
        }

        // 3. Atualiza o estado do Reducer local
        const firstSubmission = !state.mission.firstRewardGranted;
        dispatch({
          type: "submitMission",
          fileName: actualFileName,
          firstSubmission,
        });

        return firstSubmission
          ? { kind: "firstSubmission", coinsGranted: state.mission.rewardCoins }
          : { kind: "resubmission" };
      } catch (error: any) {
        console.error("💥 Erro durante o envio da missão:", error);
        return {
          kind: "invalid",
          message: error.message || "Ocorreu um erro ao enviar sua resposta.",
        };
      }
    },
    [
      state.mission.id,
      state.mission.firstRewardGranted,
      state.mission.rewardCoins,
    ],
  );
  const acquireOrEquip = useCallback(
    (item: ShopItem): PurchaseResult => {
      const owned = state.ownedItemIds.includes(item.id);
      if (!owned && item.missionOnly) return { kind: "missionExclusive" };
      if (!owned && state.session.coins < item.price)
        return {
          kind: "insufficientFunds",
          missingCoins: item.price - state.session.coins,
        };
      dispatch({ type: "buyOrEquip", item });
      return owned
        ? { kind: "equipped" }
        : {
            kind: "purchased",
            remainingCoins: state.session.coins - item.price,
          };
    },
    [state.ownedItemIds, state.session.coins],
  );
  const equipReward = useCallback(() => dispatch({ type: "equipReward" }), []);
  const markNotificationRead = useCallback(
    (notificationId: string) =>
      dispatch({ type: "markNotificationRead", notificationId }),
    [],
  );
  const value = useMemo(
    () => ({
      ...state,
      setExplorerName,
      saveMission,
      submitMission,
      acquireOrEquip,
      equipReward,
      markNotificationRead,
    }),
    [
      state,
      setExplorerName,
      saveMission,
      submitMission,
      acquireOrEquip,
      equipReward,
      markNotificationRead,
    ],
  );
  return (
    <StudentPrototypeContext.Provider value={value}>
      {children}
    </StudentPrototypeContext.Provider>
  );
}

export function useStudentPrototype() {
  const value = useContext(StudentPrototypeContext);
  if (!value)
    throw new Error(
      "useStudentPrototype deve estar dentro de StudentPrototypeProvider",
    );
  return value;
}
