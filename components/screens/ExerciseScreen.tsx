import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { MovementIllustration } from '../illustrations/MovementIllustration';
import { PrimaryButton } from '../PrimaryButton';
import { useTheme } from '../../theme';
import { useApp } from '../../lib/AppContext';
import { levelFromRound, setsForLevel, pickMovement } from '../../lib/helpers';
import { MOVEMENTS } from '../../data/movements';

type Phase = 'preset' | 'doing' | 'rest';

export function ExerciseScreen() {
  const theme = useTheme();
  const { round, repMode, illoStyle, setScreen, completeSession } = useApp();

  const lvl = levelFromRound(round);
  const { sets, reps } = setsForLevel(lvl);
  const movementKey = pickMovement(round);
  const m = MOVEMENTS[movementKey];

  const [movIdx, setMovIdx] = useState(0);
  const [setIdx, setSetIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('preset');
  const [tapCount, setTapCount] = useState(0);
  const [enteredReps, setEnteredReps] = useState('');

  const mv = m.main[movIdx];
  const totalSets = sets * m.main.length;
  const currentSetNum = movIdx * sets + setIdx + 1;

  function finishSet() {
    const isLastSet = setIdx === sets - 1;
    const isLastMovement = movIdx === m.main.length - 1;
    if (isLastSet && isLastMovement) {
      completeSession();
    } else {
      setPhase('rest');
    }
  }

  function nextAfterRest() {
    setTapCount(0);
    setEnteredReps('');
    if (setIdx < sets - 1) {
      setSetIdx(setIdx + 1);
      setPhase('doing');
    } else {
      setMovIdx(movIdx + 1);
      setSetIdx(0);
      setPhase('preset');
    }
  }

  const nextLabel =
    setIdx < sets - 1
      ? `Set ${setIdx + 2} of ${sets} · ${mv.name}`
      : `${m.main[movIdx + 1]?.name ?? ''} · Set 1`;

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setScreen('greeting')}>
        <Text style={[styles.quit, { color: theme.muted }]}>← Quit</Text>
      </TouchableOpacity>
      <Text style={[styles.setCount, { color: theme.muted }]}>
        Set {currentSetNum} of {totalSets}
      </Text>
    </View>
  );

  if (phase === 'preset') {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.bg }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <View style={styles.meta}>
          <Text style={[styles.metaLabel, { color: theme.muted }]}>
            Movement {movIdx + 1} · {m.label}
          </Text>
          <Text style={[styles.metaTitle, { color: theme.fg, fontFamily: 'Fraunces_400Regular' }]}>
            {mv.name}
          </Text>
          <Text style={[styles.metaSub, { color: theme.muted }]}>
            {sets} × {reps} reps
          </Text>
        </View>
        <View style={[styles.illoCard, { backgroundColor: theme.card, borderColor: theme.line }]}>
          <MovementIllustration id={mv.id} style={illoStyle} />
        </View>
        <View style={styles.cueList}>
          {mv.cues.map((c, i) => (
            <View key={i} style={styles.cueRow}>
              <Text style={[styles.cueDot, { color: theme.accent }]}>·</Text>
              <Text style={[styles.cueText, { color: theme.fg }]}>{c}</Text>
            </View>
          ))}
        </View>
        <View style={{ flex: 1, minHeight: 24 }} />
        <PrimaryButton
          onPress={() => { setTapCount(0); setEnteredReps(''); setPhase('doing'); }}
        >
          Begin set {setIdx + 1}
        </PrimaryButton>
      </ScrollView>
    );
  }

  if (phase === 'doing') {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.bg }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Header />
        <View style={styles.meta}>
          <Text style={[styles.metaLabel, { color: theme.muted }]}>
            {mv.name} · Set {setIdx + 1} of {sets}
          </Text>
          <Text style={[styles.doingTarget, { color: theme.fg, fontFamily: 'Fraunces_400Regular' }]}>
            Target: {reps} reps
          </Text>
        </View>
        <View style={styles.illoSmall}>
          <MovementIllustration id={mv.id} style={illoStyle} />
        </View>

        {repMode === 'tap' ? (
          <TapCounter
            count={tapCount}
            target={reps}
            onTap={() => setTapCount(c => c + 1)}
            onMinus={() => setTapCount(c => Math.max(0, c - 1))}
          />
        ) : repMode === 'manual' ? (
          <ManualEntry value={enteredReps} target={reps} onChange={setEnteredReps} />
        ) : null}

        <View style={{ flex: 1, minHeight: 12 }} />
        <PrimaryButton onPress={finishSet}>
          {repMode === 'tap' ? `Done · ${tapCount} reps` : 'Done with set'}
        </PrimaryButton>
      </ScrollView>
    );
  }

  // rest phase
  return <RestPhase seconds={120} onDone={nextAfterRest} onSkip={nextAfterRest} nextLabel={nextLabel} />;
}

