import { theme } from '../../constants/theme';
import { RoleMiniIconProps } from '../../types/components';
import { CompassPlay, GraduationCapPlay } from '../carousel/CarouselIcons';

export function RoleMiniIcon({ type, active }: RoleMiniIconProps) {
    const color = active ? theme.bg : theme.primary;

    if (type === 'student') {
        return <CompassPlay size={26} color={color} />;
    }

    return <GraduationCapPlay size={26} color={color} />;
}