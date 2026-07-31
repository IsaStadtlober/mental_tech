import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useLoopValue } from '../../hooks/useAnimations';
import { alunoStyles as s } from '../../styles/aluno/aluno';

function DriftingCloud({
  top,
  left,
  delay,
  scale = 1,
}: {
  top: number;
  left: number;
  delay: number;
  scale?: number;
}) {
  const drift = useLoopValue(0, 1, 9000 + delay, delay);
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: drift.value * 18 - 9 },
      { translateY: drift.value * -4 },
      { scale },
    ],
  }));
  return (
    <Animated.View style={[s.trailCloud, { top, left }, style]}>
      <View style={s.trailCloudPuff} />
      <View style={[s.trailCloudPuff, s.trailCloudPuffTwo]} />
      <View style={[s.trailCloudPuff, s.trailCloudPuffThree]} />
    </Animated.View>
  );
}
function Firefly({
  top,
  left,
  delay,
}: {
  top: number;
  left: number;
  delay: number;
}) {
  const glow = useLoopValue(0.25, 1, 1600 + delay, delay);
  const style = useAnimatedStyle(() => ({
    opacity: glow.value,
    transform: [{ scale: 0.7 + glow.value * 0.5 }],
  }));
  return <Animated.View style={[s.firefly, { top, left }, style]} />;
}
export function TrailWorld() {
  return (
    <View pointerEvents="none" style={s.trailWorld}>
      <LinearGradient
        colors={['#DDF3ED', '#F5F0DE', '#FCF6F0']}
        style={s.trailSky}
      />
      <View style={s.mountainBack} />
      <View style={s.mountainFront} />
      <DriftingCloud top={42} left={24} delay={0} />
      <DriftingCloud top={170} left={238} delay={600} scale={0.75} />
      <DriftingCloud top={380} left={42} delay={1200} scale={0.6} />
      {[
        { top: 210, left: 42, delay: 0 },
        { top: 330, left: 282, delay: 300 },
        { top: 490, left: 38, delay: 600 },
        { top: 650, left: 278, delay: 900 },
        { top: 790, left: 55, delay: 1200 },
      ].map((x, i) => (
        <Firefly key={i} {...x} />
      ))}
      <View style={[s.trailBush, { top: 280, left: 12 }]} />
      <View style={[s.trailBush, { top: 580, right: 14 }]} />
      <View style={[s.trailBushSmall, { top: 735, left: 32 }]} />
    </View>
  );
}