import { Platform, StyleSheet } from 'react-native';
import { BANNER_H, FRAME_H, FRAME_W } from '../constants/layout';
import { fonts, theme } from '../constants/theme'; // Caminho atualizado

/* ============================================================
   STYLESHEET
   ============================================================ */
export const styles = StyleSheet.create({
  gestureRoot: { flex: 1 },
  outerWrap: { flex: 1, backgroundColor: '#F0EAE1', alignItems: 'center', justifyContent: 'center' },
  phoneFrame: {
    width: FRAME_W,
    height: FRAME_H,
    borderRadius: Platform.OS === 'web' ? 40 : 0,
    overflow: 'hidden',
    borderWidth: Platform.OS === 'web' ? 8 : 0,
    borderColor: '#17171A',
    ...(Platform.OS === 'web' ? { shadowColor: 'rgba(23,63,55,1)', shadowOffset: { width: 0, height: 30 }, shadowOpacity: 0.35, shadowRadius: 60 } : {}),
  },
  bgItem: { position: 'absolute' },
  iconCardWrap: {
    width: 104,
    height: 104,
    borderRadius: 33,
    marginBottom: 32,
    shadowColor: 'rgba(30,107,92,1)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 10,
  },

  iconCard: {
    flex: 1,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconCardHaloBorder: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },

  iconCardSparkle: {
    position: 'absolute',
    backgroundColor: theme.bg,
  },

  primaryBtn: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, paddingHorizontal: 24, borderRadius: 18 },
  primaryBtnText: { color: '#fff', fontFamily: fonts.headlineSemibold, fontSize: 16 },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  dot: {
    height: 6,
    borderRadius: 3,
  },
  ctaRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  btnShine: {
    position: 'absolute',
    top: 10,
    right: 18,
    width: 10,
    height: 10,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  carouselRoot: { flex: 1, backgroundColor: theme.bg },
  carouselTopRow: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 24, paddingTop: 24 },
  skipText: { fontFamily: fonts.bodyBold, fontSize: 14, color: 'rgba(30,107,92,0.6)' },
  carouselBody: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  carouselContent: { alignItems: 'center' },
  eyebrow: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: theme.primaryLight, marginBottom: 12, textAlign: 'center' },
  carouselTitle: { fontFamily: fonts.headlineBold, fontSize: 24, lineHeight: 30, color: theme.textDark, maxWidth: 290, textAlign: 'center', marginBottom: 16 },
  carouselText: { fontFamily: fonts.bodyRegular, fontSize: 15, lineHeight: 22, color: '#4A5A55', maxWidth: 310, textAlign: 'center' },
  carouselFooter: { paddingHorizontal: 32, paddingBottom: 40, paddingTop: 16, alignItems: 'center', gap: 24 },

  roleRoot: {
    flex: 1,
    backgroundColor: theme.bg,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  roleInner: {
    zIndex: 2,
  },

  roleHeroIconWrap: {
    width: 76,
    height: 76,
    borderRadius: 24,
    alignSelf: 'center',
    marginBottom: 24,
    shadowColor: 'rgba(30,107,92,1)',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 10,
  },

  roleHeroIcon: {
    flex: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.bg,
    opacity: 0.65,
  },

  heroDotSmall: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.bg,
    opacity: 0.45,
  },

  roleEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: theme.primaryLight,
    textAlign: 'center',
    marginBottom: 12,
  },

  roleHeading: {
    fontFamily: fonts.headlineBold,
    fontSize: 24,
    lineHeight: 30,
    color: theme.textDark,
    textAlign: 'center',
    marginBottom: 8,
  },

  roleSubheading: {
    fontFamily: fonts.bodyRegular,
    fontSize: 15,
    lineHeight: 22,
    color: theme.textMuted,
    textAlign: 'center',
    marginBottom: 40,
  },

  roleCards: {
    gap: 16,
  },

  roleCard: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 24,
    padding: 16,
  },

  roleCardGlow: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 130,
    height: 130,
    borderRadius: 80,
  },

  roleSparkle: {
    position: 'absolute',
    top: 18,
    right: 22,
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.55,
  },

  roleCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  roleIconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  roleTitle: {
    fontFamily: fonts.headlineBold,
    fontSize: 16,
    marginBottom: 2,
  },

  roleDescription: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    lineHeight: 18,
  },

  roleArrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  educatorOptions: {
    marginTop: 16,
    borderRadius: 18,
    backgroundColor: theme.card,
    overflow: 'hidden',
    ...theme.shadowCard,
  },

  optionButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  optionText: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: theme.textDark,
  },

  optionArrow: {
    fontSize: 18,
    color: theme.textFaint,
  },

  optionDivider: {
    height: 1,
    marginHorizontal: 24,
    backgroundColor: theme.border,
  },

  roleBack: {
    marginTop: 32,
    alignItems: 'center',
  },

  roleBackText: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: theme.textFaint,
  },
  floatingBack: {
    position: 'absolute',
    top: 16,
    left: 24,
    zIndex: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.86)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    shadowColor: 'rgba(23,63,55,1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },

  floatingBackText: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: theme.primary,
  },

  shellRoot: {
    flex: 1,
    backgroundColor: theme.bg,
  },

  shellScroll: {
    flex: 1,
  },

  formBanner: {
    height: BANNER_H,
    position: 'relative',
    overflow: 'hidden',
  },

  sheet: {
    backgroundColor: theme.card,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 32,
    paddingTop: 32,
    ...theme.shadowSheet,
  },

  footerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 32,
    paddingBottom: 32,
    paddingTop: 24,
    backgroundColor: 'rgba(255,255,255,0.96)',
  },

  authHeader: {
    marginBottom: 24,
  },

  centerItems: {
    alignItems: 'center',
  },

  leftItems: {
    alignItems: 'flex-start',
  },

  textCenter: {
    textAlign: 'center',
  },

  textLeft: {
    textAlign: 'left',
  },

  authTitle: {
    fontFamily: fonts.headlineBold,
    fontSize: 24,
    lineHeight: 30,
    color: theme.textDark,
    marginBottom: 6,
  },

  authSubtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 15,
    lineHeight: 22,
    color: theme.textMuted,
  },

  simpleHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },

  inputLabel: {
    fontFamily: fonts.bodyBold,
    color: theme.textDark,
    marginLeft: 4,
  },

  input: {
    width: '100%',
    borderWidth: 2,
    color: theme.textDark,
    fontFamily: fonts.bodyRegular,
  },

  manualLabel: {
    fontFamily: fonts.bodyBold,
    color: theme.textDark,
    fontSize: 13,
    marginLeft: 4,
    marginBottom: 8,
  },

  helperText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    lineHeight: 18,
    textAlign: 'center',
    color: theme.textMuted,
    marginTop: 14,
    paddingHorizontal: 8,
  },

  explorerAvatar: {
    width: 104,
    height: 104,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: 'rgba(30,107,92,1)',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 10,
  },

  explorerAvatarGradient: {
    flex: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  successSheet: {
    minHeight: FRAME_H - BANNER_H,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 48,
  },

  successBadge: {
    width: 96,
    height: 96,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: 'rgba(30,107,92,1)',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 10,
  },

  successEmoji: {
    fontSize: 38,
  },

  successDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.bg,
    opacity: 0.65,
  },

  successDotSmall: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.bg,
    opacity: 0.45,
  },

  successTitle: {
    fontFamily: fonts.headlineBold,
    fontSize: 24,
    lineHeight: 30,
    color: theme.textDark,
    textAlign: 'center',
    marginBottom: 12,
  },

  successDescription: {
    fontFamily: fonts.bodyRegular,
    fontSize: 15,
    lineHeight: 22,
    color: theme.textMuted,
    textAlign: 'center',
    marginBottom: 36,
  },
  successFooter: {
    marginTop: 12,
    alignItems: 'center',
  },

  separator: {
    height: 1,
    backgroundColor: theme.border,
    marginTop: 24,
    marginBottom: 20,
  },

  loginLinks: {
    alignItems: 'center',
    gap: 18,
  },

  linkMuted: {
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 20,
    color: theme.textMuted,
    textAlign: 'center',
  },

  linkStrong: {
    fontFamily: fonts.bodyBold,
    color: theme.primary,
  },
  recoveryHelperText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    lineHeight: 19,
    color: theme.textMuted,
    textAlign: 'center',
    marginTop: 14,
    paddingHorizontal: 4,
  },

  sentNoticeBox: {
    width: '100%',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: theme.bgSoft,
    borderWidth: 1,
    borderColor: 'rgba(47,143,118,0.18)',
  },

  sentNoticeTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: theme.textDark,
    textAlign: 'center',
    marginBottom: 6,
  },

  sentNoticeText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    lineHeight: 19,
    color: theme.textMuted,
    textAlign: 'center',
  },
  errorText: {
    fontFamily: fonts.bodyBold,
    color: theme.danger,
    fontSize: 12,
    marginLeft: 4,
    marginTop: -6,
  },
  wizardProgress: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
  },

  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  progressDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressNumber: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
  },

  progressLine: {
    width: 24,
    height: 2,
    borderRadius: 999,
  },

  wizardCaption: {
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    color: theme.textMuted,
    textAlign: 'center',
    marginBottom: 24,
  },

  screenTitle: {
    fontFamily: fonts.headlineBold,
    fontSize: 24,
    lineHeight: 30,
    color: theme.textDark,
    marginBottom: 8,
  },

  screenSubtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 15,
    lineHeight: 22,
    color: theme.textMuted,
    marginBottom: 24,
  },

  periodSelectWrap: {
    gap: 8,
  },

  periodOptionsRow: {
    flexDirection: 'row',
    gap: 8,
  },

  periodOption: {
    flex: 1,
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  periodOptionText: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
  },
  contextCard: {
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 20,
    backgroundColor: theme.bgSubtle,
    marginBottom: 28,
  },

  contextIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contextLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: theme.textMuted,
    marginBottom: 2,
  },

  contextTitle: {
    fontFamily: fonts.headlineBold,
    fontSize: 15,
    color: theme.textDark,
  },

  skipButton: {
    alignItems: 'center',
  },

  skipSecondary: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: theme.textFaint,
  },
  sectionLabel: {
    fontFamily: fonts.headlineBold,
    fontSize: 15,
    color: theme.textDark,
    marginBottom: 16,
  },

  uploadBox: {
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.teal,
    backgroundColor: theme.bgSubtle,
    marginBottom: 24,
  },

  uploadIconBox: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: 'rgba(23,63,55,1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },

  uploadTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: '#00685F',
    marginBottom: 4,
    textAlign: 'center',
  },

  uploadSubtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: theme.textFaint,
    textAlign: 'center',
  },

  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },

  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.border,
  },

  orText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: theme.textFaint,
  },

  studentManualBlock: {
    gap: 16,
  },

  addStudent: {
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 32,
  },

  addStudentText: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: theme.primary,
  },
  studentBlockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: -4,
  },

  studentBlockTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: theme.textDark,
  },

  removeStudentButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(229,62,62,0.08)',
  },

  removeStudentText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: theme.danger,
  },
});