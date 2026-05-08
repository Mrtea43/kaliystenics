import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Logo } from '../Logo';
import { PrimaryButton } from '../PrimaryButton';
import { useTheme } from '../../theme';
import { useApp } from '../../lib/AppContext';
import { pickMovement } from '../../lib/helpers';
import { MOVEMENTS } from '../../data/movements';

export function WarmupAskScreen() {
  const theme = useTheme();
  const { round, setScreen } = useApp();

  const movementKey = pickMovement(round);
  const m = MOVEMENTS[movementKey];

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.body}>
        <Logo size={28} />
        <Text style={[styles.title, { color: theme.fg, fontFamily: 'Fraunces_400Regular' }]}>
          Warm up first?
        </Text>
        <Text style={[styles.sub, { color: theme.muted }]}>
          A quick {m.label.toLowerCase()} warm-up — about a minute. Helps prevent injury and gets the blood moving.
        </Text>
      </View>
      <View style={styles.footer}>
        <PrimaryButton onPress={() => setScreen('warmup')}>Yes, warm me up</PrimaryButton>
        <View style={{ height: 10 }} />
        <PrimaryButton secondary onPress={() => setScreen('exercise')}>Skip warm-up</PrimaryButton>
      </View>
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
    justifyContent: 'center',
    gap: 14,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    letterSpacing: -0.6,
    lineHeight: 36,
  },
  sub: {
    fontSize: 15,
    lineHeight: 24,
  },
  footer: {
    paddingTop: 10,
  },
});
