import { globalStyles } from './global';
import { authStyles } from './pages/auth';
import { carouselStyles } from './pages/carousel';
import { rolesStyles } from './pages/roles';
import { wizardStyles } from './pages/wizard';

export const styles = {
    ...globalStyles,
    ...carouselStyles,
    ...rolesStyles,
    ...authStyles,
    ...wizardStyles,
};

export { authStyles, carouselStyles, globalStyles, rolesStyles, wizardStyles };