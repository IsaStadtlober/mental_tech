import React from 'react';
import { StyleSheet, View } from 'react-native';

// Importações corrigidas subindo dois níveis para fora da pasta components/background
import { BACKGROUND_VARIANTS } from '../../constants/backgroundScene';
import { useLoopValue } from '../../hooks/useAnimations';
import { BackgroundSceneProps } from '../../types/backgroundScene';

// Como o BackgroundItem está na mesma pasta, a importação fica direta
import { BackgroundItem } from './BackgroundItem';

export function BackgroundScene({
    variant = 'clouds',
    tintColor,
    isActive = true,
}: BackgroundSceneProps) {
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