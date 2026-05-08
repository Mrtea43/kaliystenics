import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Logo } from '../Logo';
import { PrimaryButton } from '../PrimaryButton';
import { useTheme } from '../../theme';
import { useApp } from '../../lib/AppContext';
import { pickMovement } from '../../lib/helpers';
import { MOVEMENTS } from '../../data/movements';

const MESSAGES = ['Good job', 'Well done', 'Strong work', 'That counts', 'Round complete'];

export function DoneScreen() {
  const theme = useTheme();
  const { name, round, setScreen } = useApp();

  const msg = MESSAGES[round % MESSAGES.length];
  const nextKey = pickMovement(round + 1);
  const nextLabel = MOVEMENTS[nextKey].label;

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Logo size={32} />
      <Text style={[styles.title, { color: theme.fg, fontFamily: 'Fraunces_400Regular' }]}>
        {msg},{'\n'}
        <Text style={{ color: theme.accent }}>{name}.</Text>
      </Text>
      <Text style={[styles.sub, { color: theme.muted }]}>
        Round {round} is in the books. See you tomorrow — we'll switch it up.
      </Text>
      <View style={[styles.nextCard, { backgroundColor: theme.card, borderColor: theme.line }]}>
        <Text style={[styles.nextLabel, { color: theme.muted }]}>Next round</Text>
        <Text style={[styles.nextTitle, { color: theme.fg, fontFamily: 'Fraunces_400Regular' }]}>
          {nextLabel} · Round {round + 1}
        </Text>
      </View>
      <View style={{ flex: 1 }} />
      <View style={styles.footer}>
        <PrimaryButton onPress={() => setScreen('greeting')}>Done</PrimaryButton>
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
    alignItems: 'center',
    textAlign: 'center',
    gap: 14,
  },
  title: {
    fontSize: 38,
    letterSpacing: -1,
    lineHeight: 44,
    textAlign: 'center',
  },
  sub: {
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 260,
    textAlign: 'center',
    marginTop: 6,
  },
  nextCard: {
    marginTop: 14,
    padding: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 0.5,
    gap: 2,
    alignItems: 'center',
  },
  nextLabel: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  nextTitle: {
    fontSize: 18,
  },
  footer: {
    width: '100%',
  },
});
