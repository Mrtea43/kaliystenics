import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Logo } from '../Logo';
import { PrimaryButton } from '../PrimaryButton';
import { useTheme } from '../../theme';
import { useApp } from '../../lib/AppContext';
import { timeOfDay, levelFromRound, setsForLevel } from '../../lib/helpers';

const GREETINGS = {
  morning: 'Good morning',
  afternoon: 'Good afternoon',
  evening: 'Good evening',
};

export function GreetingScreen() {
  const theme = useTheme();
  const { name, round, setScreen } = useApp();

  const tod = timeOfDay();
  const lvl = levelFromRound(round);
  const { sets, reps } = setsForLevel(lvl);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.body}>
        <Logo size={28} />
        <Text style={[styles.greeting, { color: theme.fg }]}>
          {GREETINGS[tod]},{'\n'}
          <Text style={{ color: theme.accent }}>{name}.</Text>
        </Text>
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.line }]}>
          <Text style={[styles.cardLabel, { color: theme.muted }]}>Round {round}</Text>
          <Text style={[styles.cardTitle, { color: theme.fg, fontFamily: 'Fraunces_400Regular' }]}>
            Ready for round {round}?
          </Text>
          <Text style={[styles.cardSub, { color: theme.muted }]}>
            {lvl.charAt(0).toUpperCase() + lvl.slice(1)} · {sets}×{reps}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <PrimaryButton onPress={() => setScreen('daily')}>Yes, let's go</PrimaryButton>
        <View style={{ height: 10 }} />
        <PrimaryButton secondary onPress={() => setScreen('notnow')}>Not now</PrimaryButton>
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
    gap: 12,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '500',
    letterSpacing: -0.6,
    lineHeight: 40,
    fontFamily: 'Fraunces_400Regular',
  },
  card: {
    marginTop: 22,
    padding: 20,
    borderRadius: 16,
    borderWidth: 0.5,
    gap: 6,
  },
  cardLabel: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: 22,
    lineHeight: 28,
  },
  cardSub: {
    fontSize: 13,
  },
  footer: {
    paddingTop: 10,
  },
});
