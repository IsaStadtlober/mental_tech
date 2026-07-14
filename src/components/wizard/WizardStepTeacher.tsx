import { LinearGradient } from 'expo-linear-gradient';
import { GraduationCap } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { WIZARD_CONSTANTS } from '../../constants/auth';
import { theme } from '../../constants/theme';
import { WIZARD_TOTAL_STEPS } from '../../constants/wizard';
import { styles } from '../../styles';
import type { ClassData } from '../../types/wizard';
import { isTeacherEmailValid } from '../../utils/wizard';
import { PrimaryButton } from '../PrimaryButton';
import { FormField } from '../form/FormField';
import { WizardStepLayout } from './WizardShared';

interface WizardStepTeacherProps {
  onBack: () => void;
  onNext: (email: string) => void;
  onSkip: () => void;
  classDetails: ClassData | null;
}

export function WizardStepTeacher({
  onBack,
  onNext,
  onSkip,
  classDetails,
}: WizardStepTeacherProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const isEmailValid = isTeacherEmailValid(email);

  const handleLinkAndContinue = () => {
    if (!isEmailValid || status !== 'idle') return;
    setStatus('sending');

    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => {
        onNext(email.trim());
      }, 1000);
    }, 700);
  };

  const turmaNome = classDetails?.name || 'Turma não definida';
  const turmaPeriodo = classDetails?.period || '';

  return (
    <WizardStepLayout
      step={1}
      total={WIZARD_TOTAL_STEPS}
      caption={WIZARD_CONSTANTS.STEP_TEACHER.CAPTION}
      title={WIZARD_CONSTANTS.STEP_TEACHER.TITLE}
      subtitle={WIZARD_CONSTANTS.STEP_TEACHER.SUBTITLE}
      onBack={onBack}
      footer={
        <View style={{ gap: 16 }}>
          <PrimaryButton
            disabled={!isEmailValid || status !== 'idle'}
            onPress={handleLinkAndContinue}
          >
            {status === 'sending' ? WIZARD_CONSTANTS.STEP_TEACHER.BUTTONS.LINKING : status === 'sent' ? WIZARD_CONSTANTS.STEP_TEACHER.BUTTONS.LINKED : WIZARD_CONSTANTS.STEP_TEACHER.BUTTONS.LINK_AND_CONTINUE}
          </PrimaryButton>

          <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
            <Text style={[styles.skipSecondary, { opacity: status === 'idle' ? 1 : 0.45 }]}>
              {WIZARD_CONSTANTS.STEP_TEACHER.BUTTONS.SKIP}
            </Text>
          </TouchableOpacity>
        </View>
      }
    >
      <View style={styles.contextCard}>
        <LinearGradient
          colors={theme.gradPrimary as unknown as [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.contextIcon}
        >
          <GraduationCap size={24} color="#FFFFFF" />
        </LinearGradient>

        <View style={{ flex: 1 }}>
          <Text style={styles.contextLabel}>{WIZARD_CONSTANTS.STEP_TEACHER.LABELS.CONTEXT}</Text>
          <Text style={styles.contextTitle}>
            {turmaNome}
            {turmaPeriodo ? ` - ${turmaPeriodo}` : ''}
          </Text>
        </View>
      </View>

      <FormField
        label={WIZARD_CONSTANTS.STEP_TEACHER.LABELS.TEACHER_EMAIL}
        value={email}
        onChangeText={setEmail}
        placeholder={WIZARD_CONSTANTS.STEP_TEACHER.PLACEHOLDERS.TEACHER_EMAIL}
        preset="educator"
        keyboardType="email-address"
      />
    </WizardStepLayout>
  );
}