import { borderRadius, fonts, theme } from '@/constants/theme';
import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from 'react-native';

import {
    Save,
    Send,
} from 'lucide-react-native';

import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import BackButton from '@/components/professor/BackButton';
import SectionHeader from '@/components/professor/SectionHeader';
import StatusChip from '@/components/professor/StatusChip';

import type {
    Activity,
    ActivityStatus,
    EducatorStudentOption,
    FileType,
    RewardType,
} from '@/types/professor';

export interface ActivityFormData {
  title: string;
  instruction: string;

  className: string;
  studentNames: string[];

  dueDate?: string;

  attachmentName: string;
  attachmentType: FileType;

  rewardName: string;
  rewardType: RewardType;

  status: ActivityStatus;
}

export interface ActivityFormScreenProps {
  availableStudents: EducatorStudentOption[];
  activity?: Activity | null;
  initialStudentName?: string | null;

  onBack: () => void;
  onSave: (data: ActivityFormData) => void;
}

const audiences = [
  '5º Ano A',
  '5º Ano B',
  'Alunos específicos',
];

const attachmentOptions: {
  label: string;
  name: string;
  type: FileType;
}[] = [
    {
      label: 'PDF',
      name: 'material-atividade.pdf',
      type: 'pdf',
    },
    {
      label: 'Word',
      name: 'atividade.docx',
      type: 'doc',
    },
    {
      label: 'Imagem',
      name: 'material.png',
      type: 'image',
    },
  ];

const rewardOptions: {
  label: string;
  type: RewardType;
}[] = [
    {
      label: 'Medalha Explorador',
      type: 'medal',
    },
    {
      label: 'Mochila Verde',
      type: 'item',
    },
    {
      label: 'Item surpresa',
      type: 'item',
    },
  ];

