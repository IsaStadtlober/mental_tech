import { useState } from 'react';
import { Text, View } from 'react-native';

import { WIZARD_TOTAL_STEPS } from '../../constants/wizard';
import { styles } from '../../styles/styles';
import type { ClassData } from '../../types/wizard';
import { createEmptyClassData, getStepCaption, isClassDataValid } from '../../utils/wizard';
import { PrimaryButton } from '../PrimaryButton';
import { ScreenShell } from '../ScreenShell';
import { FormField } from '../form/FormField';
import { PeriodSelect, WizardCaption, WizardProgress } from './WizardShared';

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
    <ScreenShell
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
      <WizardProgress step={0} total={WIZARD_TOTAL_STEPS} />

      <WizardCaption>{getStepCaption(1, schoolName)}</WizardCaption>

      <Text style={styles.screenTitle}>Crie sua primeira turma</Text>
      <Text style={styles.screenSubtitle}>
        Dê um nome para a turma que você vai gerenciar.
      </Text>

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
    </ScreenShell>
  );
}