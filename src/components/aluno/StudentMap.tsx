import { ScrollView, View } from 'react-native';
import { MAP_HEIGHT, MAP_NODES } from '../../constants/aluno/trail';
import { alunoStyles as s } from '../../styles/aluno';
import type {
    EquippedBySlot,
    MapNodeState,
    MissionStatus,
} from '../../types/aluno';
import { MapLevel } from './MapLevel';
import { MapPath } from './MapPath';
import { MapScenery } from './MapScenery';
import { TrailAvatar } from './TrailAvatar';
import { TrailWorld } from './TrailWorld';

export function StudentMap({
  status,
  equippedBySlot,
  explorerName,
  onOpenMission,
}: {
  status: MissionStatus;
  equippedBySlot: EquippedBySlot;
  explorerName: string;
  onOpenMission(): void;
}) {
  const current =
    status === 'approved'
      ? 3
      : status === 'awaitingReview' || status === 'revision'
        ? 2
        : 1;
  const state = (id: number): MapNodeState =>
    id < current ? 'completed' : id === current ? 'current' : 'locked';
  return (
    <ScrollView
      style={s.flexOne}
      contentContainerStyle={s.mapScrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={s.mapCanvasHeight(MAP_HEIGHT)}>
        <TrailWorld />
        <MapScenery />
        <MapPath status={status} />
        {MAP_NODES.map((n) => (
          <MapLevel
            key={n.id}
            node={n}
            state={state(n.id)}
            missionStatus={n.id === 2 ? status : undefined}
            onPress={n.id === 2 ? onOpenMission : undefined}
          />
        ))}
        <TrailAvatar
          status={status}
          equippedBySlot={equippedBySlot}
          name={explorerName}
        />
      </View>
    </ScrollView>
  );
}