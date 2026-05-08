import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, StyleSheet, KeyboardAvoidingView,
  Platform, ScrollView,
} from 'react-native';
import { Logo } from '../Logo';
import { PrimaryButton } from '../PrimaryButton';
import { useTheme } from '../../theme';
import { useApp } from '../../lib/AppContext';

export function NameScreen() {
  const theme = useTheme();
  const { setName, setScreen } = useApp();
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setName(trimmed);
    setScreen('greeting');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.container, { backgroundColor: theme.bg }]}>
          <View style={styles.body}>
            <Logo size={28} />
            <Text style={[styles.title, { color: theme.fg }]}>
              What should we call you?
            </Text>
            <Text style={[styles.sub, { color: theme.muted }]}>
              We'll use this to greet you. You can change it later.
            </Text>
            <TextInput
              value={value}
              onChangeText={setValue}
              placeholder="Your name"
              placeholderTextColor={theme.muted}
              returnKeyType="done"
              onSubmitEditing={submit}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={[
                styles.input,
                {
                  color: theme.fg,
                  borderBottomColor: focused ? theme.accent : theme.line,
                  fontFamily: 'Fraunces_400Regular',
                },
              ]}
            />
          </View>
          <View style={styles.footer}>
            <PrimaryButton onPress={submit}>Continue</PrimaryButton>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    gap: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    letterSpacing: -0.6,
    lineHeight: 36,
    fontFamily: 'Fraunces_400Regular',
  },
  sub: {
    fontSize: 15,
    lineHeight: 22,
  },
  input: {
    marginTop: 18,
    borderBottomWidth: 1.5,
    paddingBottom: 14,
    paddingTop: 14,
    fontSize: 24,
  },
  footer: {
    paddingTop: 16,
  },
});
