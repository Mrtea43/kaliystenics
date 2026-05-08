import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Logo } from '../Logo';
import { useTheme } from '../../theme';
import { useApp } from '../../lib/AppContext';

export function SplashScreen() {
  const theme = useTheme();
  const { name, setScreen, loaded } = useApp();

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => {
      setScreen(name ? 'greeting' : 'name');
    }, 2200);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Logo size={56} />
      <Text style={[styles.title, { color: theme.fg }]}>Kaliystenics</Text>
      <Text style={[styles.sub, { color: theme.muted }]}>Move daily.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
  title: {
    fontSize: 38,
    fontWeight: '500',
    letterSpacing: -1,
    fontFamily: 'Fraunces_400Regular',
  },
  sub: {
    fontSize: 14,
    letterSpacing: 0.4,
  },
});
