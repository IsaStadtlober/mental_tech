import { Text, View } from "react-native";

import { WIZARD_CONSTANTS } from "../../constants/auth";
import { styles } from "../../styles";
import { getStudentsCountLabel } from "../../utils/wizard";
import { PrimaryButton } from "../PrimaryButton";
import { SuccessScreen } from "../SuccessScreen";

interface WizardDoneScreenProps {
  studentsCount: number;
  classCode?: string;
  classPin?: string;
  onBack: () => void;
  onGoDashboard: () => void;
  disabled?: boolean;
}

export function WizardDoneScreen({
  studentsCount,
  classCode,
  classPin,
  onBack,
  onGoDashboard,
  disabled = false,
}: WizardDoneScreenProps) {
  return (
    <SuccessScreen
      eyebrow={WIZARD_CONSTANTS.DONE_SCREEN.EYEBROW}
      title={`${studentsCount} ${getStudentsCountLabel(studentsCount)}!`}
      description={WIZARD_CONSTANTS.DONE_SCREEN.DESCRIPTION}
      onBack={onBack}
      footer={
        <PrimaryButton disabled={disabled} onPress={onGoDashboard} icon={false}>
          {disabled ? "Finalizando..." : WIZARD_CONSTANTS.DONE_SCREEN.BUTTON}
        </PrimaryButton>
      }
    >
      {(classCode || classPin) && (
        <View style={styles.credentialCard}>
          {classCode ? (
            <View style={styles.credentialRow}>
              <Text style={styles.credentialLabel}>Código da turma</Text>
              <Text style={styles.credentialValue}>{classCode}</Text>
            </View>
          ) : null}

          {classPin ? (
            <View style={styles.credentialRow}>
              <Text style={styles.credentialLabel}>PIN da turma</Text>
              <Text style={styles.credentialValue}>{classPin}</Text>
            </View>
          ) : null}
        </View>
      )}
    </SuccessScreen>
  );
}