// ── TapCounter ────────────────────────────────────────────────
function TapCounter({ count, target, onTap, onMinus }: {
  count: number; target: number; onTap: () => void; onMinus: () => void;
}) {
  const theme = useTheme();
  const pct = Math.min(1, count / target);
  const r = 92;
  const circumference = 2 * Math.PI * r;

  return (
    <View style={tapStyles.wrapper}>
      <Text style={[tapStyles.hint, { color: theme.muted }]}>Tap to count each rep</Text>
      <TouchableOpacity
        onPress={onTap}
        activeOpacity={0.9}
        style={[tapStyles.circle, { backgroundColor: theme.soft }]}
      >
        <Svg width={200} height={200} style={StyleSheet.absoluteFill}>
          <Circle
            cx="100" cy="100" r={r}
            fill="none"
            stroke={theme.accent}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct)}
            strokeLinecap="round"
            rotation="-90"
            origin="100, 100"
            opacity="0.6"
          />
        </Svg>
        <Text style={[tapStyles.count, { color: theme.accent, fontFamily: 'Fraunces_400Regular' }]}>
          {count}
        </Text>
        <Text style={[tapStyles.ofTarget, { color: theme.muted }]}>of {target}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onMinus}>
        <Text style={[tapStyles.undo, { color: theme.muted }]}>− undo last rep</Text>
      </TouchableOpacity>
    </View>
  );
}

const tapStyles = StyleSheet.create({
  wrapper: { marginTop: 6, alignItems: 'center', gap: 14 },
  hint: { fontSize: 13 },
  circle: {
    width: 200, height: 200, borderRadius: 100,
    alignItems: 'center', justifyContent: 'center',
  },
  count: { fontSize: 72, fontWeight: '500', letterSpacing: -2 },
  ofTarget: { fontSize: 13, marginTop: -8 },
  undo: { fontSize: 13, padding: 8 },
});

