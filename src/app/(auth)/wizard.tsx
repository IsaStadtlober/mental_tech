import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

import { AUTH_ROUTES } from "@/router";
import { WizardDoneScreen } from "../../components/wizard/WizardDoneScreen";
import { WizardStepClass } from "../../components/wizard/WizardStepClass";
import { WizardStepStudents } from "../../components/wizard/WizardStepStudents";
import { WizardStepTeacher } from "../../components/wizard/WizardStepTeacher";
import { useAuth } from "../../hooks/useAuth";
import { useWizardFlow } from "../../hooks/useWizardFlow";
import type { WizardSearchParams } from "../../types/auth";
import { generateClassCode, generateClassPin } from "../../utils/generators";

export default function WizardRoute() {
  const router = useRouter();
  const { schoolName } = useLocalSearchParams<WizardSearchParams>();
  const { state, setClassDetails, setTeacherData, setStudents, setStep } =
    useWizardFlow();

  const { finalizeSchoolOnboarding, loading: finalizing } = useAuth();
  const { step, classDetails, teacher, students, school } = state;
  const [classCredentials] = useState(() => ({
    code: generateClassCode(),
    pin: generateClassPin(),
  }));

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
          onBack={() => setStep(1)}
          onNext={(email) => setTeacherData({ name: "", email })}
          onSkip={() => setStep(3)}
        />
      );
    case 3:
      return (
        <WizardStepStudents onBack={() => setStep(2)} onFinish={setStudents} />
      );
    case 4:
      return (
        <WizardDoneScreen
          studentsCount={students.length}
          classCode={classCredentials.code}
          classPin={classCredentials.pin}
          onBack={() => setStep(3)}
          onGoDashboard={async () => {
            try {
              await finalizeSchoolOnboarding({
                school,
                classDetails: {
                  name: classDetails?.name ?? "",
                  grade: classDetails?.grade ?? "",
                  period: classDetails?.period ?? "",
                  code: classCredentials.code,
                  pin: classCredentials.pin,
                },
                teacher,
                students,
              });
              router.replace(AUTH_ROUTES.EDUCATOR.WELCOME as any);
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
