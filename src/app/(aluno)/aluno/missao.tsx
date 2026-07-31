import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { Clock, Coins, Download, Upload, X } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MissionFileCard } from '../../../components/aluno/MissionFileCard';
import { StudentBottomSheet } from '../../../components/aluno/StudentBottomSheet';
import { StudentScreenShell } from '../../../components/aluno/StudentScreenShell';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { theme } from '../../../constants/theme';
import { useStudentPrototype } from '../../../hooks/aluno/useStudentPrototype';
import { ALUNO_ROUTES } from '../../../router/aluno.routes';
import { alunoStyles as s } from '../../../styles/aluno';
import { isRevision } from '../../../utils/aluno/mission';

export default function MissionRoute() {
  const router = useRouter();
  const { mission, saveMission, submitMission } = useStudentPrototype();
  const [file, setFile] = useState(mission.responseName || '');
  const [confirm, setConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const revision = isRevision(mission);
  const pickResponseFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        'application/pdf',
        'image/*',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ],
      multiple: false,
      copyToCacheDirectory: true,
    });
    if (!result.canceled && result.assets[0]) setFile(result.assets[0].name);
  };
  const send = () => {
    setSubmitting(true);
    setTimeout(() => {
      const result = submitMission(file);
      setSubmitting(false);
      if (result.kind === 'invalid') return;
      setConfirm(false);
      if (result.kind === 'firstSubmission') router.replace(ALUNO_ROUTES.SENT);
      else router.replace(ALUNO_ROUTES.RESENT);
    }, 450);
  };
  return (
    <>
      <StudentScreenShell
        onBack={() => router.back()}
        footerPadding={178}
        footer={
          <View style={s.footerStack}>
            <PrimaryButton
              disabled={!file || submitting}
              icon={false}
              onPress={() => setConfirm(true)}
            >
              {submitting
                ? 'Enviando...'
                : revision
                ? 'Reenviar correção'
                : 'Enviar minha resposta'}
            </PrimaryButton>
            <TouchableOpacity
              onPress={() => {
                saveMission();
                router.back();
              }}
              style={s.secondaryAction}
            >
              <Text style={s.secondaryActionText}>
                Salvar e continuar depois
              </Text>
            </TouchableOpacity>
          </View>
        }
      >
        <View style={s.missionHeadingRow}>
          <View style={s.contentFlex}>
            <Text style={s.screenEyebrow}>
              {revision ? 'MISSÃO EM REVISÃO' : 'MISSÃO ATUAL'}
            </Text>
            <Text style={s.screenTitle}>{mission.title}</Text>
          </View>
          <View style={s.coinRewardPill}>
            <Coins size={14} color="#D6961D" />
            <Text style={s.coinRewardText}>+{mission.rewardCoins}</Text>
          </View>
        </View>
        <Text style={s.screenSubtitle}>{mission.instruction}</Text>
        <View style={s.missionInfoRow}>
          <Clock size={16} color={theme.textMuted} />
          <Text style={s.studentFileMeta}>
            Tempo estimado: {mission.estimate}
          </Text>
        </View>
        <Text style={s.sectionLabel}>Material da missão</Text>
        <MissionFileCard name={mission.attachmentName} />
        <TouchableOpacity style={s.studentDownloadButton}>
          <Download size={18} color={theme.primary} />
          <Text style={s.studentDownloadText}>Baixar arquivo</Text>
        </TouchableOpacity>
        {revision && (
          <View style={s.studentFeedback}>
            <Text style={s.studentFeedbackLabel}>ORIENTAÇÃO DA PROFESSORA</Text>
            <Text style={s.studentFeedbackText}>{mission.feedback}</Text>
            <Text style={s.feedbackEncouragement}>
              Você consegue! Faça o ajuste e envie novamente.
            </Text>
          </View>
        )}
        <Text style={s.sectionLabel}>
          {revision ? 'Envie a atividade corrigida' : 'Adicione sua resposta'}
        </Text>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={pickResponseFile}
          style={[s.uploadBox, file && s.uploadSelected]}
        >
          <View style={s.uploadIconCircle}>
            <Upload size={25} color={file ? theme.primary : theme.textFaint} />
          </View>
          <Text style={s.uploadTitle}>
            {file || 'Escolher foto, PDF ou documento'}
          </Text>
          <Text style={s.uploadSubtitle}>
            {file
              ? 'Arquivo pronto para enviar · toque para trocar'
              : 'Você pode enviar uma foto ou um arquivo'}
          </Text>
        </TouchableOpacity>
      </StudentScreenShell>
      {confirm && (
        <StudentBottomSheet onClose={() => setConfirm(false)}>
          <View style={s.confirmSheet}>
            <TouchableOpacity
              accessibilityLabel="Fechar"
              onPress={() => setConfirm(false)}
              style={s.modalClose}
            >
              <X size={20} color={theme.textMuted} />
            </TouchableOpacity>
            <Text style={s.confirmTitle}>Sua resposta está pronta?</Text>
            <Text style={s.confirmText}>
              Confira o arquivo antes de enviar. Depois, sua professora poderá
              corrigi-lo.
            </Text>
            <View style={s.confirmFile}>
              <FileTextIcon />
              <Text numberOfLines={1} style={s.confirmFileText}>
                {file}
              </Text>
            </View>
            <PrimaryButton onPress={send} icon={false}>
              {revision ? 'Reenviar agora' : 'Enviar agora'}
            </PrimaryButton>
            <TouchableOpacity
              onPress={() => setConfirm(false)}
              style={s.secondaryAction}
            >
              <Text style={s.secondaryActionText}>Voltar e revisar</Text>
            </TouchableOpacity>
          </View>
        </StudentBottomSheet>
      )}
    </>
  );
}
function FileTextIcon() {
  return (
    <View style={s.confirmFileIcon}>
      <Upload size={18} color={theme.primary} />
    </View>
  );
}