// ── ManualEntry ───────────────────────────────────────────────
function ManualEntry({ value, target, onChange }: {
  value: string; target: number; onChange: (v: string) => void;
}) {
  const theme = useTheme();
  const quickPicks = [target - 5, target - 2, target, target + 2, target + 5].filter(n => n > 0);

  return (
    <View style={manStyles.wrapper}>
      <Text style={[manStyles.hint, { color: theme.muted }]}>Enter how many reps you finished</Text>
      <View style={[manStyles.inputBox, { backgroundColor: theme.card, borderColor: theme.line }]}>
        <TextInput
          value={value}
          onChangeText={v => onChange(v.replace(/[^0-9]/g, ''))}
          placeholder={String(target)}
          placeholderTextColor={theme.muted}
          keyboardType="number-pad"
          style={[manStyles.input, { color: theme.fg, fontFamily: 'Fraunces_400Regular' }]}
        />
        <Text style={[manStyles.divider, { color: theme.muted }]}>/ {target}</Text>
      </View>
      <View style={manStyles.quickRow}>
        {quickPicks.map(n => (
          <TouchableOpacity
            key={n}
            onPress={() => onChange(String(n))}
            style={[
              manStyles.chip,
              { borderColor: theme.line },
              value === String(n) && { backgroundColor: theme.soft },
            ]}
          >
            <Text style={[manStyles.chipText, { color: value === String(n) ? theme.accent : theme.muted }]}>
              {n}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const manStyles = StyleSheet.create({
  wrapper: { marginTop: 6, alignItems: 'center', gap: 12 },
  hint: { fontSize: 13 },
  inputBox: {
    flexDirection: 'row', alignItems: 'baseline', gap: 8,
    borderRadius: 20, borderWidth: 0.5,
    paddingVertical: 20, paddingHorizontal: 28,
  },
  input: { width: 90, textAlign: 'right', fontSize: 56, fontWeight: '500', letterSpacing: -2 },
  divider: { fontSize: 16 },
  quickRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center', maxWidth: 220 },
  chip: {
    borderWidth: 0.5, borderRadius: 999,
    paddingVertical: 6, paddingHorizontal: 14,
  },
  chipText: { fontSize: 13 },
});

// ── RestPhase ─────────────────────────────────────────────────
function RestPhase({ seconds, onDone, onSkip, nextLabel }: {
  seconds: number; onDone: () => void; onSkip: () => void; nextLabel: string;
}) {
  const theme = useTheme();
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) { onDone(); return; }
    const t = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const pct = remaining / seconds;
  const r = 110;
  const circumference = 2 * Math.PI * r;

  return (
    <View style={[restStyles.container, { backgroundColor: theme.bg }]}>
      <Text style={[restStyles.label, { color: theme.muted }]}>Rest</Text>
      <View style={restStyles.timerWrapper}>
        <Svg width={240} height={240} style={StyleSheet.absoluteFill}>
          <Circle cx="120" cy="120" r={r} fill="none" stroke={theme.line} strokeWidth="2" />
          <Circle
            cx="120" cy="120" r={r}
            fill="none"
            stroke={theme.accent}
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct)}
            strokeLinecap="round"
            rotation="-90"
            origin="120, 120"
          />
        </Svg>
        <Text style={[restStyles.time, { color: theme.fg, fontFamily: 'Fraunces_400Regular' }]}>
          {mins}:{String(secs).padStart(2, '0')}
        </Text>
      </View>
      <View style={restStyles.nextBox}>
        <Text style={[restStyles.nextLabel, { color: theme.muted }]}>Next up</Text>
        <Text style={[restStyles.nextTitle, { color: theme.fg, fontFamily: 'Fraunces_400Regular' }]}>
          {nextLabel}
        </Text>
      </View>
      <View style={{ flex: 1 }} />
      <PrimaryButton secondary onPress={onSkip}>Skip rest</PrimaryButton>
    </View>
  );
}

const restStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 32,
    alignItems: 'center',
    gap: 18,
  },
  label: { fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase' },
  timerWrapper: { width: 240, height: 240, alignItems: 'center', justifyContent: 'center' },
  time: { fontSize: 64, fontWeight: '500', letterSpacing: -2, lineHeight: 72 },
  nextBox: { textAlign: 'center', alignItems: 'center', maxWidth: 260 },
  nextLabel: { fontSize: 13, marginBottom: 4 },
  nextTitle: { fontSize: 18, textAlign: 'center' },
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 32,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quit: { fontSize: 14 },
  setCount: { fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' },
  meta: { marginTop: 22, gap: 4 },
  metaLabel: { fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase' },
  metaTitle: { fontSize: 28, letterSpacing: -0.5, lineHeight: 34 },
  metaSub: { fontSize: 14, marginTop: 4 },
  doingTarget: { fontSize: 24, lineHeight: 30 },
  illoCard: {
    marginTop: 18, alignSelf: 'center',
    width: '100%', maxWidth: 260, aspectRatio: 1,
    borderRadius: 24, borderWidth: 0.5,
    padding: 16, overflow: 'hidden',
  },
  illoSmall: {
    marginTop: 18, alignSelf: 'center',
    width: 200, height: 200,
  },
  cueList: { marginTop: 18, gap: 8 },
  cueRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  cueDot: { fontSize: 18 },
  cueText: { fontSize: 13, lineHeight: 20, flex: 1 },
});
