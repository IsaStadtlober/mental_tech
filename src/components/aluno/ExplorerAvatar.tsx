import { LinearGradient } from "expo-linear-gradient";
import { Backpack, Glasses, Sparkles } from "lucide-react-native";
import { Image, Text, View } from "react-native";
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
}: {
  equippedItemId?: string | null;
  equippedBySlot?: EquippedBySlot;
  shopItems?: ShopItem[];
  name?: string;
  compact?: boolean;
}) {
  const popStyle = usePop(120);

  // URL base do Supabase Storage
  const SUPABASE_STORAGE_BASE =
    "https://yvwhncioydhpjdaeudpt.supabase.co/storage/v1/object/public/avatar-items";

  // Ordem correta das camadas (de baixo para cima)
  const SLOT_ORDER: (keyof EquippedBySlot)[] = [
    "body",
    "legs",
    "head",
    "accessories",
  ];

  // Busca as imagens completas dos itens equipados
  const equippedImages = SLOT_ORDER.map((slot) => {
    const itemId = equippedBySlot[slot];
    if (!itemId) return null;

    const item = shopItems.find((i) => i.id === itemId);
    const rawPath = item?.imageUrl ?? item?.image_url;

    if (!rawPath) return null;

    return rawPath.startsWith("http")
      ? rawPath
      : `${SUPABASE_STORAGE_BASE}/${rawPath}`;
  }).filter(Boolean) as string[];

  const hasEquippedItems = equippedImages.length > 0;
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
          popStyle,
        ]}
      >
        {hasEquippedItems ? (
          <View style={{ width: "100%", height: "100%", position: "relative" }}>
            {equippedImages.map((uri, index) => (
              <Image
                key={index}
                source={{ uri }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                }}
              />
            ))}
          </View>
        ) : (
          // Fallback quando nenhum item estiver equipado
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
