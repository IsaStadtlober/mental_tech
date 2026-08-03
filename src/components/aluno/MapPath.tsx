import { memo } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { MAP_HEIGHT, MAP_PATH } from '../../constants/aluno/trail';
import { theme } from '../../constants/theme';
import type { MissionStatus } from '../../types/aluno';

export const MapPath = memo(function MapPath({
  status,
}: {
  status: MissionStatus;
}) {
  const progress =
    status === 'approved'
      ? 'M78 900 C105 840 230 810 255 720 C280 630 130 620 105 535'
      : status === 'awaitingReview'
      ? 'M78 900 C105 840 230 810 255 720 C262 690 252 666 230 645'
      : 'M78 900 C92 870 120 845 155 825';
  return (
    <Svg
      width="100%"
      height={MAP_HEIGHT}
      viewBox={`0 0 340 ${MAP_HEIGHT}`}
      style={StyleSheet.absoluteFill}
    >
      <Path
        d={MAP_PATH}
        fill="none"
        stroke={theme.studentMapTrail}
        strokeWidth="18"
        strokeLinecap="round"
      />
      <Path
        d={progress}
        fill="none"
        stroke={theme.primaryLight}
        strokeWidth="18"
        strokeLinecap="round"
      />
      <Path
        d={MAP_PATH}
        fill="none"
        stroke={theme.studentMapPathSoft}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="4 14"
      />
    </Svg>
  );
});