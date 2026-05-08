import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  secondary?: boolean;
  small?: boolean;
  style?: ViewStyle;
}

export function PrimaryButton({ children, onPress, secondary, small, style }: PrimaryButtonProps) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.base,
        small ? styles.small : styles.normal,
        secondary
          ? { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: theme.line }
          : { backgroundColor: theme.accent },
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          small ? styles.labelSmall : styles.labelNormal,
          { color: secondary ? theme.fg : '#fff' },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  normal: {
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  small: {
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  label: {
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  labelNormal: {
    fontSize: 17,
  },
  labelSmall: {
    fontSize: 15,
  },
});
