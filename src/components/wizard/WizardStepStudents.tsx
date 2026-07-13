import { Upload } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { theme } from '../../constants/theme';
import { WIZARD_TOTAL_STEPS } from '../../constants/wizard';
import { styles } from '../../styles/styles';
import type { StudentData } from '../../types/wizard';
import { createEmptyStudent, getFilledStudents } from '../../utils/wizard';
import { PrimaryButton } from '../PrimaryButton';
import { ScreenShell } from '../ScreenShell';
import { FormField } from '../form/FormField';
import { WizardCaption, WizardProgress } from './WizardShared';

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
    Alert.alert('Importação', 'Aqui implementaremos o expo-document-picker para ler o CSV.');
  };

  const filledStudents = getFilledStudents(students);

  return (
    <ScreenShell
      onBack={onBack}
      footerPadding={128}
      footer={
        <PrimaryButton disabled={filledStudents.length === 0} onPress={() => onFinish(filledStudents)}>
          Concluir cadastro
        </PrimaryButton>
      }
    >
      <WizardProgress step={2} total={WIZARD_TOTAL_STEPS} />
      <WizardCaption>Passo 3 de 3</WizardCaption>

      <Text style={styles.screenTitle}>Adicionar Alunos</Text>
      <Text style={styles.screenSubtitle}>
        Cadastre os alunos que farão parte desta turma.
      </Text>

      <Text style={styles.sectionLabel}>Importação em lote via CSV</Text>

      <TouchableOpacity onPress={handleBatchImport} activeOpacity={0.9} style={styles.uploadBox}>
        <View style={styles.uploadIconBox}>
          <Upload size={24} color={theme.textMuted || '#A79E90'} />
        </View>

        <Text style={styles.uploadTitle}>Clique ou arraste o arquivo aqui</Text>

        <Text style={styles.uploadSubtitle}>Formatos aceitos: .csv, .xlsx</Text>
      </TouchableOpacity>

      <View style={styles.orRow}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>ou</Text>
        <View style={styles.orLine} />
      </View>

      <View style={styles.studentManualBlock}>
        {students.map((student, index) => (
          <View key={index} style={{ gap: 12, marginBottom: 16 }}>
            <View style={styles.studentBlockHeader}>
              <Text style={styles.studentBlockTitle}>Aluno {index + 1}</Text>
              {students.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeStudent(index)}
                  activeOpacity={0.75}
                  style={styles.removeStudentButton}
                >
                  <Text style={styles.removeStudentText}>Remover</Text>
                </TouchableOpacity>
              )}
            </View>

            <FormField
              label="Nome do aluno"
              value={student.name}
              onChangeText={(value) => updateStudent(index, 'name', value)}
              placeholder="Ex: João Silva"
              preset="educator"
            />
            <FormField
              label="Contato do responsável"
              value={student.contact}
              onChangeText={(value) => updateStudent(index, 'contact', value)}
              placeholder="email@exemplo.com ou (11) 99999-9999"
              preset="educator"
            />
          </View>
        ))}
      </View>

      <TouchableOpacity onPress={addStudent} style={styles.addStudent} activeOpacity={0.75}>
        <Text style={styles.addStudentText}>+ Adicionar mais um aluno</Text>
      </TouchableOpacity>
    </ScreenShell>
  );
}