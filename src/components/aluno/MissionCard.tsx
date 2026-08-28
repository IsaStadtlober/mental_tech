import {
  ChevronRight,
  Clock3,
  Coins,
  FileText,
  RotateCcw,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MISSION_PRESENTATION } from "../../constants/aluno/missionPresentation";
import { theme } from "../../constants/theme";
import { alunoStyles as s } from "../../styles/aluno";
import type { MissionCardProps } from "../../types/aluno";

export function MissionCard({ mission, onPress }: MissionCardProps) {
  // 1. Hook no topo (resolve o erro de Rules of Hooks)
  const insets = useSafeAreaInsets();

  if (!mission) return null;

  const displayTitle = mission.title || "Buscando missão...";
  const displayStatus = mission.status || "pending";
  const presentation = MISSION_PRESENTATION[displayStatus];

  const Icon =
    displayStatus === "not_submitted"
      ? RotateCcw
      : displayStatus === "revision"
        ? Clock3
        : FileText;

  return (
    <View
      pointerEvents="box-none"
      style={[s.missionOverlay, { bottom: 16 + insets.bottom }]}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          s.missionFixedCard,
          displayStatus === "not_submitted" && s.missionCardRevision,
          pressed && s.interactiveSurfacePressed,
        ]}
      >
        <View
          style={[
            s.missionFixedIcon,
            displayStatus === "not_submitted" && s.missionIconRevision,
          ]}
        >
          <Icon size={21} color={theme.white} />
        </View>

        <View style={s.contentFlex}>
          <Text style={[s.missionFixedEyebrow]}>
            {presentation?.label?.toUpperCase()}
          </Text>
          <Text style={s.missionFixedTitle}>{displayTitle}</Text>

          <View style={s.missionMetaRow}>
            {Boolean(mission.estimate) && (
              <>
                <Clock3 size={12} color={theme.textMuted} />
                <Text style={s.missionFixedMeta}>{mission.estimate}</Text>
              </>
            )}

            {/* 2. Boolean() evita vazamento de string vazia (resolve Unexpected text node) */}
            {Boolean(mission.rewardCoins > 0 || mission.title) && (
              <>
                <Coins size={12} color={theme.studentGold} />
                <Text style={s.missionFixedMeta}>
                  +{mission.rewardCoins || 0}
                </Text>
              </>
            )}
          </View>

          <Text style={[s.missionCta]}>{presentation?.action}</Text>
        </View>

        <View style={[s.interactiveChevron]}>
          <ChevronRight
            size={18}
            color={
              displayStatus === "not_submitted" ? theme.warning : theme.primary
            }
          />
        </View>
      </Pressable>
    </View>
  );
}
