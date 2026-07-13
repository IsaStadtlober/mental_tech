import React from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';

export interface IconProps {
  size?: number;
  color: string;
}

interface LottieIconProps extends IconProps {
  source: any;
}

function LottieIcon({ size = 42, color, source }: LottieIconProps) {
  return (
    <View style={{ width: size, height: size }}>
      <LottieView
        source={source}
        autoPlay
        loop
        resizeMode="contain"
        style={{ width: size, height: size }}
        colorFilters={[{ keypath: '*', color }]}
      />
    </View>
  );
}

export function CompassPlay({ size = 42, color }: IconProps) {
  return (
    <LottieIcon
      size={size}
      color={color}
      source={require('../../../assets/animations/bussola.json')}
    />
  );
}

export function TrophyPlay({ size = 42, color }: IconProps) {
  return (
    <LottieIcon
      size={size}
      color={color}
      source={require('../../../assets/animations/Trofeu.json')}
    />
  );
}

export function GraduationCapPlay({ size = 42, color }: IconProps) {
  return (
    <LottieIcon
      size={size}
      color={color}
      source={require('../../../assets/animations/chapeu.json')}
    />
  );
}

export function SparklesPlay({ size = 42, color }: IconProps) {
  return (
    <LottieIcon
      size={size}
      color={color}
      source={require('../../../assets/animations/estrelas.json')}
    />
  );
}