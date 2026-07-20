import { borderRadius, fonts, theme } from '@/constants/theme';
import {
    BarChart3,
    Bell,
    BookOpen,
    CheckSquare2,
    LayoutDashboard,
    Menu,
    UserRound,
    X,
} from 'lucide-react-native';
import React, {
    useMemo,
    useState,
} from 'react';
import {
    Pressable,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
    isCompactWidth,
    layout,
} from '../../constants/professor/prof_Layout';
import DecorativeBubble from './DecorativeBubble';
import IconButton from './IconButton';

export type HeaderDestination =
  | 'dashboard'
  | 'activities'
  | 'correctionQueue'
  | 'reports'
  | 'educatorProfile'
  | 'notifications';

export interface HeaderNotificationPreview {
  id: string;
  title: string;
  description: string;
  read?: boolean;
}

export interface EducatorHeaderProps {
  educatorName: string;

  subtitle?: string;

  currentDestination?: HeaderDestination;

  unreadNotificationsCount?: number;

  notificationPreview?: HeaderNotificationPreview[];

  onOpenDashboard: () => void;
  onOpenActivities: () => void;
  onOpenCorrectionQueue: () => void;
  onOpenReports: () => void;
  onOpenProfile: () => void;
  onOpenAllNotifications?: () => void;
}

