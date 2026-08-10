import { Backpack, Sparkles, Trophy } from "lucide-react-native";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { theme } from "../../constants/theme";
import { alunoStyles as s } from "../../styles/aluno";

export function RewardChest() {
  const open = useSharedValue(0);
  const item = useSharedValue(0);
  useEffect(() => {
    open.value = withSequence(
      withTiming(-4, { duration: 180 }),
      withTiming(4, { duration: 180 }),
      withTiming(0, { duration: 180 }),
      withSpring(1),
    );
    item.value = withDelay(260, withTiming(1, { duration: 420 }));
  }, [item, open]);
  const lid = useAnimatedStyle(() => ({
    transform: [
      { translateY: -open.value * 13 },
      { rotate: `${open.value * -5}deg` },
    ],
  }));
  const itemStyle = useAnimatedStyle(() => ({
    opacity: item.value,
    transform: [{ translateY: 8 * (1 - item.value) }],
  }));
  return (
    <View style={s.chestStage}>
      <Animated.View style={[s.rewardItem, itemStyle]}>
        <View style={s.rewardItemGlow} />
        <View style={s.rewardItemContent}>
          <Backpack size={54} color={theme.studentGoldAccent} />
          <View style={s.exclusiveMissionPill}>
            <Trophy size={12} color={theme.studentPurpleDeep} />
            <Text style={s.exclusiveMissionText}>Exclusivo de Missão</Text>
          </View>
        </View>
      </Animated.View>
      <View style={s.chestBody}>
        <Animated.View style={[s.chestLid, lid]}>
          <Sparkles size={20} color={theme.studentGemSoft} />
        </Animated.View>
        <View style={s.chestBase} />
      </View>
    </View>
  );
}
