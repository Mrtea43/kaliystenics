import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../theme';

interface LogoProps {
  size?: number;
  color?: string;
}

export function Logo({ size = 28, color }: LogoProps) {
  const theme = useTheme();
  const c = color ?? theme.accent;
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Path
        d="M6 12 a8 8 0 0 1 16 0"
        stroke={c}
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M10 20 a8 8 0 0 0 16 0"
        stroke={c}
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
}
