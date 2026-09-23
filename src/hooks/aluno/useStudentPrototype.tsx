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

        // Fallback AsyncStorage
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

        // 🛍️ 2. BUSCAR ITENS DA LOJA (shop_items)
        console.log("🔍 [Shop] Buscando catálogo de itens...");
        const { data: shopItemsData } = await supabase
          .from("shop_items")
          .select("*")
          .order("price", { ascending: true });

        // 🎒 3. BUSCAR INVENTÁRIO DO ALUNO (student_inventories)
        console.log("🔍 [Shop] Buscando inventário do aluno...");
        const { data: inventoryData } = await supabase
          .from("student_inventories")
          .select("item_id")
          .eq("student_id", studentId);

        const ownedItemIds = inventoryData?.map((i) => i.item_id) || [];

        // 👕 4. BUSCAR AVATAR EQUIPADO (avatars)
        console.log("🔍 [Shop] Buscando visual equipado...");
        const { data: avatarData } = await supabase
          .from("avatars")
          .select("equipped_items")
          .eq("student_id", studentId)
          .maybeSingle();

        const equippedBySlot = avatarData?.equipped_items || {};

        // 📜 5. BUSCAR TRILHA DE MISSÕES
        console.log("🔍 [2] Buscando submissões...");
        const { data: submissions, error: subError } = await supabase
          .from("submissions")
          .select("*")
          .eq("student_id", studentId);

        if (subError) console.error("❌ Erro nas submissões:", subError);

        const activeSub =
          submissions?.find((sub: any) => sub.status !== "corrected") ||
          submissions?.[0];

        let activity: any = null;
        let resolvedTeacherName = "Professor";

        if (activeSub?.activity_id) {
          const { data: actData } = await supabase
            .from("activities")
            .select("*")
            .eq("id", activeSub.activity_id)
            .maybeSingle();

          activity = actData;

          if (activity?.teacher_id) {
            const { data: teacherData } = await supabase
              .from("teachers")
              .select("profile_id")
              .eq("id", activity.teacher_id)
              .maybeSingle();

            if (teacherData?.profile_id) {
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
        }

        const dbStatus = activeSub?.status ?? "not_submitted";
        let frontendStatus: any = "pending";
        if (dbStatus === "revision") frontendStatus = "revision";
        else if (dbStatus === "pending") frontendStatus = "awaitingReview";
        else if (dbStatus === "corrected") frontendStatus = "corrected";

        const rawAttachment = activity?.content_url || "";
        let finalFileUrl = "";

        if (rawAttachment) {
          if (rawAttachment.startsWith("http")) {
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

        dispatch({
          type: "loadSupabaseData",
          explorerName: student.name || "Explorador",
          coins: student.coins ?? 0,
          shopItems: shopItemsData || [],
          ownedItemIds,
          equippedBySlot,
          mission: activity
            ? {
                id: String(activity.id),
                title: activity.title ?? "Atividade Sem Título",
                instruction: activity.description ?? "",
                attachmentName:
                  activity.attachment_name || activity.attachment_url || "",
                fileUrl: finalFileUrl,
                teacherName: resolvedTeacherName,
                estimate: "20 min",
                rewardCoins: activity.reward_coins ?? 30,
                status: frontendStatus,
                responseName:
                  activeSub.student_answers || activeSub.attachment_url || "",
                firstRewardGranted: dbStatus === "corrected",
              }
            : INITIAL_STUDENT_PROTOTYPE_STATE.mission,
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

  // 💾 SALVA O VISUAL EQUIPADO NO SUPABASE
  const saveAvatar = useCallback(async () => {
    const activeStudentId = studentIdRef.current;
    if (!activeStudentId) return;

    try {
      console.log("💾 Salvando avatar equipado no Supabase...", state.equippedBySlot);
      const { error } = await supabase.from("avatars").upsert({
        student_id: activeStudentId,
        equipped_items: state.equippedBySlot,
        updated_at: new Date().toISOString(),
      });

      if (error) console.error("❌ Erro ao salvar avatar:", error);
      else console.log("✅ Avatar salvo com sucesso!");
    } catch (err) {
      console.error("💥 Erro de rede ao salvar avatar:", err);
    }
  }, [state.equippedBySlot]);

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
        const isLocalFile =
          actualFileUri &&
          (actualFileUri.startsWith("file://") ||
            actualFileUri.startsWith("content://") ||
            actualFileUri.startsWith("blob:"));

        if (isLocalFile) {
          const fileResponse = await fetch(actualFileUri);
          const uploadBody = await fileResponse.arrayBuffer();
          const sanitizedName = actualFileName.replace(/[^a-zA-Z0-9._-]/g, "_");
          const filePath = `respostas/${activeStudentId}/${state.mission.id}/${Date.now()}_${sanitizedName}`;

          const { error: uploadError } = await supabase.storage
            .from("exercicios")
            .upload(filePath, uploadBody, {
              contentType:
                fileResponse.headers.get("content-type") ||
                "application/octet-stream",
              upsert: true,
            });

          if (uploadError) throw new Error("Falha ao enviar o arquivo anexo.");

          const { data: publicUrlData } = supabase.storage
            .from("exercicios")
            .getPublicUrl(filePath);

          uploadedUrl = publicUrlData.publicUrl;
        }

        const { error: dbError } = await supabase
          .from("submissions")
          .update({
            status: "pending",
            student_answers: uploadedUrl || actualFileName,
            submitted_at: new Date().toISOString(),
          })
          .eq("student_id", activeStudentId)
          .eq("activity_id", state.mission.id);

        if (dbError) throw new Error("Erro ao salvar a submissão no banco.");

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

  // 🛒 COMPRA E EQUIPA ITENS PERSISTINDO NO SUPABASE
  const acquireOrEquip = useCallback(
    async (item: ShopItem): Promise<PurchaseResult> => {
      const owned = state.ownedItemIds.includes(item.id);
      if (!owned && item.missionOnly) return { kind: "missionExclusive" };
      if (!owned && state.session.coins < item.price)
        return {
          kind: "insufficientFunds",
          missingCoins: item.price - state.session.coins,
        };

      const activeStudentId = studentIdRef.current;

      // Se não possui, realiza a compra no Supabase
      if (!owned && activeStudentId) {
        // 1. Registra o item no inventário do aluno
        const { error: invError } = await supabase
          .from("student_inventories")
          .insert({ student_id: activeStudentId, item_id: item.id });

        if (invError) {
          console.error("❌ Erro ao adicionar ao inventário:", invError);
        }

        // 2. Deduz as moedas do aluno
        const remainingCoins = state.session.coins - item.price;
        const { error: coinError } = await supabase
          .from("students")
          .update({ coins: remainingCoins })
          .eq("id", activeStudentId);

        if (coinError) {
          console.error("❌ Erro ao atualizar moedas:", coinError);
        }
      }

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
      saveAvatar, // 👈 Exportado para a tela usar ao clicar em 'Salvar visual'
      equipReward,
      markNotificationRead,
    }),
    [
      state,
      setExplorerName,
      saveMission,
      submitMission,
      acquireOrEquip,
      saveAvatar,
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