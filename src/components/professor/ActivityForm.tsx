import { ACTIVITY_FORM_ATTACHMENT_OPTIONS, ACTIVITY_FORM_AUDIENCES, ACTIVITY_FORM_REWARD_OPTIONS } from '@/constants/professor/activityForm';
import { theme } from '@/constants/theme';
import { useActivityForm } from '@/hooks/professor/useActivityForm';
import { activityFormStyles } from '@/styles/professor/activityForm';
import type { ActivityFormScreenProps } from '@/types/professor/activityForm';
import { Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from 'react-native';

import { Save, Send } from 'lucide-react-native';

import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import BackButton from '@/components/professor/BackButton';
import SectionHeader from '@/components/professor/SectionHeader';
import StatusChip from '@/components/professor/StatusChip';

export default function ActivityFormScreen({
  availableStudents,
  activity,
  initialStudentName,
  onBack,
  onSave,
}: ActivityFormScreenProps) {
  const { width } = useWindowDimensions();
  const isCompact = width < 760;

  const {
    title,
    setTitle,
    instruction,
    setInstruction,
    dueDate,
    setDueDate,
    attachmentName,
    setAttachmentName,
    setAttachmentType,
    rewardName,
    setRewardName,
    setRewardType,
    className,
    setClassName,
    selectedStudentNames,
    setSelectedStudentNames,
    toggleStudent,
    handleSave,
    titleIsValid,
    instructionIsValid,
    audienceIsValid,
    formIsValid,
    studentSelectionLabel,
    messages,
  } = useActivityForm({ activity, initialStudentName });

  return (
    <ScrollView
      style={activityFormStyles.page}
      contentContainerStyle={[
        activityFormStyles.contentContainer,
        { paddingHorizontal: isCompact ? 16 : 24 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={activityFormStyles.screenContainer}>
        <BackButton
          label={messages.backLabel}
          onPress={onBack}
          style={activityFormStyles.backButton}
        />

        <SectionHeader
          title={activity ? messages.headerTitleEdit : messages.headerTitle}
          subtitle={messages.headerSubtitle}
        />

        {!activity && initialStudentName && (
          <View style={activityFormStyles.banner}>
            <Text style={activityFormStyles.bannerTitle}>
              {messages.individualTitle.replace('{name}', initialStudentName ?? '')}
            </Text>

            <Text style={activityFormStyles.bannerSubtitle}>
              {messages.individualSubtitle}
            </Text>
          </View>
        )}

        <View style={[activityFormStyles.layout, isCompact ? activityFormStyles.layoutCompact : undefined]}>
          <View style={[activityFormStyles.mainColumn, isCompact ? activityFormStyles.mainColumnCompact : undefined]}>
            <AppCard>
              <SectionHeader
                compact
                title={messages.mainSectionTitle}
                subtitle={messages.mainSectionSubtitle}
                style={activityFormStyles.sectionHeaderSpacing}
              />

              <Text style={activityFormStyles.fieldLabel}>{messages.titleLabel}</Text>

              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder={messages.titlePlaceholder}
                placeholderTextColor={theme.textFaint}
                maxLength={80}
                style={[activityFormStyles.textInput, !titleIsValid && title.length > 0 ? activityFormStyles.textInputInvalid : undefined]}
              />

              <Text style={[activityFormStyles.fieldLabel, activityFormStyles.fieldLabelTop]}>{messages.instructionLabel}</Text>

              <TextInput
                value={instruction}
                onChangeText={setInstruction}
                placeholder={messages.instructionPlaceholder}
                placeholderTextColor={theme.textFaint}
                multiline
                maxLength={150}
                textAlignVertical="top"
                style={[activityFormStyles.textArea, !instructionIsValid && instruction.length > 0 ? activityFormStyles.textAreaInvalid : undefined]}
              />

              <Text style={activityFormStyles.helperText}>
                {instruction.length}/150
              </Text>
            </AppCard>

            <AppCard>
              <SectionHeader
                compact
                title={messages.materialSectionTitle}
                subtitle={messages.materialSectionSubtitle}
                style={activityFormStyles.sectionHeaderSpacing}
              />

              <View style={activityFormStyles.attachmentCard}>
                <Text style={activityFormStyles.attachmentTitle}>
                  {attachmentName || messages.attachmentPlaceholder}
                </Text>

                <Text style={activityFormStyles.attachmentHint}>
                  {messages.attachmentHint}
                </Text>

                <View style={activityFormStyles.badgeRow}>
                  {ACTIVITY_FORM_ATTACHMENT_OPTIONS.map((option) => {
                    const selected = attachmentName === option.name;

                    return (
                      <Pressable
                        key={option.type}
                        onPress={() => {
                          setAttachmentName(option.name);
                          setAttachmentType(option.type);
                        }}
                        style={({ pressed }) => [
                          activityFormStyles.badgeChip,
                          selected ? activityFormStyles.badgeChipSelected : undefined,
                          pressed ? { opacity: 0.82 } : undefined,
                        ]}
                      >
                        <Text style={[activityFormStyles.badgeChipText, selected ? activityFormStyles.badgeChipTextSelected : undefined]}>
                          {option.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              {!!attachmentName && (
                <View style={activityFormStyles.attachmentSummary}>
                  <View style={activityFormStyles.attachmentSummaryContent}>
                    <Text numberOfLines={1} style={activityFormStyles.attachmentSummaryName}>
                      {attachmentName}
                    </Text>

                    <Text style={activityFormStyles.attachmentSummarySubtitle}>
                      {messages.attachmentDescription}
                    </Text>
                  </View>

                  <AppButton
                    label={messages.removeAttachment}
                    variant="ghost"
                    size="small"
                    onPress={() => setAttachmentName('')}
                  />
                </View>
              )}
            </AppCard>
          </View>

          <View style={[activityFormStyles.sideColumn, isCompact ? activityFormStyles.sideColumnCompact : undefined]}>
            <AppCard>
              <SectionHeader
                compact
                title={messages.publicationSectionTitle}
                subtitle={messages.publicationSectionSubtitle}
                style={activityFormStyles.sectionHeaderSpacing}
              />

              <Text style={[activityFormStyles.fieldLabel, { marginBottom: 9 }]}>{messages.audienceLabel}</Text>

              <View style={activityFormStyles.audienceRow}>
                {ACTIVITY_FORM_AUDIENCES.map((audience) => {
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
                      style={({ pressed }) => [
                        activityFormStyles.audienceChip,
                        selected ? activityFormStyles.audienceChipSelected : undefined,
                        pressed ? { opacity: 0.82 } : undefined,
                      ]}
                    >
                      <Text style={[activityFormStyles.audienceChipText, selected ? activityFormStyles.audienceChipTextSelected : undefined]}>
                        {audience}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {className === 'Alunos específicos' && (
                <View style={[activityFormStyles.studentSelectionCard, !audienceIsValid ? activityFormStyles.studentSelectionCardInvalid : undefined]}>
                  <Text style={activityFormStyles.studentSelectionTitle}>{messages.studentSelectionTitle}</Text>

                  <Text style={activityFormStyles.studentSelectionSubtitle}>{messages.studentSelectionSubtitle}</Text>

                  <View style={activityFormStyles.studentSelectionRow}>
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
                          style={({ pressed }) => [
                            activityFormStyles.studentOption,
                            selected ? activityFormStyles.studentOptionSelected : undefined,
                            pressed ? { opacity: 0.8 } : undefined,
                          ]}
                        >
                          <Text style={[activityFormStyles.studentOptionText, selected ? activityFormStyles.studentOptionTextSelected : undefined]}>
                            {student.name}
                          </Text>

                          <Text style={[activityFormStyles.studentOptionSubtext, selected ? activityFormStyles.studentOptionSubtextSelected : undefined]}>
                            {student.className}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>

                  <Text style={[activityFormStyles.studentSelectionState, selectedStudentNames.length > 0 ? activityFormStyles.studentSelectionStateValid : activityFormStyles.studentSelectionStateInvalid]}>
                    {studentSelectionLabel}
                  </Text>
                </View>
              )}

              <Text style={[activityFormStyles.fieldLabel, { marginTop: 20, marginBottom: 7 }]}>{messages.dueDateLabel}</Text>

              <TextInput
                value={dueDate}
                onChangeText={setDueDate}
                placeholder={messages.dueDatePlaceholder}
                placeholderTextColor={theme.textFaint}
                style={activityFormStyles.textInput}
              />

              <Text style={[activityFormStyles.fieldLabel, { marginTop: 20, marginBottom: 9 }]}>{messages.rewardLabel}</Text>

              <View style={activityFormStyles.rewardRow}>
                {ACTIVITY_FORM_REWARD_OPTIONS.map((reward) => {
                  const selected = rewardName === reward.label;

                  return (
                    <Pressable
                      key={reward.label}
                      onPress={() => {
                        setRewardName(reward.label);
                        setRewardType(reward.type);
                      }}
                      style={({ pressed }) => [
                        activityFormStyles.rewardOption,
                        selected ? activityFormStyles.rewardOptionSelected : undefined,
                        pressed ? { opacity: 0.84 } : undefined,
                      ]}
                    >
                      <Text style={activityFormStyles.rewardOptionText}>
                        {reward.label}
                      </Text>

                      {selected && (
                        <StatusChip
                          label={messages.rewardSelected}
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
          <View style={activityFormStyles.validationCard}>
            <Text style={activityFormStyles.validationText}>{messages.validationMessage}</Text>
          </View>
        )}

        <View style={activityFormStyles.actionsRow}>
          <AppButton
            label={messages.saveDraft}
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
            onPress={() => handleSave('draft', onSave)}
          />

          <AppButton
            label={
              activity?.status === 'published'
                ? messages.saveChanges
                : messages.publishAction
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
                activity?.status === 'closed' ? 'closed' : 'published',
                onSave
              )
            }
          />
        </View>
      </View>
    </ScrollView>
  );
}