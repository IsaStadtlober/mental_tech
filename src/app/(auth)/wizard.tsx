import { useLocalSearchParams, useRouter } from "expo-router";

import { WizardDoneScreen } from "../../components/wizard/WizardDoneScreen";
import { WizardStepClass } from "../../components/wizard/WizardStepClass";
import { WizardStepStudents } from "../../components/wizard/WizardStepStudents";
import { WizardStepTeacher } from "../../components/wizard/WizardStepTeacher";
import { useAuth } from "../../hooks/useAuth";
import { useWizardFlow } from "../../hooks/useWizardFlow";
import type { WizardSearchParams } from "../../types/auth";

export default function WizardRoute() {
  const router = useRouter();
  const { schoolName } = useLocalSearchParams<WizardSearchParams>();
  const {
    state,
    setClassDetails,
    setTeacherData,
    setStudents,
    goBack,
    setStep,
  } = useWizardFlow();

  const { finalizeSchoolOnboarding, loading: finalizing } = useAuth();
  const { step, classDetails, teacher, students, school } = state;

  switch (step) {
    case 1:
      return (
        <WizardStepClass
          onBack={() => router.back()}
          onNext={setClassDetails}
          schoolName={schoolName || "Minha Escola"}
        />
      );
    case 2:
      return (
        <WizardStepTeacher
          classDetails={classDetails}
          onBack={() => goBack(1)}
          onNext={(email) => setTeacherData({ email })}
          onSkip={() => setStep(3)}
        />
      );
    case 3:
      return (
        <WizardStepStudents onBack={() => goBack(2)} onFinish={setStudents} />
      );
    case 4:
      return (
        <WizardDoneScreen
          studentsCount={students.length}
          onBack={() => goBack(3)}
          onGoDashboard={async () => {
            try {
              await finalizeSchoolOnboarding({
                school,
                classDetails: classDetails!,
                teacher,
                students,
              });
              router.replace("/professor/bem-vindo");
            } catch (err) {
              console.error("Falha ao finalizar onboarding:", err);
            }
          }}
          disabled={finalizing}
        />
      );
    default:
      return null;
  }
}
