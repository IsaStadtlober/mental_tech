import { FileText, Image as ImageIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { theme } from '../../constants/theme';
import { alunoStyles as s } from '../../styles/aluno';

export function MissionFileCard({ name }: { name: string }) {
  const image = /\.(png|jpg|jpeg)$/i.test(name);
  const Icon = image ? ImageIcon : FileText;
  return (
    <View style={s.studentFileCard}>
      <View style={s.filePreview}>
        <Icon size={30} color={theme.primary} />
        <View style={s.filePreviewLine} />
        <View style={[s.filePreviewLine, s.filePreviewLineShort]} />
      </View>
      <View style={s.contentFlex}>
        <Text numberOfLines={1} style={s.studentFileTitle}>
          {name}
        </Text>
        <Text style={s.studentFileMeta}>
          Material da professora · {image ? 'Imagem' : 'PDF'}
        </Text>
        <Text style={s.filePreviewHint}>
          Toque em baixar para abrir o arquivo
        </Text>
      </View>
    </View>
  );
}