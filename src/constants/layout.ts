import { Dimensions } from 'react-native';

export const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
export const FRAME_W: number = Math.min(SCREEN_W, 390);
export const FRAME_H: number = Math.min(SCREEN_H, 780);
export const BANNER_H: number = 100;