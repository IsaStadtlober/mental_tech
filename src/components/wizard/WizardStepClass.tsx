import { useState } from 'react';
import { View } from 'react-native';

import { WIZARD_CONSTANTS, WIZARD_TOTAL_STEPS } from '../../constants/auth';
import type { ClassData } from '../../types/wizard';
import { createEmptyClassData, isClassDataValid } from '../../utils/wizard';
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
      caption={WIZARD_CONSTANTS.STEP_CLASS.CAPTION}
      title={WIZARD_CONSTANTS.STEP_CLASS.TITLE}
      subtitle={WIZARD_CONSTANTS.STEP_CLASS.SUBTITLE}
      onBack={onBack}
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
          {WIZARD_CONSTANTS.STEP_CLASS.BUTTON}
        </PrimaryButton>
      }
    >
      <View style={{ gap: 16 }}>
        <FormField
          label={WIZARD_CONSTANTS.STEP_CLASS.LABELS.CLASS_NAME}
          value={classData.name}
          onChangeText={(value) => updateField('name', value)}
          placeholder={WIZARD_CONSTANTS.STEP_CLASS.PLACEHOLDERS.CLASS_NAME}
          preset="educator"
        />

        <FormField
          label={WIZARD_CONSTANTS.STEP_CLASS.LABELS.GRADE}
          value={classData.grade}
          onChangeText={(value) => updateField('grade', value)}
          placeholder={WIZARD_CONSTANTS.STEP_CLASS.PLACEHOLDERS.GRADE}
          preset="educator"
        />

        <PeriodSelect value={classData.period} onChange={(value) => updateField('period', value)} />
      </View>
    </WizardStepLayout>
  );
}