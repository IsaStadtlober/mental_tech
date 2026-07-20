import ActivityFormScreen from '@/components/professor/ActivityForm';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import { useProfessorPrototype } from '@/hooks/useProfessorPrototype';
import { useLocalSearchParams, useRouter } from 'expo-router';
export default function NewActivityRoute() { const router = useRouter(); const { studentName } = useLocalSearchParams<{ studentName?: string }>(); const { students, saveActivity } = useProfessorPrototype(); return <ProfessorRouteShell currentDestination="activities"><ActivityFormScreen availableStudents={students} initialStudentName={studentName} onBack={() => router.back()} onSave={(data) => { saveActivity(data); router.replace('/(professor)/atividades' as any); }} /></ProfessorRouteShell>; }