import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
    FadeIn,
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import Svg, { Path, Rect } from 'react-native-svg';

import { theme } from '../constants/theme';
import { useLoopValue } from '../hooks/useAnimations';
import { styles } from '../styles/styles';

interface ShapeProps {
  width?: number;
  height?: number;
  color?: string;
  opacity?: number;
}

function Cloud({
  width = 64,
  height = 40,
  color = theme.primary,
  opacity = 1,
}: ShapeProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 64 40" opacity={opacity}>
      <Path
        d="M16 30c-6 0-10-4.5-10-10 0-5 3.7-9 8.5-9.8C16 4.8 21 1 27 1c6.7 0 12.2 4.8 13.3 11.1C46 12.7 50 17.4 50 23c0 5-4 7-9 7H16z"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
    </Svg>
  );
}

function Tree({
  width = 40,
  height = 60,
  color = theme.primary,
  opacity = 1,
}: ShapeProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 40 60" opacity={opacity}>
      <Path
        d="M20 2 L32 24 H26 L34 38 H6 L14 24 H8 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />

      <Rect
        x="17"
        y="38"
        width="6"
        height="14"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
    </Svg>
  );
}

type DriftType = 'A' | 'B' | 'swayA' | 'swayB';
type ItemType = 'cloud' | 'tree';

interface BackgroundItemData {
  type: ItemType;
  style: ViewStyle;
  width: number;
  opacity: number;
  drift: DriftType;
  dur: number;
}

const BACKGROUND_VARIANTS: Record<string, BackgroundItemData[]> = {
  clouds: [
    { type: 'cloud', style: { top: '8%', left: '8%' }, width: 110, opacity: 0.35, drift: 'A', dur: 23000 },
    { type: 'cloud', style: { top: '15%', right: '8%' }, width: 90, opacity: 0.3, drift: 'B', dur: 28000 },
    { type: 'cloud', style: { top: '80%', right: '9%' }, width: 80, opacity: 0.25, drift: 'A', dur: 19500 },
    { type: 'cloud', style: { top: '49%', left: '10%' }, width: 65, opacity: 0.2, drift: 'B', dur: 24500 },
    { type: 'cloud', style: { top: '75%', left: '3%' }, width: 50, opacity: 0.15, drift: 'A', dur: 31000 },
    { type: 'cloud', style: { top: '46%', right: '12%' }, width: 60, opacity: 0.1, drift: 'B', dur: 21000 },
  ],

  trees: [
    { type: 'tree', style: { bottom: '5%', left: '8%' }, width: 70, opacity: 0.25, drift: 'swayA', dur: 6200 },
    { type: 'tree', style: { bottom: '15%', right: '5%' }, width: 100, opacity: 0.3, drift: 'swayB', dur: 7500 },
    { type: 'tree', style: { bottom: '2%', left: '42%' }, width: 50, opacity: 0.2, drift: 'swayA', dur: 5300 },
    { type: 'tree', style: { top: '11%', left: '15%' }, width: 60, opacity: 0.15, drift: 'swayB', dur: 8000 },
    { type: 'tree', style: { top: '30%', right: '20%' }, width: 40, opacity: 0.22, drift: 'swayA', dur: 6600 },
    { type: 'tree', style: { top: '62%', left: '10%' }, width: 80, opacity: 0.18, drift: 'swayB', dur: 8800 },
  ],

  mixedHigh: [
    { type: 'cloud', style: { top: '6%', left: '10%' }, width: 110, opacity: 0.35, drift: 'A', dur: 23000 },
    { type: 'cloud', style: { top: '16%', right: '12%' }, width: 80, opacity: 0.3, drift: 'B', dur: 28000 },
    { type: 'cloud', style: { top: '28%', left: '8%' }, width: 70, opacity: 0.25, drift: 'A', dur: 20000 },
    { type: 'tree', style: { bottom: '18%', left: '3%' }, width: 100, opacity: 0.3, drift: 'swayA', dur: 6200 },
    { type: 'tree', style: { bottom: '20%', right: '8%' }, width: 60, opacity: 0.25, drift: 'swayB', dur: 7500 },
    { type: 'tree', style: { bottom: '14%', left: '27%' }, width: 50, opacity: 0.2, drift: 'swayA', dur: 5300 },
    { type: 'tree', style: { bottom: '10%', right: '22%' }, width: 70, opacity: 0.15, drift: 'swayB', dur: 7500 },
  ],

  mixed: [
    { type: 'cloud', style: { top: '6%', left: '10%' }, width: 110, opacity: 0.35, drift: 'A', dur: 23000 },
    { type: 'cloud', style: { top: '16%', right: '12%' }, width: 80, opacity: 0.3, drift: 'B', dur: 28000 },
    { type: 'cloud', style: { top: '28%', left: '8%' }, width: 70, opacity: 0.25, drift: 'A', dur: 20000 },
    { type: 'tree', style: { bottom: '8%', left: '3%' }, width: 100, opacity: 0.25, drift: 'swayA', dur: 6200 },
    { type: 'tree', style: { bottom: '14%', right: '8%' }, width: 60, opacity: 0.3, drift: 'swayB', dur: 7500 },
    { type: 'tree', style: { bottom: '5%', left: '29%' }, width: 50, opacity: 0.2, drift: 'swayA', dur: 5300 },
    { type: 'tree', style: { bottom: '1%', right: '24%' }, width: 70, opacity: 0.3, drift: 'swayB', dur: 7500 },
  ],
};

