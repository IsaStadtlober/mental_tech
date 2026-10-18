import { Sparkles } from "lucide-react-native";
import { Image, Text, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { theme } from "../../constants/theme";
import { usePop } from "../../hooks/useAnimations";
import { alunoStyles as s } from "../../styles/aluno";
import { authStyles as styles } from "../../styles/pages/auth";
import type { EquippedBySlot, ShopItem } from "../../types/aluno";

export function ExplorerAvatar({
  equippedItemId,
  equippedBySlot = {},
  shopItems = [],
  name,
  compact = false,
}: ExplorerAvatarProps) {
  // 🔍 LOG DE DIAGNÓSTICO PARA O CELULAR:
  console.log("📱 [Avatar Nativo] Equipados:", JSON.stringify(equippedBySlot));
  console.log("📱 [Avatar Nativo] Total itens loja:", shopItems.length);

  const popStyle = usePop(120);
  const SUPABASE_STORAGE_BASE =
    "https://yvwhncioydhpjdaeudpt.supabase.co/storage/v1/object/public/avatar-items";

  const SLOT_ORDER: (keyof EquippedBySlot)[] = [
    "body",
    "legs",
    "head",
    "accessories",
  ];

  const equippedImages = SLOT_ORDER.map((slot) => {
    const itemId = equippedBySlot[slot];
    if (!itemId) return null;

    // Compara convertendo ambos para String
    const item = shopItems.find((i) => String(i.id) === String(itemId));

    const rawPath =
      item?.imageUrl ??
      item?.image_url ??
      (typeof (item as any)?.image === "string" ? (item as any)?.image : null);

    if (!rawPath) return null;

    if (rawPath.startsWith("http")) return rawPath;

    // Limpa barras duplicadas para a URL ficar perfeita no Android
    const cleanPath = rawPath.replace(/^\/+/, "");
    return `${SUPABASE_STORAGE_BASE}/${cleanPath}`;
  }).filter(Boolean) as string[];

  console.log("📱 [Avatar Nativo] URLs de imagens geradas:", equippedImages);

  // Define um tamanho numérico fixo para o Android/iOS nunca colapsar
  const avatarSize = compact ? 80 : 160;

  return (
    <View style={compact ? s.avatarCompactWrap : undefined}>
      {!!name && (
        <>
          <Text numberOfLines={1} style={s.avatarName}>
            {name}
          </Text>
          <View style={s.avatarNamePointer} />
        </>
      )}
      <Animated.View
        style={[
          compact ? s.explorerAvatarCompact : styles.explorerAvatar,
          {
            width: compact ? 80 : 160,
            height: compact ? 80 : 160,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden", // 👈 Impede que as pernas/cabeça saiam da caixa branca
          },
          popStyle,
        ]}
      >
        {equippedImages.length > 0 ? (
          equippedImages.map((uri, index) => (
            <Image
              key={`${index}-${uri}`}
              source={{ uri }}
              resizeMode="contain" // 👈 Propriedade direta no Image (garante proporção exata)
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          ))
        ) : (
          <Sparkles
            size={compact ? 25 : 44}
            color={theme.bg}
            strokeWidth={1.8}
          />
        )}
      </Animated.View>
    </View>
  );
}
