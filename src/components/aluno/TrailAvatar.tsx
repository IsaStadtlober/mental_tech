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
  const x = useSharedValue(TRAIL_AVATAR_POSITIONS[status].left);
  const y = useSharedValue(TRAIL_AVATAR_POSITIONS[status].top);
  useEffect(() => {
    x.value = withSpring(TRAIL_AVATAR_POSITIONS[status].left, { damping: 16 });
    y.value = withSpring(TRAIL_AVATAR_POSITIONS[status].top - 26, {
      damping: 16,
    });
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
