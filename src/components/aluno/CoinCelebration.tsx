import { Coins, Sparkles } from 'lucide-react-native';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing, useAnimatedStyle, useSharedValue,
  withDelay, withSpring, withTiming
} from 'react-native-reanimated';
import { alunoStyles as s } from '../../styles/aluno/aluno';

export function CoinCelebration({
  reward,
  total,
}: {
  reward: number;
  total: number;
}) {
  const scale = useSharedValue(0.4);
  const rise = useSharedValue(22);
  const opacity = useSharedValue(0);
  useEffect(() => {
    scale.value = withSpring(1, { damping: 11 });
    rise.value = withTiming(0, {
      duration: 650,
      easing: Easing.out(Easing.cubic),
    });
    opacity.value = withDelay(120, withTiming(1, { duration: 350 }));
  }, [opacity, rise, scale]);
  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: rise.value }, { scale: scale.value }],
  }));
  return (
    <Animated.View style={[s.coinCelebration, style]}>
      <View style={s.coinBurst}>
        <Sparkles size={24} color="#FFE08A" />
        <Coins size={50} color="#FFD66B" />
        <Sparkles size={20} color="#FFE08A" />
      </View>
      <Text style={s.coinCelebrationValue}>+{reward} moedas!</Text>
      <Text style={s.coinCelebrationTotal}>Seu saldo agora é {total}</Text>
      <View style={s.halfwayPreview}>
        <View style={s.halfwayLine} />
        <View style={s.halfwayStart} />
        <View style={s.halfwayAvatar}>
          <Text style={s.halfwayAvatarText}>✦</Text>
        </View>
        <View style={s.halfwayFinish} />
      </View>
      <Text style={s.halfwayText}>
        Seu explorador avançou até a metade do caminho.
      </Text>
    </Animated.View>
  );
}