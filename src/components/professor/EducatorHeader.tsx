import { EDUCATOR_HEADER_COPY, EDUCATOR_HEADER_DEFAULTS } from '@/constants/professor/educatorHeader';
import { theme } from '@/constants/theme';
import { educatorHeaderStyles } from '@/styles/professor/educatorHeader';
import type { EducatorHeaderProps, HeaderMenuItem } from '@/types/professor/educatorHeader';
import { BarChart3, Bell, BookOpen, CheckSquare2, LayoutDashboard, Menu, UserRound, X } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isCompactWidth, layout } from '../../constants/professor/prof_Layout';
import DecorativeBubble from './DecorativeBubble';
import IconButton from './IconButton';

export default function EducatorHeader({
  educatorName,

  subtitle = EDUCATOR_HEADER_DEFAULTS.subtitle,

  currentDestination = EDUCATOR_HEADER_DEFAULTS.currentDestination,

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
    <View style={[educatorHeaderStyles.shell, { height: totalHeaderHeight }]}>
      {!mobile && (
        <View pointerEvents="none" style={educatorHeaderStyles.overlay}>
          <View style={[educatorHeaderStyles.overlayInner, { paddingHorizontal: horizontalPadding }]}>
            <DecorativeBubble
              style={{
                top: -92,
              }}
            />
          </View>
        </View>
      )}

      {/* Conteúdo principal do header */}
      <View style={[educatorHeaderStyles.mainRow, { height: baseHeaderHeight, marginTop: insets.top, paddingHorizontal: horizontalPadding }]}>
        {/* Identidade do professor */}
        <View style={[educatorHeaderStyles.identityRow, { gap: mobile ? 10 : 12 }]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={EDUCATOR_HEADER_COPY.profileActionLabel}
            accessibilityHint={EDUCATOR_HEADER_COPY.profileActionHint}
            onPress={() =>
              runMenuAction(
                onOpenProfile
              )
            }
            style={({ pressed }) => ({
              width: mobile ? 42 : 48,
              height: mobile ? 42 : 48,
              opacity: pressed ? 0.8 : 1,
              ...educatorHeaderStyles.avatar,
              borderRadius: mobile ? 15 : 17,
            })}
          >
            <Text style={[educatorHeaderStyles.avatarText, { fontSize: mobile ? 13 : 15 }]}>
              {initials}
            </Text>
          </Pressable>

          <View
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Text numberOfLines={1} style={[educatorHeaderStyles.greetingText, { fontSize: mobile ? 15 : 17 }]}>
              Olá, {firstName}!
            </Text>

            <Text numberOfLines={1} style={[educatorHeaderStyles.subtitleText, { fontSize: mobile ? 10 : 12 }]}>
              {subtitle}
            </Text>
          </View>
        </View>

        {/* Navegação desktop */}

        {!compact && (
          <View style={educatorHeaderStyles.navRow}>
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
                      opacity: pressed ? 0.8 : 1,
                      ...educatorHeaderStyles.navItem,
                      ...(active ? educatorHeaderStyles.navItemActive : {}),
                    })}
                  >
                    {item.icon}

                    <Text style={[educatorHeaderStyles.navItemText, active ? educatorHeaderStyles.navItemTextActive : undefined]}>
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}

            <IconButton
              accessibilityLabel={EDUCATOR_HEADER_COPY.notificationsLabel}
              accessibilityHint={EDUCATOR_HEADER_COPY.notificationsHint}
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
          <View style={educatorHeaderStyles.mobileActions}>
            <IconButton
              accessibilityLabel={EDUCATOR_HEADER_COPY.notificationsLabel}
              accessibilityHint={EDUCATOR_HEADER_COPY.mobileNotificationsHint}
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
                  ? EDUCATOR_HEADER_COPY.mobileMenuCloseLabel
                  : EDUCATOR_HEADER_COPY.mobileMenuLabel
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
        <View style={[educatorHeaderStyles.panel, { top: totalHeaderHeight + 8, right: mobile ? 12 : 20, width: mobile ? Math.min(width - 24, 310) : 320 }]}>
          <View style={educatorHeaderStyles.panelContent}>
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
                      opacity: pressed ? 0.78 : 1,
                      ...educatorHeaderStyles.panelItem,
                      ...(active ? educatorHeaderStyles.panelItemActive : {}),
                    })}
                  >
                    {item.icon}

                    <Text style={[educatorHeaderStyles.panelItemText, active ? educatorHeaderStyles.panelItemTextActive : undefined]}>
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
        <View style={[educatorHeaderStyles.panel, educatorHeaderStyles.notificationPanel, { top: totalHeaderHeight + 8, right: 20 }]}>
          <View style={educatorHeaderStyles.notificationHeader}>
            <View>
              <Text style={educatorHeaderStyles.notificationHeaderTitle}>
                {EDUCATOR_HEADER_COPY.notificationsTitle}
              </Text>

              <Text style={educatorHeaderStyles.notificationHeaderSubtitle}>
                {EDUCATOR_HEADER_COPY.notificationsSubtitle}
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
              <View style={educatorHeaderStyles.emptyState}>
                <Bell
                  size={24}
                  color={
                    theme.primary
                  }
                />

                <Text style={educatorHeaderStyles.emptyStateTitle}>
                  {EDUCATOR_HEADER_COPY.emptyStateTitle}
                </Text>

                <Text style={educatorHeaderStyles.emptyStateSubtitle}>
                  {EDUCATOR_HEADER_COPY.emptyStateSubtitle}
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
                        opacity: pressed ? 0.8 : 1,
                        ...educatorHeaderStyles.notificationItem,
                        ...(notification.read ? {} : educatorHeaderStyles.notificationItemUnread),
                        borderTopWidth: index === 0 ? 0 : 1,
                        borderTopColor: theme.border,
                      })}
                    >
                      <View style={educatorHeaderStyles.notificationItemRow}>
                        {!notification.read && (
                          <View style={educatorHeaderStyles.notificationItemBadge} />
                        )}

                        <View style={educatorHeaderStyles.notificationItemContent}>
                          <Text numberOfLines={1} style={educatorHeaderStyles.notificationItemText}>
                            {
                              notification.title
                            }
                          </Text>

                          <Text numberOfLines={2} style={educatorHeaderStyles.notificationItemDescription}>
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
                opacity: pressed ? 0.78 : 1,
                ...educatorHeaderStyles.footerButton,
              })}
            >
              <Text style={educatorHeaderStyles.footerButtonText}>
                {EDUCATOR_HEADER_COPY.viewAllLabel}
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}