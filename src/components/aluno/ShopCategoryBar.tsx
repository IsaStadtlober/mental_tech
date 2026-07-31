import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
    LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent,
    ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import { SHOP_CATEGORIES } from '../../constants/aluno/shop';
import { theme } from '../../constants/theme';
import { alunoStyles as s } from '../../styles/aluno';
import type { ShopCategory } from '../../types/aluno';

const SCROLL_STEP = 140;
const EDGE_TOLERANCE = 8;

export function ShopCategoryBar({
  value,
  onChange,
}: {
  value: ShopCategory;
  onChange(value: ShopCategory): void;
}) {
  const scrollRef = useRef<ScrollView>(null);
  const [offset, setOffset] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  const hasOverflow = contentWidth > viewportWidth + EDGE_TOLERANCE;
  const canGoBack = hasOverflow && offset > EDGE_TOLERANCE;
  const canGoForward =
    hasOverflow && offset + viewportWidth < contentWidth - EDGE_TOLERANCE;

  const handleViewportLayout = (event: LayoutChangeEvent) => {
    setViewportWidth(event.nativeEvent.layout.width);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setOffset(event.nativeEvent.contentOffset.x);
  };

  const scrollTo = (nextOffset: number) => {
    const maximumOffset = Math.max(0, contentWidth - viewportWidth);
    scrollRef.current?.scrollTo({
      x: Math.max(0, Math.min(nextOffset, maximumOffset)),
      animated: true,
    });
  };

  return (
    <View style={s.categoryRail}>
      <View style={s.categoryArrowSlot}>
        {canGoBack && (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Ver categorias anteriores"
            onPress={() => scrollTo(offset - SCROLL_STEP)}
            style={s.categoryArrow}
          >
            <ChevronLeft size={17} color={theme.primary} />
          </TouchableOpacity>
        )}
      </View>

      <View onLayout={handleViewportLayout} style={s.categoryViewport}>
        <ScrollView
          ref={scrollRef}
          horizontal
          bounces={false}
          directionalLockEnabled
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={(width) => setContentWidth(width)}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={s.categoryBar}
        >
          {SHOP_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              accessibilityRole="button"
              accessibilityState={{ selected: value === category.id }}
              onPress={() => onChange(category.id)}
              style={[
                s.categoryButton,
                value === category.id && s.categoryButtonActive,
              ]}
            >
              <Text
                style={[
                  s.categoryButtonText,
                  value === category.id && s.categoryButtonTextActive,
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={s.categoryArrowSlot}>
        {canGoForward && (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Ver mais categorias"
            onPress={() => scrollTo(offset + SCROLL_STEP)}
            style={s.categoryArrow}
          >
            <ChevronRight size={17} color={theme.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}