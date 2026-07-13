import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { theme } from '../../constants/theme';
import { ShapeProps } from '../../types/backgroundScene';

export function Tree({
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