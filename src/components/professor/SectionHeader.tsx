import { SECTION_HEADER_VISUALS } from '@/constants/professor/sectionHeader';
import { sectionHeaderStyles } from '@/styles/professor/sectionHeader';
import type { SectionHeaderProps } from '@/types/professor/sectionHeader';
import { getSectionHeaderLayout } from '@/utils/professor/sectionHeader';
import { Text, useWindowDimensions, View } from 'react-native';

export default function SectionHeader({
  title,
  subtitle,
  eyebrow,
  action,
  compact = false,
  style,
}: SectionHeaderProps) {
  const { width } = useWindowDimensions();
  const stackAction = width < SECTION_HEADER_VISUALS.mobileBreakpoint;
  const layout = getSectionHeaderLayout(compact);

  return (
    <View
      style={[
        sectionHeaderStyles.container,
        {
          flexDirection: stackAction ? 'column' : 'row',
          alignItems: stackAction ? 'stretch' : 'flex-start',
          gap: stackAction ? SECTION_HEADER_VISUALS.stackGap : SECTION_HEADER_VISUALS.rowGap,
        },
        style,
      ]}
    >
      <View style={sectionHeaderStyles.content}>
        {!!eyebrow && <Text style={sectionHeaderStyles.eyebrow}>{eyebrow}</Text>}

        <Text
          style={[
            sectionHeaderStyles.title,
            {
              fontSize: layout.titleFontSize,
              lineHeight: layout.titleLineHeight,
            },
          ]}
        >
          {title}
        </Text>

        {!!subtitle && <Text style={sectionHeaderStyles.subtitle}>{subtitle}</Text>}
      </View>

      {!!action && (
        <View
          style={[
            sectionHeaderStyles.actionWrapper,
            {
              width: stackAction ? '100%' : undefined,
              alignItems: stackAction ? 'stretch' : 'flex-end',
            },
          ]}
        >
          {action}
        </View>
      )}
    </View>
  );
}