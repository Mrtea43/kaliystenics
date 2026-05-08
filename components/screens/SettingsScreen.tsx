import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { PrimaryButton } from '../PrimaryButton';
import { useTheme } from '../../theme';
import { useApp, RepMode } from '../../lib/AppContext';
import { IlloStyle } from '../../data/movements';

type SegOption<T extends string> = { value: T; label: string };

function SegmentControl<T extends string>({
  value, options, onChange,
}: { value: T; options: SegOption<T>[]; onChange: (v: T) => void }) {
  const theme = useTheme();
  return (
    <View style={[segStyles.track, { backgroundColor: `${theme.fg}10` }]}>
      {options.map(opt => {
        const active = opt.value === value;
        return (
          <TouchableOpacity
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[
              segStyles.btn,
              active && { backgroundColor: theme.accent },
            ]}
          >
            <Text style={[segStyles.label, { color: active ? '#fff' : theme.fg }]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const segStyles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
  },
  btn: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingVertical: 10, borderRadius: 8,
  },
  label: { fontSize: 13, fontWeight: '500' },
});

export function SettingsScreen() {
  const theme = useTheme();
  const { name, repMode, illoStyle, setName, setRepMode, setIlloStyle, setScreen, resetAll } = useApp();
  const [nameVal, setNameVal] = useState(name ?? '');

  const saveName = () => {
    const n = nameVal.trim();
    if (n) setName(n);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset all progress?',
      'This will clear your name, round number, and all settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset', style: 'destructive',
          onPress: () => resetAll(),
        },
      ]
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topRow}>
        <Text style={[styles.title, { color: theme.fg, fontFamily: 'Fraunces_400Regular' }]}>
          Settings
        </Text>
        <TouchableOpacity onPress={() => setScreen('daily')}>
          <Text style={[styles.close, { color: theme.muted }]}>Close</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: theme.muted }]}>Name</Text>
        <TextInput
          value={nameVal}
          onChangeText={setNameVal}
          onBlur={saveName}
          onSubmitEditing={saveName}
          returnKeyType="done"
          style={[styles.nameInput, {
            backgroundColor: theme.card,
            borderColor: theme.line,
            color: theme.fg,
            fontFamily: 'Fraunces_400Regular',
          }]}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: theme.muted }]}>Counting reps</Text>
        <SegmentControl<RepMode>
          value={repMode}
          options={[
            { value: 'done', label: 'Tap done' },
            { value: 'tap', label: 'Tap each rep' },
            { value: 'manual', label: 'Manual entry' },
          ]}
          onChange={setRepMode}
        />
        <Text style={[styles.hint, { color: theme.muted }]}>
          {repMode === 'done' && 'Just tap "Done" when you finish a set. Simple.'}
          {repMode === 'tap' && 'Tap a big circle once per rep. Counts go up live.'}
          {repMode === 'manual' && 'Type the number of reps you actually completed.'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: theme.muted }]}>Illustration style</Text>
        <SegmentControl<IlloStyle>
          value={illoStyle}
          options={[
            { value: 'stick', label: 'Stick' },
            { value: 'line', label: 'Line' },
            { value: 'twotone', label: 'Two-tone' },
          ]}
          onChange={setIlloStyle}
        />
      </View>

      <View style={{ flex: 1, minHeight: 40 }} />
      <PrimaryButton secondary onPress={handleReset}>Reset all progress</PrimaryButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 32,
    flexGrow: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 22 },
  close: { fontSize: 14 },
  section: { marginTop: 22, gap: 8 },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  nameInput: {
    borderWidth: 0.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 18,
  },
  hint: {
    fontSize: 12,
    lineHeight: 18,
  },
});
