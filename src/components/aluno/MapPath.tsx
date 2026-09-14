import { memo } from "react";
import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { MAP_HEIGHT, MAP_PATH } from "../../constants/aluno/trail";
import { theme } from "../../constants/theme";
import type { MissionStatus } from "../../types/aluno";

export const MapPath = memo(function MapPath({
  status,
}: {
  status: MissionStatus;
}) {
  const normalizedStatus = status?.toString().toLowerCase();

  // 1. Define até onde a cobrinha vai no mapa
  const progress =
    normalizedStatus === "corrected" || normalizedStatus === "approved"
      ? "M78 900 C105 840 230 810 255 720" // Conecta Fase 1 -> Fase 2
      : "M78 900 C92 870 120 845 140 835"; // Ponto inicial na Fase 1

  // 2. Define a cor do rastro de acordo com o estado
  const getStrokeColor = () => {
    switch (normalizedStatus) {
      case "corrected":
      case "approved":
        return theme.primaryLight; // 🟢 Verde (Concluído)
      case "revision":
        return theme.warning; // 🟠 Laranja (Revisão solicitada)
      case "pending":
      case "submitted":
        return "#3B82F6"; // 🔵 Azul (Em análise pelo professor)
      default:
        return theme.primaryLight; // ⚪ Verde padrão inicial
    }
  };
  return (
    <Svg
      width="100%"
      height={MAP_HEIGHT}
      viewBox={`0 0 340 ${MAP_HEIGHT}`}
      style={StyleSheet.absoluteFill}
    >
      <Path
        d={MAP_PATH}
        fill="none"
        stroke={theme.studentMapTrail}
        strokeWidth="18"
        strokeLinecap="round"
      />
      {Boolean(progress) && (
        <Path
          d={progress}
          fill="none"
          stroke={getStrokeColor()}
          strokeWidth="18"
          strokeLinecap="round"
        />
      )}
      <Path
        d={MAP_PATH}
        fill="none"
        stroke={theme.studentMapPathSoft}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="4 14"
      />
    </Svg>
  );
});
