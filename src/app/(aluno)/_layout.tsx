import { Stack } from 'expo-router';
import { StudentPrototypeProvider } from '../../hooks/aluno/useStudentPrototype';
export default function StudentLayout() {
  return (
    <StudentPrototypeProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
    </StudentPrototypeProvider>
  );
}