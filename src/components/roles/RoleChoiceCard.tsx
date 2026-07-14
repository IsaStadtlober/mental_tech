import { ChevronRight } from 'lucide-react-native';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { ROLES_CONSTANTS } from '../../constants/roles';
import { theme } from '../../constants/theme';
import { EASE_STANDARD } from '../../hooks/useAnimations';
import { styles } from '../../styles';
import { RoleChoiceCardProps } from '../../types/components';
import { CompassPlay, GraduationCapPlay } from '../carousel/CarouselIcons';

export function RoleChoiceCard({
    type,
    active,
    title,
    description,
    onPress,
    delay = 0,
}: RoleChoiceCardProps) {
    const fade = useSharedValue(0);

    useEffect(() => {
        fade.value = withDelay(
            delay,
            withTiming(1, {
                duration: ROLES_CONSTANTS.ANIMATIONS.CARD_FADE_DURATION,
                easing: EASE_STANDARD,
            })
        );
    }, [delay, fade]);

    const fadeStyle = useAnimatedStyle(() => ({
        opacity: fade.value,
        transform: [{ translateY: 10 * (1 - fade.value) }],
    }));

    return (
        <Animated.View style={fadeStyle}>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.9}
                style={[
                    styles.roleCard,
                    {
                        backgroundColor: active ? theme.primary : theme.card,
                        ...(active ? styles.roleCardActive : theme.shadowCard),
                    },
                ]}
            >
                <View
                    style={[
                        styles.roleCardGlow,
                        { backgroundColor: active ? 'rgba(255,255,255,0.08)' : 'rgba(47,143,118,0.06)' },
                    ]}
                />

                <View
                    style={[
                        styles.roleSparkle,
                        { backgroundColor: active ? theme.bg : theme.primaryLight },
                    ]}
                />

                <View style={styles.roleCardContent}>
                    <View
                        style={[
                            styles.roleIconBox,
                            { backgroundColor: active ? theme.primaryFaint : theme.bgSoft },
                        ]}
                    >
                        {type === 'student' ? (
                            <CompassPlay size={26} color={active ? theme.bg : theme.primary} />
                        ) : (
                            <GraduationCapPlay size={26} color={active ? theme.bg : theme.primary} />
                        )}
                    </View>

                    <View style={styles.contextBody}>
                        <Text style={[styles.roleTitle, active ? styles.roleTitleActive : styles.roleTitleInactive]}>
                            {title}
                        </Text>

                        <Text style={[styles.roleDescription, active ? styles.roleDescriptionActive : styles.roleDescriptionInactive]}>
                            {description}
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.roleArrow,
                            { backgroundColor: active ? theme.primaryFaint : theme.bgSoft },
                        ]}
                    >
                        <ChevronRight size={17} color={active ? theme.bg : theme.primary} />
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}