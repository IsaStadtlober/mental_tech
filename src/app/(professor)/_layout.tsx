import { Stack } from 'expo-router';
import { ProfessorPrototypeProvider } from '@/hooks/useProfessorPrototype';

export default function ProfessorLayout() {
    return (
        <ProfessorPrototypeProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </ProfessorPrototypeProvider>
    );
}