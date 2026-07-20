import { theme } from '@/constants/theme';
import {
  StyleSheet,
} from 'react-native';

export const educatorStyles =
  StyleSheet.create({
    page: {
      flex: 1,

      backgroundColor:
        theme.bgSubtle,
    },

    screenContainer: {
      width: '100%',
      maxWidth: 1280,

      alignSelf: 'center',

      paddingTop: 28,
      paddingBottom: 64,
    },

    metricsGrid: {
      width: '100%',

      flexDirection: 'row',
      flexWrap: 'wrap',

      alignItems: 'stretch',

      gap: 16,
    },

    contentGrid: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'stretch',
      gap: 20,
    },

    mainColumn: {
      flexGrow: 2,
      flexShrink: 1,
      flexBasis: 620,

      minWidth: 0,

      gap: 20,
    },

    sideColumn: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 300,

      minWidth: 280,

      gap: 20,
    },

    section: {
      marginTop: 24,
    },

    stack: {
      width: '100%',
      gap: 12,
    },

    buttonRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',

      alignItems: 'center',

      gap: 12,
    },

    panelHeaderSpacing: {
      marginBottom: 18,
    },
  });