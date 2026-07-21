import { globalStyles } from './global';
import { authStyles } from './pages/auth';
import { carouselStyles } from './pages/carousel';
import { rolesStyles } from './pages/roles';
import { wizardStyles } from './pages/wizard';

// exporta um objeto de estilos combinando todos os estilos importados.
export const styles = {
    ...globalStyles,
    ...carouselStyles,
    ...rolesStyles,
    ...authStyles,
    ...wizardStyles,
};

export { authStyles, carouselStyles, globalStyles, rolesStyles, wizardStyles };