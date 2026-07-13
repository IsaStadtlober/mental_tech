import { useRouter } from 'expo-router';
import { useState } from 'react';

// Importa os componentes de cada passo
import { WizardDoneScreen } from '../../components/wizard/WizardDoneScreen';
import { ClassData, WizardStepClass } from '../../components/wizard/WizardStepClass';
import { StudentData, WizardStepStudents } from '../../components/wizard/WizardStepStudents';
import { WizardStepTeacher } from '../../components/wizard/WizardStepTeacher';


export default function WizardRoute() {
  const router = useRouter();
  
  // Estado para controlar qual tela (passo) exibir
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  
  // Estado para guardar os dados entre os passos
  const [classDetails, setClassDetails] = useState<ClassData | null>(null);
  const [teacherEmail, setTeacherEmail] = useState<string>('');
  const [students, setStudents] = useState<StudentData[]>([]);

  switch (step) {
    case 1:
      return (
        <WizardStepClass
          onBack={() => router.back()}
          onNext={(data) => {
            setClassDetails(data);
            setStep(2);
          }}
          schoolName="Minha Escola" // Ou pegar do contexto
        />
      );
    case 2:
      return (
        <WizardStepTeacher
          classDetails={classDetails}
          onBack={() => setStep(1)}
          onNext={(email) => {
            setTeacherEmail(email);
            setStep(3);
          }}
          onSkip={() => setStep(3)}
        />
      );
    case 3:
      return (
        <WizardStepStudents
          onBack={() => setStep(2)}
          onFinish={(studentsData) => {
            setStudents(studentsData);
            // Aqui normalmente você faria o POST para sua API
            setStep(4);
          }}
        />
      );
    case 4:
      return (
        <WizardDoneScreen
          studentsCount={students.length}
          onBack={() => setStep(3)} // Se desejar permitir voltar
          onGoDashboard={() => {
            router.replace('/professor/bem-vindo');
          }}
        />
      );
    default:
      return null;
  }
}