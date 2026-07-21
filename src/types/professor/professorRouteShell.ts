import type { ReactNode } from 'react';
import type { HeaderDestination } from './educatorHeader';

export interface ProfessorRouteShellProps {
    children: ReactNode;
    currentDestination?: HeaderDestination;
}