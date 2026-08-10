import { memo } from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';
import { StyleSheet } from 'react-native';
import { MAP_HEIGHT } from '../../constants/aluno/trail';
import { theme } from '../../constants/theme';

export const MapScenery = memo(function MapScenery() {
  return (
    <Svg
      width="100%"
      height={MAP_HEIGHT}
      viewBox={`0 0 340 ${MAP_HEIGHT}`}
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
    >
      <G opacity={0.22} stroke={theme.primary} strokeWidth="2" fill="none">
        {[
          [18, 790, 0.72],
          [276, 835, 0.92],
          [22, 605, 0.88],
          [282, 545, 0.62],
          [18, 390, 0.68],
          [282, 235, 0.82],
          [26, 115, 0.58],
        ].map(([x, y, k], i) => (
          <G key={i} transform={`translate(${x} ${y}) scale(${k})`}>
            <Path d="M20 2 L32 24 H26 L34 38 H6 L14 24 H8 Z" />
            <Rect x="17" y="38" width="6" height="14" />
          </G>
        ))}
      </G>
    </Svg>
  );
});