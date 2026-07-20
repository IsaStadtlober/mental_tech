import { StyleSheet } from 'react-native';

import { borderRadius, fonts, theme } from '@/constants/theme';

export const reportsStyles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: theme.bgSubtle,
    },
    screenContainer: {
        width: '100%',
        maxWidth: 1280,
        alignSelf: 'center',
        paddingTop: 28,
        paddingBottom: 64,
    },
    topBar: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        gap: 8,
    },
    headerSection: {
        marginBottom: 20,
    },
    title: {
        color: theme.textDark,
        fontFamily: fonts.headlineBold,
    },
    subtitle: {
        maxWidth: 720,
        marginTop: 6,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 14,
        lineHeight: 21,
    },
    messageBanner: {
        marginBottom: 18,
        paddingHorizontal: 14,
        paddingVertical: 11,
        borderRadius: borderRadius.lg,
    },
    messageText: {
        fontFamily: fonts.bodyBold,
        fontSize: 12,
        lineHeight: 18,
    },
    filtersCard: {
        marginTop: 24,
    },
    sectionLabel: {
        marginBottom: 9,
        color: theme.textDark,
        fontFamily: fonts.bodyBold,
        fontSize: 13,
    },
    filterList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    filterChip: {
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: borderRadius.pill,
        backgroundColor: theme.card,
    },
    filterChipActive: {
        borderColor: theme.primary,
        backgroundColor: theme.primary,
    },
    filterChipText: {
        color: theme.textMuted,
        fontFamily: fonts.bodyBold,
        fontSize: 12,
    },
    filterChipTextActive: {
        color: theme.white,
    },
    periodChip: {
        paddingHorizontal: 13,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: borderRadius.pill,
        backgroundColor: theme.card,
    },
    periodChipActive: {
        borderColor: theme.info,
        backgroundColor: theme.infoSoft,
    },
    periodChipText: {
        color: theme.textMuted,
        fontFamily: fonts.bodyBold,
        fontSize: 12,
    },
    periodChipTextActive: {
        color: theme.info,
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        marginTop: 20,
    },
    splitLayout: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 20,
        marginTop: 20,
    },
    splitPanel: {
        flex: 1,
        minWidth: 280,
    },
    panelContent: {
        gap: 22,
    },
    attentionList: {
        gap: 12,
    },
    attentionItem: {
        padding: 14,
        borderRadius: borderRadius.lg,
    },
    attentionTitle: {
        fontFamily: fonts.bodyBold,
        fontSize: 13,
    },
    attentionDescription: {
        marginTop: 4,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 12,
    },
    studentSelectorCard: {
        marginTop: 20,
    },
    evolutionCard: {
        marginTop: 20,
    },
    chartContainer: {
        height: 160,
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 16,
        paddingHorizontal: 12,
        paddingTop: 20,
        borderRadius: borderRadius.xl,
        backgroundColor: theme.bgSubtle,
    },
    chartBarColumn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    chartBarValue: {
        marginBottom: 6,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 10,
    },
    chartBar: {
        width: '100%',
        maxWidth: 64,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: theme.primary,
    },
});
