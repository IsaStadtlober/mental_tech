import { useState } from 'react';
import { View } from 'react-native';

import { WIZARD_TOTAL_STEPS } from '../../constants/wizard';
import type { ClassData } from '../../types/wizard';
import { createEmptyClassData, getStepCaption, isClassDataValid } from '../../utils/wizard';
import { PrimaryButton } from '../PrimaryButton';
import { FormField } from '../form/FormField';
import { PeriodSelect, WizardStepLayout } from './WizardShared';

interface WizardStepClassProps {
  onBack: () => void;
  onNext: (data: ClassData) => void;
  schoolName?: string;
}

export function WizardStepClass({ onBack, onNext, schoolName }: WizardStepClassProps) {
  const [classData, setClassData] = useState<ClassData>(createEmptyClassData());

  const isFormValid = isClassDataValid(classData);

  const updateField = (field: keyof ClassData, value: string) => {
    setClassData((current) => ({ ...current, [field]: value }));
  };

  return (
    <WizardStepLayout
      step={0}
      total={WIZARD_TOTAL_STEPS}
      caption={getStepCaption(1, schoolName)}
      title="Crie sua primeira turma"
      subtitle="Dê um nome para a turma que você vai gerenciar."
      onBack={onBack}
      footerPadding={128}
      footer={
        <PrimaryButton
          disabled={!isFormValid}
          onPress={() =>
            isFormValid &&
            onNext({
              name: classData.name.trim(),
              grade: classData.grade.trim(),
              period: classData.period.trim(),
            })
          }
        >
          Criar turma
        </PrimaryButton>
      }
    >
      <View style={{ gap: 16 }}>
        <FormField
          label="Nome da Turma"
          value={classData.name}
          onChangeText={(value) => updateField('name', value)}
          placeholder="Ex: 4º Ano A"
          preset="educator"
        />

        <FormField
          label="Série/Ano"
          value={classData.grade}
          onChangeText={(value) => updateField('grade', value)}
          placeholder="Ex: 4º Ano"
          preset="educator"
        />

        <PeriodSelect value={classData.period} onChange={(value) => updateField('period', value)} />
      </View>
    </WizardStepLayout>
  );
}