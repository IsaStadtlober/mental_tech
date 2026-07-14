import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { WIZARD_PERIOD_OPTIONS } from '../../constants/auth';
import { styles } from '../../styles';
import { ScreenShell } from '../ScreenShell';

interface WizardProgressProps {
  step: number;
  total: number;
}

interface WizardStepLayoutProps {
  step: number;
  total: number;
  caption: React.ReactNode;
  title: string;
  subtitle?: string;
  onBack: () => void;
  footer?: React.ReactNode;
  footerPadding?: number;
  children: React.ReactNode;
}

export function WizardStepLayout({
  step,
  total,
  caption,
  title,
  subtitle,
  onBack,
  footer,
  footerPadding,
  children,
}: WizardStepLayoutProps) {
  return (
    <ScreenShell
      onBack={onBack}
      footerPadding={footerPadding}
      footer={footer}
    >
      <WizardProgress step={step} total={total} />
      <WizardCaption>{caption}</WizardCaption>

      <Text style={styles.screenTitle}>{title}</Text>
      {!!subtitle && <Text style={styles.screenSubtitle}>{subtitle}</Text>}

      {children}
    </ScreenShell>
  );
}

export function WizardProgress({ step, total }: WizardProgressProps) {
  return (
    <View style={styles.wizardProgress}>
      {Array.from({ length: total }).map((_, index) => (
        <View key={index} style={styles.progressItem}>
          <View
            style={[
              styles.progressDot,
              index <= step ? styles.progressDotActive : styles.progressDotInactive,
            ]}
          >
            <Text
              style={[
                styles.progressNumber,
                index <= step ? styles.progressNumberActive : styles.progressNumberInactive,
              ]}
            >
              {index + 1}
            </Text>
          </View>

          {index < total - 1 && (
            <View
              style={[
                styles.progressLine,
                index < step ? styles.progressLineActive : styles.progressLineInactive,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
}

export function WizardCaption({ children }: { children: React.ReactNode }) {
  return <Text style={styles.wizardCaption}>{children}</Text>;
}

interface PeriodOptionProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export function PeriodOption({ label, active, onPress }: PeriodOptionProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.82}
      style={[
        styles.periodOption,
        active ? styles.periodOptionActive : styles.periodOptionInactive,
      ]}
    >
      <Text
        style={[
          styles.periodOptionText,
          active ? styles.periodOptionTextActive : styles.periodOptionTextInactive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

interface PeriodSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function PeriodSelect({ value, onChange }: PeriodSelectProps) {
  return (
    <View style={styles.periodSelectWrap}>
      <Text style={styles.inputLabel}>Período</Text>

      <View style={styles.periodOptionsRow}>
        {WIZARD_PERIOD_OPTIONS.map((option) => (
          <PeriodOption
            key={option}
            label={option}
            active={value === option}
            onPress={() => onChange(option)}
          />
        ))}
      </View>
    </View>
  );
}