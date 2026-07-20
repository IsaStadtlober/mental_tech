import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from 'react-native';
import ActivityFormScreen from '@/components/professor/ActivityForm';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import { useProfessorPrototype } from '@/hooks/useProfessorPrototype';

export default function EditActivityRoute() {
    const router = useRouter();
    const { activityId } = useLocalSearchParams<{ activityId: string }>();
    const { activities, students, saveActivity } = useProfessorPrototype();

    const activity = activities.find((item) => item.id === activityId);

    return (
        <ProfessorRouteShell currentDestination="activities">
            {activity ? (
                <ActivityFormScreen
                    activity={activity}
                    availableStudents={students}
                    onBack={() => router.back()}
                    onSave={(data) => {
                        saveActivity(data, activityId);
                        router.back();
                    }}
                />
            ) : (
                <Text>Atividade não encontrada.</Text>
            )}
        </ProfessorRouteShell>
    );
}