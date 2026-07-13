import React from 'react';
import { SuccessScreen } from '../SuccessScreen';
import { PrimaryButton } from '../PrimaryButton';

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
      title={`${studentsCount} ${
        studentsCount === 1 ? 'aluno cadastrado' : 'alunos cadastrados'
      }!`}
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