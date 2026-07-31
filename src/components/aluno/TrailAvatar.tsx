import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle, useSharedValue, withSpring
} from 'react-native-reanimated';
import { alunoStyles as s } from '../../styles/aluno/aluno';
import type { EquippedBySlot, MissionStatus } from '../../types/aluno';
import { ExplorerAvatar } from './ExplorerAvatar';

const positions: Record<MissionStatus, { left: number; top: number }> = {
  pending: { left: 42, top: 820 },
  inProgress: { left: 42, top: 820 },
  awaitingReview: { left: 160, top: 748 },
  revision: { left: 160, top: 748 },
  approved: { left: 217, top: 650 },
};
export function TrailAvatar({
  status,
  equippedBySlot,
  name,
}: {
  status: MissionStatus;
  equippedBySlot: EquippedBySlot;
  name: string;
}) {
  const x = useSharedValue(positions[status].left);
  const y = useSharedValue(positions[status].top);
  useEffect(() => {
    x.value = withSpring(positions[status].left, { damping: 16 });
    y.value = withSpring(positions[status].top, { damping: 16 });
  }, [status, x, y]);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));
  return (
    <Animated.View pointerEvents="none" style={[s.trailAvatarPosition, style]}>
      <ExplorerAvatar
        compact
        equippedBySlot={equippedBySlot}
        name={name || 'Explorador'}
      />
    </Animated.View>
  );
}