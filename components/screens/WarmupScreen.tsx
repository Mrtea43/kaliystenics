import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MovementIllustration } from '../illustrations/MovementIllustration';
import { PrimaryButton } from '../PrimaryButton';
import { useTheme } from '../../theme';
import { useApp } from '../../lib/AppContext';
import { pickMovement } from '../../lib/helpers';
import { MOVEMENTS } from '../../data/movements';

export function WarmupScreen() {
  const theme = useTheme();
  const { round, illoStyle, setScreen } = useApp();

  const movementKey = pickMovement(round);
  const m = MOVEMENTS[movementKey];
  const w = m.warmup;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.label, { color: theme.muted }]}>
        Warm-up · {m.label}
      </Text>
      <Text style={[styles.title, { color: theme.fg, fontFamily: 'Fraunces_400Regular' }]}>
        {w.name}
      </Text>

      <View style={[styles.illoCard, { backgroundColor: theme.card, borderColor: theme.line }]}>
        <MovementIllustration id={w.id} style={illoStyle} />
      </View>

      <View style={styles.cueList}>
        {w.cues.map((c, i) => (
          <View key={i} style={styles.cueRow}>
            <View style={[styles.cueBadge, { backgroundColor: theme.soft }]}>
              <Text style={[styles.cueBadgeText, { color: theme.accent }]}>{i + 1}</Text>
            </View>
            <Text style={[styles.cueText, { color: theme.fg }]}>{c}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: 24 }} />
      <PrimaryButton onPress={() => setScreen('exercise')}>I'm warmed up</PrimaryButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 32,
  },
  label: {
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 26,
    letterSpacing: -0.4,
    lineHeight: 32,
    marginTop: 4,
  },
  illoCard: {
    marginTop: 22,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 280,
    aspectRatio: 1,
    borderRadius: 24,
    borderWidth: 0.5,
    padding: 20,
    overflow: 'hidden',
  },
  cueList: {
    marginTop: 22,
    gap: 10,
  },
  cueRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  cueBadge: {
    width: 22,
    height: 22,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cueBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cueText: {
    fontSize: 14,
    lineHeight: 22,
    flex: 1,
  },
});
