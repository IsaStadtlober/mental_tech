import {
  CheckCircle, Clock3, FileText, Lock, RotateCcw
} from 'lucide-react-native';
import { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../constants/theme';
import { alunoStyles as s } from '../../styles/aluno';
import type { MapNode, MapNodeState, MissionStatus } from '../../types/aluno';

export const MapLevel = memo(function MapLevel({
  node,
  state,
  missionStatus,
  onPress,
}: {
  node: MapNode;
  state: MapNodeState;
  missionStatus?: MissionStatus;
  onPress?: () => void;
}) {
  const Icon =
    missionStatus === 'revision'
      ? RotateCcw
      : missionStatus === 'awaitingReview'
        ? Clock3
        : state === 'completed'
          ? CheckCircle
          : state === 'locked'
            ? Lock
            : FileText;
  const statusText =
    missionStatus === 'revision'
      ? 'Revisar'
      : missionStatus === 'awaitingReview'
        ? 'Aguardando'
        : missionStatus === 'inProgress'
          ? 'Em andamento'
          : missionStatus === 'pending'
            ? 'Nova missão'
            : undefined;
  return (
    <View style={s.mapNodePosition(node.x - 40, node.y - 40)}>
      {state === 'current' && (
        <View
          style={[
            s.mapNodeHalo,
            missionStatus === 'revision' && s.mapNodeHaloRevision,
          ]}
        />
      )}
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={`${node.label}. ${statusText || node.description}`}
        disabled={!onPress}
        onPress={onPress}
        style={[
          s.mapNode,
          state === 'completed' && s.mapNodeDone,
          state === 'current' && s.mapNodeCurrent,
          state === 'locked' && s.mapNodeLocked,
          missionStatus === 'revision' && s.mapNodeRevision,
        ]}
      >
        <Icon
          size={state === 'locked' ? 24 : 28}
          color={state === 'locked' ? theme.textFaint : theme.white}
        />
        {missionStatus === 'pending' && (
          <View style={s.pendingBadge}>
            <Text style={s.pendingBadgeText}>!</Text>
          </View>
        )}
      </TouchableOpacity>
      <View
        style={[
          s.mapNodeLabel,
          node.x > 170 ? s.mapLabelLeft : s.mapLabelRight,
        ]}
      >
        <Text style={s.mapNodeTitle}>{node.label}</Text>
        <Text style={s.mapNodeText}>{statusText || node.description}</Text>
      </View>
    </View>
  );
});