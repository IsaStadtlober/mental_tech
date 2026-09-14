import { ScrollView, View } from "react-native";
import { MAP_HEIGHT, MAP_NODE_ANCHORS } from "../../constants/aluno/trail";
import { alunoStyles as s } from "../../styles/aluno";
import type {
  EquippedBySlot,
  MapNodeState,
  MissionStatus,
} from "../../types/aluno";
import { MapLevel } from "./MapLevel";
import { MapPath } from "./MapPath";
import { MapScenery } from "./MapScenery";
import { TrailAvatar } from "./TrailAvatar";
import { TrailWorld } from "./TrailWorld";

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
  // Determina a fase ativa com base no status da atividade
  const current = status === "corrected" ? 2 : 1;

  const state = (id: number): MapNodeState => {
    if (id < current) return "completed";
    if (id === current) return "current";
    return "locked";
  };
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
        {MAP_NODE_ANCHORS.map((n) => {
          const isCurrentNode = n.id === current;

          return (
            <MapLevel
              key={n.id}
              node={{
                ...n,
                label: `Fase ${n.id}`,
                description: `Missão ${n.id}`,
              }}
              state={state(n.id)}
              missionStatus={isCurrentNode ? status : undefined}
              onPress={isCurrentNode ? onOpenMission : undefined}
            />
          );
        })}
        <TrailAvatar
          status={status}
          equippedBySlot={equippedBySlot}
          name={explorerName}
        />
      </View>
    </ScrollView>
  );
}
