import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { theme, fonts, FRAME_H, BANNER_H } from '@/constants/theme';
import { BackgroundScene } from './BackgroundScene';

interface FloatingBackButtonProps {
    onPress?: () => void;
}

function FloatingBackButton({ onPress }: FloatingBackButtonProps) {
    if (!onPress) return null;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={styles.floatingBack}
        >
            <ArrowLeft size={18} color={theme.primary} />
            <Text style={styles.floatingBackText}>Voltar</Text>
        </TouchableOpacity>
    );
}

interface FormBannerProps {
    variant?: 'clouds' | 'trees' | 'mixedHigh' | 'mixed';
}

function FormBanner({ variant = 'clouds' }: FormBannerProps) {
    return (
        <View style={styles.formBanner}>
            <BackgroundScene variant={variant} />
        </View>
    );
}

interface ScreenShellProps {
    onBack?: () => void;
    footer?: React.ReactNode;
    children: React.ReactNode;
    bannerVariant?: 'clouds' | 'trees' | 'mixedHigh' | 'mixed';
    footerPadding?: number;
}

export function ScreenShell({
    onBack,
    footer,
    children,
    bannerVariant = 'clouds',
    footerPadding = 112,
}: ScreenShellProps) {
    return (
        <View style={styles.shellRoot}>
            <FloatingBackButton onPress={onBack} />

            <ScrollView
                style={styles.shellScroll}
                contentContainerStyle={{ minHeight: FRAME_H }}
                showsVerticalScrollIndicator={false}
            >
                <FormBanner variant={bannerVariant} />

                <View
                    style={[
                        styles.sheet,
                        {
                            minHeight: FRAME_H - BANNER_H,
                            paddingBottom: footerPadding,
                        },
                    ]}
                >
                    {children}
                </View>
            </ScrollView>

            {!!footer && <View style={styles.footerOverlay}>{footer}</View>}
        </View>
    );
}

const styles = StyleSheet.create({
    shellRoot: {
        flex: 1,
        backgroundColor: theme.bg,
    },
    shellScroll: {
        flex: 1,
    },
    formBanner: {
        height: BANNER_H,
        overflow: 'hidden',
        backgroundColor: theme.bgSoft,
    },
    sheet: {
        backgroundColor: theme.card,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 24,
        paddingTop: 32,
        ...theme.shadowSheet,
    },
    footerOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingBottom: Platform.OS === 'ios' ? 34 : 24,
        paddingTop: 16,
        backgroundColor: 'rgba(252, 246, 240, 0.92)',
    },
    floatingBack: {
        position: 'absolute',
        top: 16,
        left: 24,
        zIndex: 40,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.86)',
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 999,
        shadowColor: 'rgba(23,63,55,1)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    floatingBackText: {
        fontFamily: fonts.bodyBold,
        fontSize: 13,
        color: theme.primary,
    },
});