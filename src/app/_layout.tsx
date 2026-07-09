// src/app/_layout.tsx
import {
    AtkinsonHyperlegible_400Regular,
    AtkinsonHyperlegible_700Bold,
    useFonts as useAtkinsonFonts,
} from '@expo-google-fonts/atkinson-hyperlegible';
import {
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    useFonts as useQuicksandFonts,
} from '@expo-google-fonts/quicksand';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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