export default function ActivityFormScreen({
  availableStudents,
  activity,
  initialStudentName,
  onBack,
  onSave,
}: ActivityFormScreenProps) {
  const { width } = useWindowDimensions();
  const isCompact = width < 760;

  const [title, setTitle] = useState(activity?.title ?? '');
  const [instruction, setInstruction] = useState(activity?.instruction ?? '');
  const [dueDate, setDueDate] = useState(activity?.dueDate ?? '');

  const [attachmentName, setAttachmentName] = useState(
    activity?.attachment?.name ?? ''
  );
  const [attachmentType, setAttachmentType] = useState<FileType>(
    activity?.attachment?.type ?? 'pdf'
  );

  const [rewardName, setRewardName] = useState(
    activity?.reward?.name ?? 'Medalha Explorador'
  );
  const [rewardType, setRewardType] = useState<RewardType>(
    activity?.reward?.type ?? 'medal'
  );

  const [className, setClassName] = useState(() => {
    if (activity?.className) {
      return activity.className;
    }

    if (initialStudentName) {
      return 'Alunos específicos';
    }

    return '5º Ano A';
  });

  const [selectedStudentNames, setSelectedStudentNames] = useState<string[]>(() => {
    if (activity?.studentNames?.length) {
      return activity.studentNames;
    }

    if (initialStudentName) {
      return [initialStudentName];
    }

    return [];
  });

  /**
   * Regras de validação do formulário.
   */
  const titleIsValid = title.trim().length > 0;
  const instructionIsValid = instruction.trim().length > 0;
  const attachmentIsValid = attachmentName.trim().length > 0;

  const audienceIsValid =
    className !== 'Alunos específicos' || selectedStudentNames.length > 0;

  const formIsValid =
    titleIsValid &&
    instructionIsValid &&
    attachmentIsValid &&
    audienceIsValid;  

  function toggleStudent(studentName: string) {
    setSelectedStudentNames((current) =>
      current.includes(studentName)
        ? current.filter((name) => name !== studentName)
        : [...current, studentName]
    );
  }

  function handleSave(status: ActivityStatus) {
    if (!formIsValid) {
      return;
    }

    onSave({
      title: title.trim(),
      instruction: instruction.trim(),
      className,
      studentNames: className === 'Alunos específicos' ? selectedStudentNames : [],
      dueDate: dueDate.trim() || undefined,
      attachmentName,
      attachmentType,
      rewardName,
      rewardType,
      status,
    });
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.bgSubtle,
      }}
      contentContainerStyle={{
        paddingHorizontal: isCompact ? 16 : 24,
        paddingTop: 28,
        paddingBottom: 64,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          width: '100%',
          maxWidth: 1100,
          alignSelf: 'center',
        }}
      >
        <BackButton
          label="Atividades"
          onPress={onBack}
          style={{
            marginBottom: 20,
          }}
        />

        <SectionHeader
          title={activity ? 'Editar atividade' : 'Criar nova missão'}
          subtitle="Configure o material, os destinatários e a recompensa da atividade."
        />

        {!activity && initialStudentName && (
          <View
            style={{
              marginTop: 18,
              padding: 14,
              borderWidth: 1,
              borderColor: theme.info,
              borderRadius: borderRadius.lg,
              backgroundColor: theme.infoSoft,
            }}
          >
            <Text
              style={{
                color: theme.info,
                fontFamily: fonts.bodyBold,
                fontSize: 13,
              }}
            >
              Missão individual para {initialStudentName}
            </Text>

            <Text
              style={{
                marginTop: 4,
                color: theme.textMuted,
                fontFamily: fonts.bodyRegular,
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              O destinatário foi preenchido a partir do perfil do aluno.
            </Text>
          </View>
        )}

        <View
          style={{
            flexDirection: isCompact ? 'column' : 'row',
            alignItems: 'flex-start',
            gap: 20,
            marginTop: 24,
          }}
        >
          <View
            style={{
              flex: 1.3,
              width: isCompact ? '100%' : undefined,
              gap: 20,
            }}
          >
            <AppCard>
              <SectionHeader
                compact
                title="Informações principais"
                subtitle="Explique a missão de forma curta e objetiva."
                style={{
                  marginBottom: 20,
                }}
              />

              <Text
                style={{
                  color: theme.textDark,
                  fontFamily: fonts.bodyBold,
                  fontSize: 13,
                  marginBottom: 7,
                }}
              >
                Título *
              </Text>

              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Ex: Descobrindo os biomas"
                placeholderTextColor={theme.textFaint}
                maxLength={80}
                style={{
                  minHeight: 48,
                  paddingHorizontal: 15,
                  color: theme.textDark,
                  fontFamily: fonts.bodyRegular,
                  fontSize: 14,
                  borderWidth: 1,
                  borderColor:
                    title.length > 0 && !titleIsValid
                      ? theme.danger
                      : theme.border,
                  borderRadius: borderRadius.lg,
                  backgroundColor: theme.bgSubtle,
                }}
              />

              <Text
                style={{
                  marginTop: 18,
                  marginBottom: 7,
                  color: theme.textDark,
                  fontFamily: fonts.bodyBold,
                  fontSize: 13,
                }}
              >
                Instrução curta *
              </Text>

              <TextInput
                value={instruction}
                onChangeText={setInstruction}
                placeholder="Explique o que o aluno deve fazer"
                placeholderTextColor={theme.textFaint}
                multiline
                maxLength={150}
                textAlignVertical="top"
                style={{
                  minHeight: 112,
                  paddingHorizontal: 15,
                  paddingVertical: 13,
                  color: theme.textDark,
                  fontFamily: fonts.bodyRegular,
                  fontSize: 14,
                  borderWidth: 1,
                  borderColor:
                    instruction.length > 0 && !instructionIsValid
                      ? theme.danger
                      : theme.border,
                  borderRadius: borderRadius.lg,
                  backgroundColor: theme.bgSubtle,
                }}
              />

              <Text
                style={{
                  marginTop: 7,
                  alignSelf: 'flex-end',
                  color: theme.textFaint,
                  fontFamily: fonts.bodyRegular,
                  fontSize: 12,
                }}
              >
                {instruction.length}/150
              </Text>
            </AppCard>

            <AppCard>
              <SectionHeader
                compact
                title="Material da atividade"
                subtitle="O arquivo é obrigatório. O aluno fará o download e enviará uma resposta separada."
                style={{
                  marginBottom: 18,
                }}
              />

              <View
                style={{
                  padding: 22,
                  alignItems: 'center',
                  borderWidth: 2,
                  borderStyle: 'dashed',
                  borderColor: theme.teal,
                  borderRadius: borderRadius.xl,
                  backgroundColor: theme.bgSubtle,
                }}
              >
                <Text
                  style={{
                    color: theme.textDark,
                    fontFamily: fonts.bodyBold,
                    fontSize: 14,
                    textAlign: 'center',
                  }}
                >
                  {attachmentName || 'Escolha um arquivo de exemplo'}
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    color: theme.textMuted,
                    fontFamily: fonts.bodyRegular,
                    fontSize: 12,
                    textAlign: 'center',
                  }}
                >
                  PDF, Word ou imagem
                </Text>

                <View
                  style={{
                    marginTop: 16,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  {attachmentOptions.map((option) => {
                    const selected = attachmentName === option.name;

                    return (
                      <Pressable
                        key={option.type}
                        onPress={() => {
                          setAttachmentName(option.name);
                          setAttachmentType(option.type);
                        }}
                        style={({ pressed }) => ({
                          paddingHorizontal: 13,
                          paddingVertical: 8,
                          borderWidth: 1,
                          borderColor: selected
                            ? theme.primary
                            : theme.border,
                          borderRadius: borderRadius.pill,
                          backgroundColor: selected
                            ? theme.primary
                            : theme.card,
                          opacity: pressed ? 0.82 : 1,
                        })}
                      >
                        <Text
                          style={{
                            color: selected
                              ? theme.white
                              : theme.textMuted,
                            fontFamily: fonts.bodyBold,
                            fontSize: 12,
                          }}
                        >
                          {option.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              {!!attachmentName && (
                <View
                  style={{
                    marginTop: 14,
                    padding: 13,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    borderRadius: borderRadius.lg,
                    backgroundColor: theme.bgSoft,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        color: theme.primary,
                        fontFamily: fonts.bodyBold,
                        fontSize: 13,
                      }}
                    >
                      {attachmentName}
                    </Text>

                    <Text
                      style={{
                        marginTop: 3,
                        color: theme.textMuted,
                        fontFamily: fonts.bodyRegular,
                        fontSize: 11,
                      }}
                    >
                      Anexo simulado para o protótipo
                    </Text>
                  </View>

                  <AppButton
                    label="Remover"
                    variant="ghost"
                    size="small"
                    onPress={() => setAttachmentName('')}
                  />
                </View>
              )}
            </AppCard>
          </View>

          <View
            style={{
              flex: 1,
              width: isCompact ? '100%' : undefined,
            }}
          >
            <AppCard>
              <SectionHeader
                compact
                title="Publicação"
                subtitle="Defina quem receberá a missão."
                style={{
                  marginBottom: 20,
                }}
              />

              <Text
                style={{
                  color: theme.textDark,
                  fontFamily: fonts.bodyBold,
                  fontSize: 13,
                  marginBottom: 9,
                }}
              >
                Destinatários *
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                {audiences.map((audience) => {
                  const selected = className === audience;

                  return (
                    <Pressable
                      key={audience}
                      onPress={() => {
                        setClassName(audience);
                        if (audience !== 'Alunos específicos') {
                          setSelectedStudentNames([]);
                        }
                      }}
                      style={({ pressed }) => ({
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderWidth: 1,
                        borderColor: selected
                          ? theme.primary
                          : theme.border,
                        borderRadius: borderRadius.pill,
                        backgroundColor: selected
                          ? theme.primary
                          : theme.card,
                        opacity: pressed ? 0.82 : 1,
                      })}
                    >
                      <Text
                        style={{
                          color: selected
                            ? theme.white
                            : theme.textMuted,
                          fontFamily: fonts.bodyBold,
                          fontSize: 12,
                        }}
                      >
                        {audience}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Seção de seleção de alunos específicos */}
              {className === 'Alunos específicos' && (
                <View
                  style={{
                    marginTop: 18,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: audienceIsValid
                      ? theme.infoSoft
                      : theme.warning,
                    borderRadius: borderRadius.xl,
                    backgroundColor: theme.bgSubtle,
                  }}
                >
                  <Text
                    style={{
                      color: theme.textDark,
                      fontFamily: fonts.bodyBold,
                      fontSize: 13,
                    }}
                  >
                    Selecionar alunos *
                  </Text>

                  <Text
                    style={{
                      marginTop: 4,
                      color: theme.textMuted,
                      fontFamily: fonts.bodyRegular,
                      fontSize: 12,
                      lineHeight: 18,
                    }}
                  >
                    Escolha um ou mais alunos para receber esta missão.
                  </Text>

                  <View
                    style={{
                      marginTop: 13,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    {availableStudents.map((student) => {
                      const selected = selectedStudentNames.includes(
                        student.name
                      );

                      return (
                        <Pressable
                          key={student.id}
                          accessibilityRole="checkbox"
                          accessibilityState={{
                            checked: selected,
                          }}
                          accessibilityLabel={`${student.name}, ${student.className}`}
                          onPress={() => toggleStudent(student.name)}
                          style={({ pressed }) => ({
                            minHeight: 42,
                            paddingHorizontal: 13,
                            paddingVertical: 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: selected
                              ? theme.primary
                              : theme.border,
                            borderRadius: borderRadius.pill,
                            backgroundColor: selected
                              ? theme.primary
                              : theme.card,
                            opacity: pressed ? 0.8 : 1,
                          })}
                        >
                          <Text
                            style={{
                              color: selected
                                ? theme.white
                                : theme.textMuted,
                              fontFamily: fonts.bodyBold,
                              fontSize: 12,
                            }}
                          >
                            {student.name}
                          </Text>

                          <Text
                            style={{
                              marginTop: 2,
                              color: selected
                                ? theme.white
                                : theme.textFaint,
                              fontFamily: fonts.bodyRegular,
                              fontSize: 10,
                            }}
                          >
                            {student.className}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>

                  <Text
                    style={{
                      marginTop: 12,
                      color:
                        selectedStudentNames.length > 0
                          ? theme.success
                          : theme.warning,
                      fontFamily: fonts.bodyBold,
                      fontSize: 12,
                    }}
                  >
                    {selectedStudentNames.length === 0
                      ? 'Selecione pelo menos um aluno.'
                      : selectedStudentNames.length === 1
                        ? '1 aluno selecionado'
                        : `${selectedStudentNames.length} alunos selecionados`}
                  </Text>
                </View>
              )}

              <Text
                style={{
                  marginTop: 20,
                  marginBottom: 7,
                  color: theme.textDark,
                  fontFamily: fonts.bodyBold,
                  fontSize: 13,
                }}
              >
                Data de entrega
              </Text>

              <TextInput
                value={dueDate}
                onChangeText={setDueDate}
                placeholder="DD/MM/AAAA"
                placeholderTextColor={theme.textFaint}
                style={{
                  minHeight: 48,
                  paddingHorizontal: 15,
                  color: theme.textDark,
                  fontFamily: fonts.bodyRegular,
                  fontSize: 14,
                  borderWidth: 1,
                  borderColor: theme.border,
                  borderRadius: borderRadius.lg,
                  backgroundColor: theme.bgSubtle,
                }}
              />

              <Text
                style={{
                  marginTop: 20,
                  marginBottom: 9,
                  color: theme.textDark,
                  fontFamily: fonts.bodyBold,
                  fontSize: 13,
                }}
              >
                Recompensa ao aprovar
              </Text>

              <View
                style={{
                  gap: 8,
                }}
              >
                {rewardOptions.map((reward) => {
                  const selected = rewardName === reward.label;

                  return (
                    <Pressable
                      key={reward.label}
                      onPress={() => {
                        setRewardName(reward.label);
                        setRewardType(reward.type);
                      }}
                      style={({ pressed }) => ({
                        padding: 13,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                        borderWidth: 1,
                        borderColor: selected
                          ? theme.primary
                          : theme.border,
                        borderRadius: borderRadius.lg,
                        backgroundColor: selected
                          ? theme.bgSoft
                          : theme.card,
                        opacity: pressed ? 0.84 : 1,
                      })}
                    >
                      <Text
                        style={{
                          flex: 1,
                          color: theme.textDark,
                          fontFamily: fonts.bodyBold,
                          fontSize: 13,
                        }}
                      >
                        {reward.label}
                      </Text>

                      {selected && (
                        <StatusChip
                          label="Selecionada"
                          tone="success"
                        />
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </AppCard>
          </View>
        </View>

        {!formIsValid && (
          <View
            style={{
              marginTop: 20,
              padding: 14,
              borderRadius: borderRadius.lg,
              backgroundColor: theme.warningSoft,
            }}
          >
            <Text
              style={{
                color: theme.warning,
                fontFamily: fonts.bodyBold,
                fontSize: 13,
                lineHeight: 19,
              }}
            >
              Preencha título, instrução, destinatário e material para continuar.
            </Text>
          </View>
        )}

        <View
          style={{
            width: '100%',
            marginTop: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <AppButton
            label="Salvar rascunho"
            variant="secondary"
            disabled={!formIsValid}
            iconLeft={
              <Save
                size={17}
                color={
                  formIsValid
                    ? theme.primary
                    : theme.textMuted
                }
              />
            }
            onPress={() => handleSave('draft')}
          />

          <AppButton
            label={
              activity?.status === 'published'
                ? 'Salvar alterações'
                : 'Publicar missão'
            }
            disabled={!formIsValid}
            iconLeft={
              <Send
                size={17}
                color={
                  formIsValid
                    ? theme.white
                    : theme.textMuted
                }
              />
            }
            onPress={() =>
              handleSave(
                activity?.status === 'closed' ? 'closed' : 'published'
              )
            }
          />
        </View>
      </View>
    </ScrollView>
  );
}