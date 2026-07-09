// src/app/_layout.tsx
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import {
    useFonts as useQuicksandFonts,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import {
    useFonts as useAtkinsonFonts,
    AtkinsonHyperlegible_400Regular,
    AtkinsonHyperlegible_700Bold,
} from '@expo-google-fonts/atkinson-hyperlegible';

SplashScreen.preventAutoHideAsync().catch(() => { });

export default function RootLayout() {
    const [quicksandLoaded] = useQuicksandFonts({
        Quicksand_500Medium,
        Quicksand_600SemiBold,
        Quicksand_700Bold,
    });
    const [atkinsonLoaded] = useAtkinsonFonts({
        AtkinsonHyperlegible_400Regular,
        AtkinsonHyperlegible_700Bold,
    });

    const fontsLoaded = quicksandLoaded && atkinsonLoaded;

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync().catch(() => { });
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return (
        <GestureHandlerRootView style={styles.gestureRoot}>
            <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    gestureRoot: {
        flex: 1,
        backgroundColor: '#FCF6F0',
    },
});