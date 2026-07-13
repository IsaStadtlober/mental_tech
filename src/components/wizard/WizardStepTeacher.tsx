import { LinearGradient } from 'expo-linear-gradient';
import { GraduationCap } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
      caption="Passo 2 de 3"
      title="Vincular Professor"
      subtitle="Agora, informe quem será o responsável por guiar esta turma."
      onBack={onBack}
      footerPadding={148}
      footer={
        <View style={{ gap: 16 }}>
          <PrimaryButton
            disabled={!isEmailValid || status !== 'idle'}
            onPress={handleLinkAndContinue}
          >
            {status === 'sending' ? 'Vinculando...' : status === 'sent' ? 'Vinculado!' : 'Vincular e continuar'}
          </PrimaryButton>

          <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
            <Text style={[styles.skipSecondary, { opacity: status === 'idle' ? 1 : 0.45 }]}>
              Pular por enquanto
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
          <Text style={styles.contextLabel}>Contexto da Turma</Text>
          <Text style={styles.contextTitle}>
            {turmaNome}
            {turmaPeriodo ? ` - ${turmaPeriodo}` : ''}
          </Text>
        </View>
      </View>

      <FormField
        label="E-mail do professor"
        value={email}
        onChangeText={setEmail}
        placeholder="exemplo@escola.com"
        preset="educator"
        keyboardType="email-address"
      />
    </WizardStepLayout>
  );
}