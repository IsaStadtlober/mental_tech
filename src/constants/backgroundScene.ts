import { BackgroundItemData, ItemType } from '../types/backgroundScene';

export const ASPECT: Record<ItemType, number> = {
    cloud: 40 / 64,
    tree: 60 / 40,
};

export const BACKGROUND_VARIANTS: Record<string, BackgroundItemData[]> = {
    clouds: [
        { type: 'cloud', style: { top: '8%', left: '8%' }, width: 110, opacity: 0.35, drift: 'A', dur: 23000 },
        { type: 'cloud', style: { top: '15%', right: '8%' }, width: 90, opacity: 0.3, drift: 'B', dur: 28000 },
        { type: 'cloud', style: { top: '80%', right: '9%' }, width: 80, opacity: 0.25, drift: 'A', dur: 19500 },
        { type: 'cloud', style: { top: '49%', left: '10%' }, width: 65, opacity: 0.2, drift: 'B', dur: 24500 },
        { type: 'cloud', style: { top: '75%', left: '3%' }, width: 50, opacity: 0.15, drift: 'A', dur: 31000 },
        { type: 'cloud', style: { top: '46%', right: '12%' }, width: 60, opacity: 0.1, drift: 'B', dur: 21000 },
    ],

    trees: [
        { type: 'tree', style: { bottom: '5%', left: '8%' }, width: 70, opacity: 0.25, drift: 'swayA', dur: 6200 },
        { type: 'tree', style: { bottom: '15%', right: '5%' }, width: 100, opacity: 0.3, drift: 'swayB', dur: 7500 },
        { type: 'tree', style: { bottom: '2%', left: '42%' }, width: 50, opacity: 0.2, drift: 'swayA', dur: 5300 },
        { type: 'tree', style: { top: '11%', left: '15%' }, width: 60, opacity: 0.15, drift: 'swayB', dur: 8000 },
        { type: 'tree', style: { top: '30%', right: '20%' }, width: 40, opacity: 0.22, drift: 'swayA', dur: 6600 },
        { type: 'tree', style: { top: '62%', left: '10%' }, width: 80, opacity: 0.18, drift: 'swayB', dur: 8800 },
    ],

    mixedHigh: [
        { type: 'cloud', style: { top: '6%', left: '10%' }, width: 110, opacity: 0.35, drift: 'A', dur: 23000 },
        { type: 'cloud', style: { top: '16%', right: '12%' }, width: 80, opacity: 0.3, drift: 'B', dur: 28000 },
        { type: 'cloud', style: { top: '28%', left: '8%' }, width: 70, opacity: 0.25, drift: 'A', dur: 20000 },
        { type: 'tree', style: { bottom: '18%', left: '3%' }, width: 100, opacity: 0.3, drift: 'swayA', dur: 6200 },
        { type: 'tree', style: { bottom: '20%', right: '8%' }, width: 60, opacity: 0.25, drift: 'swayB', dur: 7500 },
        { type: 'tree', style: { bottom: '14%', left: '27%' }, width: 50, opacity: 0.2, drift: 'swayA', dur: 5300 },
        { type: 'tree', style: { bottom: '10%', right: '22%' }, width: 70, opacity: 0.15, drift: 'swayB', dur: 7500 },
    ],

    mixed: [
        { type: 'cloud', style: { top: '6%', left: '10%' }, width: 110, opacity: 0.35, drift: 'A', dur: 23000 },
        { type: 'cloud', style: { top: '16%', right: '12%' }, width: 80, opacity: 0.3, drift: 'B', dur: 28000 },
        { type: 'cloud', style: { top: '28%', left: '8%' }, width: 70, opacity: 0.25, drift: 'A', dur: 20000 },
        { type: 'tree', style: { bottom: '8%', left: '3%' }, width: 100, opacity: 0.25, drift: 'swayA', dur: 6200 },
        { type: 'tree', style: { bottom: '14%', right: '8%' }, width: 60, opacity: 0.3, drift: 'swayB', dur: 7500 },
        { type: 'tree', style: { bottom: '5%', left: '29%' }, width: 50, opacity: 0.2, drift: 'swayA', dur: 5300 },
        { type: 'tree', style: { bottom: '1%', right: '24%' }, width: 70, opacity: 0.3, drift: 'swayB', dur: 7500 },
    ],
};