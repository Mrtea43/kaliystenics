import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { store } from './store';
import { IlloStyle } from '../data/movements';

export type Screen =
  | 'splash'
  | 'name'
  | 'greeting'
  | 'notnow'
  | 'daily'
  | 'warmupAsk'
  | 'warmup'
  | 'exercise'
  | 'done'
  | 'settings';

export type RepMode = 'done' | 'tap' | 'manual';

interface AppState {
  screen: Screen;
  name: string | null;
  round: number;
  repMode: RepMode;
  illoStyle: IlloStyle;
  loaded: boolean;
}

interface AppActions {
  setScreen: (s: Screen) => void;
  setName: (n: string) => void;
  setRound: (r: number) => void;
  setRepMode: (m: RepMode) => void;
  setIlloStyle: (s: IlloStyle) => void;
  completeSession: () => void;
  resetAll: () => void;
}

const AppContext = createContext<AppState & AppActions>({} as AppState & AppActions);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [screen, setScreenState] = useState<Screen>('splash');
  const [name, setNameState] = useState<string | null>(null);
  const [round, setRoundState] = useState(1);
  const [repMode, setRepModeState] = useState<RepMode>('done');
  const [illoStyle, setIlloStyleState] = useState<IlloStyle>('twotone');

  // Load persisted state on mount
  useEffect(() => {
    (async () => {
      const [n, r, rm, is] = await Promise.all([
        store.get<string | null>('name', null),
        store.get<number>('round', 1),
        store.get<RepMode>('repMode', 'done'),
        store.get<IlloStyle>('illoStyle', 'twotone'),
      ]);
      setNameState(n);
      setRoundState(r);
      setRepModeState(rm);
      setIlloStyleState(is);
      setLoaded(true);
    })();
  }, []);

  const setScreen = useCallback((s: Screen) => setScreenState(s), []);

  const setName = useCallback((n: string) => {
    setNameState(n);
    store.set('name', n);
  }, []);

  const setRound = useCallback((r: number) => {
    setRoundState(r);
    store.set('round', r);
  }, []);

  const setRepMode = useCallback((m: RepMode) => {
    setRepModeState(m);
    store.set('repMode', m);
  }, []);

  const setIlloStyle = useCallback((s: IlloStyle) => {
    setIlloStyleState(s);
    store.set('illoStyle', s);
  }, []);

  const completeSession = useCallback(() => {
    const next = round + 1;
    setRoundState(next);
    store.set('round', next);
    setScreenState('done');
  }, [round]);

  const resetAll = useCallback(async () => {
    await store.clear();
    setNameState(null);
    setRoundState(1);
    setRepModeState('done');
    setIlloStyleState('twotone');
    setScreenState('splash');
  }, []);

  return (
    <AppContext.Provider
      value={{
        screen, name, round, repMode, illoStyle, loaded,
        setScreen, setName, setRound, setRepMode, setIlloStyle,
        completeSession, resetAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
