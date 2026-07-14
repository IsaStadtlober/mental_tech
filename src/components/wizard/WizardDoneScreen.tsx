
import { WIZARD_CONSTANTS } from '../../constants/auth';
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
      eyebrow={WIZARD_CONSTANTS.DONE_SCREEN.EYEBROW}
      title={`${studentsCount} ${getStudentsCountLabel(studentsCount)}!`}
      description={WIZARD_CONSTANTS.DONE_SCREEN.DESCRIPTION}
      onBack={onBack}
      footer={
        <PrimaryButton onPress={onGoDashboard} icon={false}>
          {WIZARD_CONSTANTS.DONE_SCREEN.BUTTON}
        </PrimaryButton>
      }
    />
  );
}