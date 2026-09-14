import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { TRAIL_AVATAR_POSITIONS } from "../../constants/aluno/trail";
import { alunoStyles as s } from "../../styles/aluno";
import type { EquippedBySlot, MissionStatus } from "../../types/aluno";
import { ExplorerAvatar } from "./ExplorerAvatar";
export function TrailAvatar({
  status,
  equippedBySlot,
  name,
}: {
  status: MissionStatus;
  equippedBySlot: EquippedBySlot;
  name: string;
}) {
  const pos =
    TRAIL_AVATAR_POSITIONS[status] || TRAIL_AVATAR_POSITIONS.not_submitted;

  const x = useSharedValue(pos.left);
  const y = useSharedValue(pos.top);

  useEffect(() => {
    const targetPos =
      TRAIL_AVATAR_POSITIONS[status] || TRAIL_AVATAR_POSITIONS.not_submitted;
    x.value = withSpring(targetPos.left, { damping: 16 });
    y.value = withSpring(targetPos.top, { damping: 16 });
  }, [status, x, y]);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));
  return (
    <Animated.View pointerEvents="none" style={[s.trailAvatarPosition, style]}>
      <ExplorerAvatar
        compact
        equippedBySlot={equippedBySlot}
        name={name || "Explorador"}
      />
    </Animated.View>
  );
}
