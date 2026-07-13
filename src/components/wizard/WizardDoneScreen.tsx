
import { getStudentsCountLabel } from '../../utils/wizard';
import { PrimaryButton } from '../PrimaryButton';
import { SuccessScreen } from '../SuccessScreen';

interface WizardDoneScreenProps {
  studentsCount: number;
  onBack: () => void;
  onGoDashboard: () => void;
}

export function WizardDoneScreen({
  studentsCount,
  onBack,
  onGoDashboard,
}: WizardDoneScreenProps) {
  return (
    <SuccessScreen
      eyebrow="Turma pronta"
      title={`${studentsCount} ${getStudentsCountLabel(studentsCount)}!`}
      description="Os PINs de cada aluno já estão prontos para impressão ou envio aos responsáveis."
      onBack={onBack}
      footer={
        <PrimaryButton onPress={onGoDashboard} icon={false}>
          Ir para o Dashboard
        </PrimaryButton>
      }
    />
  );
}