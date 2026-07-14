import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { styles } from '../styles';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}