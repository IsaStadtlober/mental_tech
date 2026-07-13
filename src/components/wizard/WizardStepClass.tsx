import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { ScreenShell } from '../ScreenShell';
import { PrimaryButton } from '../PrimaryButton';
import { FormField } from '../FormFields';
import { styles } from '../../styles/styles';
import { WizardProgress, WizardCaption, PeriodSelect } from './WizardShared';

export interface ClassData {
  name: string;
  grade: string;
  period: string;
}

interface WizardStepClassProps {
  onBack: () => void;
  onNext: (data: ClassData) => void;
  schoolName?: string;
}

export function WizardStepClass({ onBack, onNext, schoolName }: WizardStepClassProps) {
  const [className, setClassName] = useState('');
  const [grade, setGrade] = useState('');
  const [period, setPeriod] = useState('');

  const isFormValid =
    className.trim().length > 0 &&
    grade.trim().length > 0 &&
    period.trim().length > 0;

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
              name: className.trim(),
              grade: grade.trim(),
              period,
            })
          }
        >
          Criar turma
        </PrimaryButton>
      }
    >
      <WizardProgress step={0} total={3} />

      <WizardCaption>
        {schoolName ? `${schoolName} · Passo 1 de 3` : 'Passo 1 de 3'}
      </WizardCaption>

      <Text style={styles.screenTitle}>Crie sua primeira turma</Text>
      <Text style={styles.screenSubtitle}>
        Dê um nome para a turma que você vai gerenciar.
      </Text>

      <View style={{ gap: 16 }}>
        <FormField
          label="Nome da Turma"
          value={className}
          onChangeText={setClassName}
          placeholder="Ex: 4º Ano A"
          preset="educator"
        />
        
        <FormField
          label="Série/Ano"
          value={grade}
          onChangeText={setGrade}
          placeholder="Ex: 4º Ano"
          preset="educator"
        />

        <PeriodSelect value={period} onChange={setPeriod} />
      </View>
    </ScreenShell>
  );
}