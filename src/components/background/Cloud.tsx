import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../constants/theme';
import { ShapeProps } from '../../types/backgroundScene';

export function Cloud({
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