interface HeaderMenuItem {
  id: Exclude<
    HeaderDestination,
    'notifications'
  >;

  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export default function EducatorHeader({
  educatorName,

  subtitle =
    'Escola Caminho do Saber · 5º Ano A',

  currentDestination =
    'dashboard',

  unreadNotificationsCount = 0,

  notificationPreview = [],

  onOpenDashboard,
  onOpenActivities,
  onOpenCorrectionQueue,
  onOpenReports,
  onOpenProfile,
  onOpenAllNotifications,
}: EducatorHeaderProps) {
  const { width } =
    useWindowDimensions();

  const insets =
  useSafeAreaInsets();

  const compact =
    isCompactWidth(width);

  const mobile = width < 600;

  const horizontalPadding =
    mobile
      ? layout.screenPadding.mobile
      : width <
          layout.breakpoints.desktop
        ? layout.screenPadding.tablet
        : layout.screenPadding.desktop;

  const baseHeaderHeight =
  compact
    ? layout.header.mobileHeight
    : layout.header.desktopHeight;

  const totalHeaderHeight =
  baseHeaderHeight +
  insets.top;

  const [
    notificationsOpen,
    setNotificationsOpen,
  ] = useState(false);

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  const firstName =
    educatorName
      .trim()
      .split(' ')
      .filter(Boolean)[0] ||
    'Professor';

  const initials =
    educatorName
      .trim()
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) =>
        part.charAt(0)
      )
      .join('')
      .toUpperCase() || 'PR';

  const menuItems =
    useMemo<HeaderMenuItem[]>(
      () => [
        {
          id: 'dashboard',

          label: 'Dashboard',

          icon: (
            <LayoutDashboard
              size={18}
              color={
                theme.primary
              }
            />
          ),

          onPress:
            onOpenDashboard,
        },

        {
          id: 'activities',

          label: 'Atividades',

          icon: (
            <BookOpen
              size={18}
              color={
                theme.primary
              }
            />
          ),

          onPress:
            onOpenActivities,
        },

        {
          id: 'correctionQueue',

          label:
            'Fila de correção',

          icon: (
            <CheckSquare2
              size={18}
              color={
                theme.primary
              }
            />
          ),

          onPress:
            onOpenCorrectionQueue,
        },

        {
          id: 'reports',

          label: 'Relatórios',

          icon: (
            <BarChart3
              size={18}
              color={
                theme.primary
              }
            />
          ),

          onPress:
            onOpenReports,
        },

        {
          id: 'educatorProfile',

          label: 'Meu perfil',

          icon: (
            <UserRound
              size={18}
              color={
                theme.primary
              }
            />
          ),

          onPress:
            onOpenProfile,
        },
      ],

      [
        onOpenDashboard,
        onOpenActivities,
        onOpenCorrectionQueue,
        onOpenReports,
        onOpenProfile,
      ]
    );

  function closeHeaderPanels() {
    setNotificationsOpen(false);
    setMobileMenuOpen(false);
  }

  function runMenuAction(
    action: () => void
  ) {
    closeHeaderPanels();
    action();
  }

  function toggleNotifications() {
    setMobileMenuOpen(false);
    if (
      compact &&
      onOpenAllNotifications
    ) {
      setNotificationsOpen(false);

      onOpenAllNotifications();

      return;
    }
    setNotificationsOpen(
      (current) => !current
    );
  }

  function toggleMobileMenu() {
    setNotificationsOpen(false);

    setMobileMenuOpen(
      (current) => !current
    );
  }

  return (
    <View
      style={{
        position: 'absolute',

        top: 0,
        left: 0,
        right: 0,

        zIndex: 100,

        height: totalHeaderHeight,

        borderBottomWidth: 1,

        borderBottomColor:
          theme.border,

        backgroundColor:
          theme.card,

        shadowColor: theme.textDark,

        shadowOffset: {
          width: 0,
          height: 5,
        },

        shadowOpacity: 0.08,
        shadowRadius: 14,

        elevation: 6,
      }}
    >
      {!mobile && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',

            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: '100%',

              maxWidth:
                layout.content.maxWidth,

              height: '100%',

              alignSelf: 'center',

              position: 'relative',

              paddingHorizontal:
                horizontalPadding,
            }}
          >
            <DecorativeBubble
              style={{
                top: -92,
              }}
            />
          </View>
        </View>
      )}

      {/* Conteúdo principal do header */}
      <View
        style={{
          width: '100%',

          maxWidth:
            layout.content.maxWidth,

          height:
            baseHeaderHeight,

          alignSelf: 'center',

          marginTop:
            insets.top,

          position: 'relative',
          zIndex: 2,

          paddingHorizontal:
            horizontalPadding,

          flexDirection: 'row',
          alignItems: 'center',
          justifyContent:
            'space-between',

          gap: 16,
        }}
      >
        {/* Identidade do professor */}
        <View
          style={{
            flex: 1,
            minWidth: 0,

            flexDirection: 'row',
            alignItems: 'center',

            gap: mobile ? 10 : 12,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Abrir meu perfil"
            accessibilityHint="Abre as configurações do professor"
            onPress={() =>
              runMenuAction(
                onOpenProfile
              )
            }
            style={({ pressed }) => ({
              width:
                mobile ? 42 : 48,

              height:
                mobile ? 42 : 48,

              flexShrink: 0,

              alignItems: 'center',
              justifyContent: 'center',

              borderWidth: 0,

              borderColor:
                theme.primaryTint,

              borderRadius:
                mobile ? 15 : 17,

              backgroundColor:
                theme.primary,

              opacity:
                pressed ? 0.8 : 1,

            })}
          >
            <Text
              style={{
                color:
                  theme.white,

                fontFamily:
                  fonts.headlineBold,

                fontSize:
                  mobile ? 13 : 15,
              }}
            >
              {initials}
            </Text>
          </Pressable>

          <View
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color:
                  theme.textDark,

                fontFamily:
                  fonts.headlineBold,

                fontSize:
                  mobile ? 15 : 17,
              }}
            >
              Olá, {firstName}!
            </Text>

            <Text
              numberOfLines={1}
              style={{
                marginTop: 2,

                color:
                  theme.textMuted,

                fontFamily:
                  fonts.bodyRegular,

                fontSize:
                  mobile ? 10 : 12,
              }}
            >
              {subtitle}
            </Text>
          </View>
        </View>

        {/* Navegação desktop */}

        {!compact && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              gap: 6,
            }}
          >
            {menuItems
              .filter(
                (item) =>
                  item.id !==
                  'educatorProfile'
              )
              .map((item) => {
                const active =
                  currentDestination ===
                  item.id;

                return (
                  <Pressable
                    key={item.id}
                    accessibilityRole="button"
                    accessibilityState={{
                      selected: active,
                    }}
                    onPress={() =>
                      runMenuAction(
                        item.onPress
                      )
                    }
                    style={({ pressed }) => ({
                      minHeight: 42,

                      paddingHorizontal: 12,

                      flexDirection: 'row',
                      alignItems: 'center',

                      gap: 7,

                      borderRadius:
                        borderRadius.pill,

                      backgroundColor:
                        active
                          ? theme.bgSoft
                          : 'transparent',

                      opacity:
                        pressed
                          ? 0.8
                          : 1,
                    })}
                  >
                    {item.icon}

                    <Text
                      style={{
                        color: active
                          ? theme.primary
                          : theme.textMuted,

                        fontFamily:
                          active
                            ? fonts.bodyBold
                            : fonts.bodyRegular,

                        fontSize: 13,
                      }}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}

              <IconButton
                accessibilityLabel="Notificações"
                accessibilityHint="Mostra as notificações recentes"
                badge={unreadNotificationsCount}
                variant="soft"
                icon={
                  <Bell
                    size={20}
                    color={theme.primary}
                  />
                }
                onPress={toggleNotifications}
              />
          </View>
        )}

        {/* Ações tablet e mobile */}

        {compact && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              gap: 7,
            }}
          >
            <IconButton
              accessibilityLabel="Notificações"
              accessibilityHint="Abre a Central de Notificações"
              badge={unreadNotificationsCount}
              variant="soft"
              size={
                mobile
                  ? 'small'
                  : 'medium'
              }
              icon={
                <Bell
                  size={mobile ? 19 : 20}
                  color={theme.primary}
                />
              }
              onPress={toggleNotifications}
            />

            <IconButton
              accessibilityLabel={
                mobileMenuOpen
                  ? 'Fechar menu'
                  : 'Abrir menu'
              }
              accessibilityHint="Mostra as áreas do Portal do Professor"
              variant="soft"
              size={
                mobile
                  ? 'small'
                  : 'medium'
              }
              icon={
                mobileMenuOpen ? (
                  <X
                    size={20}
                    color={
                      theme.primary
                    }
                  />
                ) : (
                  <Menu
                    size={20}
                    color={
                      theme.primary
                    }
                  />
                )
              }
              onPress={
                toggleMobileMenu
              }
            />
          </View>
        )}
      </View>

      {/* Menu compacto */}

      {mobileMenuOpen && (
        <View
          style={{
            position: 'absolute',

            top:
              totalHeaderHeight + 8,

            right:
              mobile ? 12 : 20,

            zIndex: 110,

            width: mobile
              ? Math.min(
                  width - 24,
                  310
                )
              : 320,

            overflow: 'hidden',

            borderWidth: 1,

            borderColor:
              theme.border,

            borderRadius:
              borderRadius.xxl,

            backgroundColor:
              theme.card,

            ...theme.shadowCard,
          }}
        >
          <View
            style={{
              padding: 10,
              gap: 4,
            }}
          >
            {menuItems.map(
              (item) => {
                const active =
                  currentDestination ===
                  item.id;

                return (
                  <Pressable
                    key={item.id}
                    accessibilityRole="button"
                    accessibilityState={{
                      selected: active,
                    }}
                    onPress={() =>
                      runMenuAction(
                        item.onPress
                      )
                    }
                    style={({ pressed }) => ({
                      minHeight: 48,

                      paddingHorizontal: 13,

                      flexDirection: 'row',
                      alignItems: 'center',

                      gap: 11,

                      borderRadius:
                        borderRadius.lg,

                      backgroundColor:
                        active
                          ? theme.bgSoft
                          : 'transparent',

                      opacity:
                        pressed
                          ? 0.78
                          : 1,
                    })}
                  >
                    {item.icon}

                    <Text
                      style={{
                        flex: 1,

                        color: active
                          ? theme.primary
                          : theme.textDark,

                        fontFamily:
                          active
                            ? fonts.bodyBold
                            : fonts.bodyRegular,

                        fontSize: 14,
                      }}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              }
            )}
          </View>
        </View>
      )}

      {/* Prévia desktop das notificações */}

      {notificationsOpen && (
        <View
          style={{
            position: 'absolute',

            top:
            totalHeaderHeight + 8,

            right: 20,

            zIndex: 110,

            width: 390,

            overflow: 'hidden',

            borderWidth: 1,

            borderColor:
              theme.border,

            borderRadius:
              borderRadius.xxl,

            backgroundColor:
              theme.card,

            ...theme.shadowCard,
          }}
        >
          <View
            style={{
              paddingHorizontal: 17,
              paddingTop: 16,
              paddingBottom: 12,

              flexDirection: 'row',
              alignItems: 'center',

              justifyContent:
                'space-between',

              gap: 12,

              borderBottomWidth: 1,

              borderBottomColor:
                theme.border,
            }}
          >
            <View>
              <Text
                style={{
                  color:
                    theme.textDark,

                  fontFamily:
                    fonts.headlineSemibold,

                  fontSize: 15,
                }}
              >
                Notificações
              </Text>

              <Text
                style={{
                  marginTop: 3,

                  color:
                    theme.textMuted,

                  fontFamily:
                    fonts.bodyRegular,

                  fontSize: 11,
                }}
              >
                Eventos recentes
              </Text>
            </View>

            <IconButton
              accessibilityLabel="Fechar notificações"
              variant="plain"
              size="small"
              icon={
                <X
                  size={18}
                  color={
                    theme.textMuted
                  }
                />
              }
              onPress={() =>
                setNotificationsOpen(
                  false
                )
              }
            />
          </View>

          <View>
            {notificationPreview.length ===
            0 ? (
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 28,

                  alignItems: 'center',
                }}
              >
                <Bell
                  size={24}
                  color={
                    theme.primary
                  }
                />

                <Text
                  style={{
                    marginTop: 10,

                    color:
                      theme.textDark,

                    fontFamily:
                      fonts.headlineSemibold,

                    fontSize: 14,

                    textAlign: 'center',
                  }}
                >
                  Nenhuma notificação
                </Text>

                <Text
                  style={{
                    marginTop: 5,

                    color:
                      theme.textMuted,

                    fontFamily:
                      fonts.bodyRegular,

                    fontSize: 12,

                    textAlign: 'center',
                  }}
                >
                  Os novos eventos aparecerão
                  aqui.
                </Text>
              </View>
            ) : (
              notificationPreview
                .slice(0, 3)
                .map(
                  (
                    notification,
                    index
                  ) => (
                    <Pressable
                      key={
                        notification.id
                      }
                      accessibilityRole="button"
                      accessibilityLabel={
                        notification.title
                      }
                      accessibilityHint="Abre a Central de Notificações"
                      onPress={() => {
                        setNotificationsOpen(
                          false
                        );

                        onOpenAllNotifications?.();
                      }}
                      style={({ pressed }) => ({
                        paddingHorizontal: 17,
                        paddingVertical: 14,

                        borderTopWidth:
                          index === 0
                            ? 0
                            : 1,

                        borderTopColor:
                          theme.border,

                        backgroundColor:
                          notification.read
                            ? theme.card
                            : theme.bgSoft,

                        opacity:
                          pressed
                            ? 0.8
                            : 1,
                      })}
                    >
                      <View
                        style={{
                          flexDirection:
                            'row',

                          alignItems:
                            'flex-start',

                          gap: 9,
                        }}
                      >
                        {!notification.read && (
                          <View
                            style={{
                              width: 8,
                              height: 8,

                              marginTop: 5,

                              flexShrink: 0,

                              borderRadius: 4,

                              backgroundColor:
                                theme.warning,
                            }}
                          />
                        )}

                        <View
                          style={{
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={{
                              color:
                                theme.textDark,

                              fontFamily:
                                fonts.bodyBold,

                              fontSize: 13,
                            }}
                          >
                            {
                              notification.title
                            }
                          </Text>

                          <Text
                            numberOfLines={2}
                            style={{
                              marginTop: 4,

                              color:
                                theme.textMuted,

                              fontFamily:
                                fonts.bodyRegular,

                              fontSize: 12,
                              lineHeight: 17,
                            }}
                          >
                            {
                              notification.description
                            }
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  )
                )
            )}
          </View>

          {!!onOpenAllNotifications && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Ver todas as notificações"
              onPress={() => {
                setNotificationsOpen(
                  false
                );

                onOpenAllNotifications();
              }}
              style={({ pressed }) => ({
                minHeight: 48,

                alignItems: 'center',
                justifyContent: 'center',

                borderTopWidth: 1,

                borderTopColor:
                  theme.border,

                backgroundColor:
                  theme.card,

                opacity:
                  pressed ? 0.78 : 1,
              })}
            >
              <Text
                style={{
                  color:
                    theme.primary,

                  fontFamily:
                    fonts.bodyBold,

                  fontSize: 13,
                }}
              >
                Ver todas as notificações
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}