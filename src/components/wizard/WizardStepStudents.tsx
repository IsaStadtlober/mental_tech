import { Upload } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { WIZARD_CONSTANTS, WIZARD_TOTAL_STEPS } from '../../constants/auth';
import { theme } from '../../constants/theme';
import { styles } from '../../styles';
import type { StudentData } from '../../types/wizard';
import { createEmptyStudent, getFilledStudents } from '../../utils/wizard';
import { PrimaryButton } from '../PrimaryButton';
import { FormField } from '../form/FormField';
import { WizardStepLayout } from './WizardShared';

interface WizardStepStudentsProps {
  onBack: () => void;
  onFinish: (students: StudentData[]) => void;
}

export function WizardStepStudents({ onBack, onFinish }: WizardStepStudentsProps) {
  const [students, setStudents] = useState<StudentData[]>([createEmptyStudent()]);

  const updateStudent = (index: number, field: keyof StudentData, value: string) => {
    setStudents((current) => {
      const nextStudents = [...current];
      nextStudents[index][field] = value;
      return nextStudents;
    });
  };

  const addStudent = () => {
    setStudents((current) => [...current, createEmptyStudent()]);
  };

  const removeStudent = (indexToRemove: number) => {
    if (students.length === 1) return;
    setStudents((current) => current.filter((_, index) => index !== indexToRemove));
  };

  const handleBatchImport = async () => {
    Alert.alert(WIZARD_CONSTANTS.STEP_STUDENTS.ALERTS.IMPORT_TITLE, WIZARD_CONSTANTS.STEP_STUDENTS.ALERTS.IMPORT_MESSAGE);
  };

  const filledStudents = getFilledStudents(students);

  return (
    <WizardStepLayout
      step={2}
      total={WIZARD_TOTAL_STEPS}
      caption={WIZARD_CONSTANTS.STEP_STUDENTS.CAPTION}
      title={WIZARD_CONSTANTS.STEP_STUDENTS.TITLE}
      subtitle={WIZARD_CONSTANTS.STEP_STUDENTS.SUBTITLE}
      onBack={onBack}
      footer={
        <PrimaryButton disabled={filledStudents.length === 0} onPress={() => onFinish(filledStudents)}>
          {WIZARD_CONSTANTS.STEP_STUDENTS.TEXTS.BUTTON_FINISH}
        </PrimaryButton>
      }
    >
      <Text style={styles.sectionLabel}>{WIZARD_CONSTANTS.STEP_STUDENTS.TEXTS.IMPORT_SECTION}</Text>

      <TouchableOpacity onPress={handleBatchImport} activeOpacity={0.9} style={styles.uploadBox}>
        <View style={styles.uploadIconBox}>
          <Upload size={24} color={theme.textMuted || '#A79E90'} />
        </View>

        <Text style={styles.uploadTitle}>{WIZARD_CONSTANTS.STEP_STUDENTS.TEXTS.UPLOAD_TITLE}</Text>

        <Text style={styles.uploadSubtitle}>{WIZARD_CONSTANTS.STEP_STUDENTS.TEXTS.UPLOAD_SUBTITLE}</Text>
      </TouchableOpacity>

      <View style={styles.orRow}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>{WIZARD_CONSTANTS.STEP_STUDENTS.TEXTS.OR}</Text>
        <View style={styles.orLine} />
      </View>

      <View style={styles.studentManualBlock}>
        {students.map((student, index) => (
          <View key={index} style={{ gap: 12, marginBottom: 16 }}>
            <View style={styles.studentBlockHeader}>
              <Text style={styles.studentBlockTitle}>{WIZARD_CONSTANTS.STEP_STUDENTS.TEXTS.STUDENT_NUMBER} {index + 1}</Text>
              {students.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeStudent(index)}
                  activeOpacity={0.75}
                  style={styles.removeStudentButton}
                >
                  <Text style={styles.removeStudentText}>{WIZARD_CONSTANTS.STEP_STUDENTS.TEXTS.REMOVE_BUTTON}</Text>
                </TouchableOpacity>
              )}
            </View>

            <FormField
              label={WIZARD_CONSTANTS.STEP_STUDENTS.LABELS.STUDENT_NAME}
              value={student.name}
              onChangeText={(value) => updateStudent(index, 'name', value)}
              placeholder={WIZARD_CONSTANTS.STEP_STUDENTS.PLACEHOLDERS.STUDENT_NAME}
              preset="educator"
            />
            <FormField
              label={WIZARD_CONSTANTS.STEP_STUDENTS.LABELS.STUDENT_CONTACT}
              value={student.contact}
              onChangeText={(value) => updateStudent(index, 'contact', value)}
              placeholder={WIZARD_CONSTANTS.STEP_STUDENTS.PLACEHOLDERS.STUDENT_CONTACT}
              preset="educator"
            />
          </View>
        ))}
      </View>

      <TouchableOpacity onPress={addStudent} style={styles.addStudent} activeOpacity={0.75}>
        <Text style={styles.addStudentText}>{WIZARD_CONSTANTS.STEP_STUDENTS.TEXTS.ADD_MORE}</Text>
      </TouchableOpacity>
    </WizardStepLayout>
  );
}