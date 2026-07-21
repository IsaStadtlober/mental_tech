import type { HeaderDestination } from '@/types/professor/educatorHeader';

export const EDUCATOR_HEADER_DEFAULTS = {
    subtitle: 'Escola Caminho do Saber · 5º Ano A',
    currentDestination: 'dashboard' as HeaderDestination,
} as const;

export const EDUCATOR_HEADER_COPY = {
    profileActionLabel: 'Abrir meu perfil',
    profileActionHint: 'Abre as configurações do professor',
    notificationsLabel: 'Notificações',
    notificationsHint: 'Mostra as notificações recentes',
    mobileNotificationsHint: 'Abre a Central de Notificações',
    mobileMenuLabel: 'Abrir menu',
    mobileMenuCloseLabel: 'Fechar menu',
    notificationsTitle: 'Notificações',
    notificationsSubtitle: 'Eventos recentes',
    emptyStateTitle: 'Nenhuma notificação',
    emptyStateSubtitle: 'Os novos eventos aparecerão aqui.',
    viewAllLabel: 'Ver todas as notificações',
} as const;