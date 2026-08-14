import { FileText, Image as ImageIcon } from "lucide-react-native";
import { Text, View, Pressable, Linking, Alert } from "react-native";
import { theme } from "../../constants/theme";
import { alunoStyles as s } from "../../styles/aluno";

interface MissionFileCardProps {
  name?: string;
  fileUrl?: string;
  teacherName?: string; // 👈 Nova prop para o nome do professor
}

function resolveFileName(name?: string, fileUrl?: string): string {
  let rawName = name && name.trim() !== "" ? name : "";

  if (!rawName && fileUrl) {
    try {
      const pathWithoutParams = fileUrl.split("?")[0];
      rawName = pathWithoutParams.split("/").pop() || "";
      rawName = decodeURIComponent(rawName);
    } catch {
      rawName = "";
    }
  }

  if (!rawName) return "Material da Atividade.pdf";

  return rawName.replace(/^\d+_/, "");
}

export function MissionFileCard({ name, fileUrl, teacherName }: MissionFileCardProps) {
  const fileName = resolveFileName(name, fileUrl);

  // 1. Extrai a extensão real do arquivo (ex: PDF, DOCX, PNG)
  const fileExtension = fileName.includes(".") 
    ? fileName.split(".").pop()?.toUpperCase() || "ARQUIVO"
    : "ARQUIVO";

  const isImage = ["PNG", "JPG", "JPEG", "WEBP"].includes(fileExtension);
  const Icon = isImage ? ImageIcon : FileText;

  // 2. Define a label do autor
  const authorText = teacherName ? `Prof. ${teacherName}` : "Material do professor";

  const handleOpenFile = async () => {
    if (!fileUrl) {
      Alert.alert("Ops!", "Nenhum arquivo anexado a esta atividade.");
      return;
    }

    try {
      const canOpen = await Linking.canOpenURL(fileUrl);
      if (canOpen) {
        await Linking.openURL(fileUrl);
      } else {
        Alert.alert(
          "Erro",
          "Seu dispositivo não suporta abrir este tipo de link diretamente.",
        );
      }
    } catch (error) {
      console.error("❌ Erro ao abrir o arquivo:", error);
      Alert.alert("Erro", "Não foi possível abrir o arquivo.");
    }
  };

  return (
    <Pressable
      onPress={handleOpenFile}
      style={({ pressed }) => [s.studentFileCard, pressed && { opacity: 0.7 }]}
    >
      <View style={s.filePreview}>
        <Icon size={30} color={theme.primary} />
        <View style={s.filePreviewLine} />
        <View style={[s.filePreviewLine, s.filePreviewLineShort]} />
      </View>
      <View style={s.contentFlex}>
        <Text numberOfLines={1} style={s.studentFileTitle}>
          {fileName}
        </Text>
        <Text style={s.studentFileMeta}>
          {authorText} · {fileExtension}
        </Text>
        <Text style={s.filePreviewHint}>Toque para abrir o arquivo</Text>
      </View>
    </Pressable>
  );
}