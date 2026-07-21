import { ProfessorPrototypeProvider } from '@/hooks/professor/useProfessorPrototype';
import { Stack } from 'expo-router';

export default function ProfessorLayout() {
    return (
        <ProfessorPrototypeProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </ProfessorPrototypeProvider>
    );
}