const ASPECT: Record<ItemType, number> = {
  cloud: 40 / 64,
  tree: 60 / 40,
};

interface BackgroundItemProps {
  item: BackgroundItemData;
  color?: string;
  progress: SharedValue<number>;
}

function BackgroundItem({ item, color, progress }: BackgroundItemProps) {
  const h = Math.round(item.width * ASPECT[item.type]);

  const animatedStyle = useAnimatedStyle(() => {
    if (item.drift === 'A') {
      return {
        transform: [
          { translateX: progress.value * 10 },
          { translateY: progress.value * -4 },
        ],
      };
    }

    if (item.drift === 'B') {
      return {
        transform: [
          { translateX: progress.value * -12 },
          { translateY: progress.value * 5 },
        ],
      };
    }

    if (item.drift === 'swayA') {
      return {
        transformOrigin: 'bottom',
        transform: [{ rotate: `${progress.value * 3}deg` }],
      };
    }

    return {
      transformOrigin: 'bottom',
      transform: [{ rotate: `${progress.value * -3}deg` }],
    };
  });

  return (
    <Animated.View
      entering={FadeIn.duration(700)}
      style={[styles.bgItem, item.style, animatedStyle as any]}
    >
      {item.type === 'cloud' ? (
        <Cloud
          width={item.width}
          height={h}
          color={color || theme.primary}
          opacity={item.opacity}
        />
      ) : (
        <Tree
          width={item.width}
          height={h}
          color={color || theme.primary}
          opacity={item.opacity}
        />
      )}
    </Animated.View>
  );
}

interface BackgroundSceneProps {
  variant?: 'clouds' | 'trees' | 'mixedHigh' | 'mixed';
  tintColor?: string;
  isActive?: boolean;
}

export function BackgroundScene({ variant = 'clouds', tintColor, isActive = true }: BackgroundSceneProps) {
  const items = BACKGROUND_VARIANTS[variant] || BACKGROUND_VARIANTS.clouds;
  const progressA = useLoopValue(0, 1, 4200, 0, isActive);
  const progressB = useLoopValue(0, 1, 5200, 300, isActive);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {items.map((it, i) => {
        const progress = it.drift === 'A' || it.drift === 'swayA' ? progressA : progressB;

        return (
          <BackgroundItem
            key={`${variant}-${i}`}
            item={it}
            color={tintColor}
            progress={progress}
          />
        );
      })}
    </View>
  );
}