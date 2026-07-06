import {
    AtkinsonHyperlegible_400Regular,
    AtkinsonHyperlegible_700Bold,
} from '@expo-google-fonts/atkinson-hyperlegible';
import {
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Typography } from '../constants/theme';

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
    const [fontsLoaded, fontError] = useFonts({
        [Typography.headline.regular]: Quicksand_400Regular,
        [Typography.headline.medium]: Quicksand_500Medium,
        [Typography.headline.bold]: Quicksand_700Bold,
        [Typography.body.regular]: AtkinsonHyperlegible_400Regular,
        [Typography.body.bold]: AtkinsonHyperlegible_700Bold,
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}