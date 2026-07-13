import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Upload } from 'lucide-react-native';

import { ScreenShell } from '../ScreenShell';
import { PrimaryButton } from '../PrimaryButton';
import { FormField } from '../FormFields';
import { styles } from '../../styles/styles';
import { theme } from '../../constants/theme'; // Path atualizado para a versão nova
import { WizardProgress, WizardCaption } from './WizardShared';

export interface StudentData {
  name: string;
  contact: string;
}

interface WizardStepStudentsProps {
  onBack: () => void;
  onFinish: (students: StudentData[]) => void;
}

export function WizardStepStudents({ onBack, onFinish }: WizardStepStudentsProps) {
  const [students, setStudents] = useState<StudentData[]>([
    { name: '', contact: '' },
  ]);

  const updateStudent = (index: number, field: keyof StudentData, value: string) => {
    const nextStudents = [...students];
    nextStudents[index][field] = value;
    setStudents(nextStudents);
  };

  const addStudent = () => {
    setStudents([...students, { name: '', contact: '' }]);
  };

  const removeStudent = (indexToRemove: number) => {
    if (students.length === 1) return;
    setStudents(students.filter((_, index) => index !== indexToRemove));
  };

  // Handler mockado preparado para receber o expo-document-picker no futuro
  const handleBatchImport = async () => {
    Alert.alert(
      "Importação", 
      "Aqui implementaremos o expo-document-picker para ler o CSV."
    );
  };

  const filledStudents = students.filter((student) => student.name.trim());

  return (
    <ScreenShell
      onBack={onBack}
      footerPadding={128}
      footer={
        <PrimaryButton
          disabled={filledStudents.length === 0}
          onPress={() => onFinish(filledStudents)}
        >
          Concluir cadastro
        </PrimaryButton>
      }
    >
      <WizardProgress step={2} total={3} />
      <WizardCaption>Passo 3 de 3</WizardCaption>

      <Text style={styles.screenTitle}>Adicionar Alunos</Text>
      <Text style={styles.screenSubtitle}>
        Cadastre os alunos que farão parte desta turma.
      </Text>

      {/* --- INÍCIO DA SESSÃO RESTAURADA: IMPORTAÇÃO EM LOTE --- */}
      <Text style={styles.sectionLabel}>Importação em lote via CSV</Text>

      <TouchableOpacity 
        onPress={handleBatchImport}
        activeOpacity={0.9} 
        style={styles.uploadBox}
      >
        <View style={styles.uploadIconBox}>
          {/* Corrigido para acessar o tema da estrutura atual */}
          <Upload size={24} color={theme.textMuted || '#A79E90'} /> 
        </View>

        <Text style={styles.uploadTitle}>
          Clique ou arraste o arquivo aqui
        </Text>

        <Text style={styles.uploadSubtitle}>
          Formatos aceitos: .csv, .xlsx
        </Text>
      </TouchableOpacity>

      <View style={styles.orRow}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>ou</Text>
        <View style={styles.orLine} />
      </View>
      {/* --- FIM DA SESSÃO RESTAURADA --- */}

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