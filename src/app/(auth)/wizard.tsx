import { useLocalSearchParams, useRouter } from 'expo-router';

import { WizardDoneScreen } from '../../components/wizard/WizardDoneScreen';
import { WizardStepClass } from '../../components/wizard/WizardStepClass';
import { WizardStepStudents } from '../../components/wizard/WizardStepStudents';
import { WizardStepTeacher } from '../../components/wizard/WizardStepTeacher';
import { useWizardFlow } from '../../hooks/useWizardFlow';
import type { WizardSearchParams } from '../../types/auth';

export default function WizardRoute() {
  const router = useRouter();
  const { schoolName } = useLocalSearchParams<WizardSearchParams>();
  const { state, saveClassDetails, saveTeacherEmail, saveStudents, goBack, goToStep } = useWizardFlow();

  const { step, classDetails, students } = state;

  switch (step) {
    case 1:
      return (
        <WizardStepClass
          onBack={() => router.back()}
          onNext={saveClassDetails}
          schoolName={schoolName || 'Minha Escola'}
        />
      );
    case 2:
      return (
        <WizardStepTeacher
          classDetails={classDetails}
          onBack={() => goBack(1)}
          onNext={saveTeacherEmail}
          onSkip={() => goToStep(3)}
        />
      );
    case 3:
      return (
        <WizardStepStudents
          onBack={() => goBack(2)}
          onFinish={saveStudents}
        />
      );
    case 4:
      return (
        <WizardDoneScreen
          studentsCount={students.length}
          onBack={() => goBack(3)}
          onGoDashboard={() => router.replace('/professor/bem-vindo')}
        />
      );
    default:
      return null;
  }
}