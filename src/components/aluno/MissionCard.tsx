import {
  ChevronRight, Clock3, Coins, FileText, RotateCcw
} from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { MISSION_PRESENTATION } from '../../constants/aluno/missionPresentation';
import { theme } from '../../constants/theme';
import { alunoStyles as s } from '../../styles/aluno';
import type { StudentMission } from '../../types/aluno';

export interface MissionCardProps {
  mission: StudentMission;
  onPress(): void;
}

export function MissionCard({ mission, onPress }: MissionCardProps) {
  const presentation = MISSION_PRESENTATION[mission.status];
  const Icon =
    mission.status === 'revision'
      ? RotateCcw
      : mission.status === 'awaitingReview'
        ? Clock3
        : FileText;

  return (
    <View pointerEvents="box-none" style={s.missionOverlay}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${presentation.label}. ${mission.title}. ${presentation.action}`}
        accessibilityHint="Abre os detalhes da missão"
        onPress={onPress}
        style={({ pressed }) => [
          s.missionFixedCard,
          mission.status === 'revision' && s.missionCardRevision,
          pressed && s.interactiveSurfacePressed,
        ]}
      >
        <View
          style={[
            s.missionFixedIcon,
            mission.status === 'revision' && s.missionIconRevision,
          ]}
        >
          <Icon size={21} color="#fff" />
        </View>
        <View style={s.contentFlex}>
          <Text
            style={[
              s.missionFixedEyebrow,
              mission.status === 'revision' && s.missionEyebrowRevision,
            ]}
          >
            {presentation.label.toUpperCase()}
          </Text>
          <Text style={s.missionFixedTitle}>{mission.title}</Text>
          <View style={s.missionMetaRow}>
            <Clock3 size={12} color={theme.textMuted} />
            <Text style={s.missionFixedMeta}>{mission.estimate}</Text>
            <Coins size={12} color="#D6961D" />
            <Text style={s.missionFixedMeta}>+{mission.rewardCoins}</Text>
          </View>
          <Text style={[s.missionCta]}>{presentation.action}</Text>
        </View>
        <View style={[s.interactiveChevron]}>
          <ChevronRight
            size={18}
            color={
              mission.status === 'revision' ? theme.warning : theme.primary
            }
          />
        </View>
      </Pressable>
    </View>
  );
}