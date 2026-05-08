import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Logo } from '../Logo';
import { PrimaryButton } from '../PrimaryButton';
import { MovementIllustration } from '../illustrations/MovementIllustration';
import { useTheme } from '../../theme';
import { useApp } from '../../lib/AppContext';
import { levelFromRound, setsForLevel, pickMovement } from '../../lib/helpers';
import { MOVEMENTS } from '../../data/movements';

export function DailyScreen() {
  const theme = useTheme();
  const { round, illoStyle, setScreen } = useApp();

  const lvl = levelFromRound(round);
  const { sets, reps } = setsForLevel(lvl);
  const movementKey = pickMovement(round);
  const m = MOVEMENTS[movementKey];

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <Logo size={24} />
        <TouchableOpacity onPress={() => setScreen('settings')}>
          <Text style={[styles.roundLabel, { color: theme.muted }]}>
            Round {round} · {lvl}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.meta}>
        <Text style={[styles.metaLabel, { color: theme.muted }]}>
          Today · {m.label}
        </Text>
        <Text style={[styles.metaTitle, { color: theme.fg, fontFamily: 'Fraunces_400Regular' }]}>
          Two movements.{'\n'}{sets} sets of {reps}.
        </Text>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {m.main.map((mv, i) => (
          <View
            key={mv.id}
            style={[styles.card, { backgroundColor: theme.card, borderColor: theme.line }]}
          >
            <View style={[styles.illoBox, { backgroundColor: theme.bg, borderColor: theme.line }]}>
              <MovementIllustration id={mv.id} style={illoStyle} />
            </View>
            <View style={styles.cardText}>
              <Text style={[styles.movLabel, { color: theme.muted }]}>Movement {i + 1}</Text>
              <Text style={[styles.movName, { color: theme.fg, fontFamily: 'Fraunces_400Regular' }]}>
                {mv.name}
              </Text>
              <Text style={[styles.movSets, { color: theme.muted }]}>
                {sets} × {reps} reps
              </Text>
            </View>
          </View>
        ))}
        <View style={{ height: 24 }} />
      </ScrollView>

      <PrimaryButton onPress={() => setScreen('warmupAsk')}>Start session</PrimaryButton>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roundLabel: {
    fontSize: 13,
  },
  meta: {
    marginTop: 28,
    gap: 6,
  },
  metaLabel: {
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  metaTitle: {
    fontSize: 28,
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  list: {
    marginTop: 24,
    flex: 1,
  },
  card: {
    borderRadius: 18,
    borderWidth: 0.5,
    padding: 14,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  illoBox: {
    width: 64,
    height: 76,
    borderRadius: 12,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardText: {
    flex: 1,
    gap: 2,
  },
  movLabel: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  movName: {
    fontSize: 18,
    letterSpacing: -0.2,
  },
  movSets: {
    fontSize: 13,
  },
});
