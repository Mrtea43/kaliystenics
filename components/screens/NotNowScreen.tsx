import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Logo } from '../Logo';
import { PrimaryButton } from '../PrimaryButton';
import { useTheme } from '../../theme';
import { useApp } from '../../lib/AppContext';

export function NotNowScreen() {
  const theme = useTheme();
  const { setScreen } = useApp();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.body}>
        <Logo size={28} />
        <Text style={[styles.title, { color: theme.fg, fontFamily: 'Fraunces_400Regular' }]}>
          See you tomorrow.
        </Text>
        <Text style={[styles.sub, { color: theme.muted }]}>
          Rest is part of training. We'll keep your round number right where it is.
        </Text>
      </View>
      <PrimaryButton secondary onPress={() => setScreen('greeting')}>
        Actually, let's train
      </PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 32,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  title: {
    fontSize: 26,
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  sub: {
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 240,
    textAlign: 'center',
  },
});
