import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Theme {
  accent: string;
  soft: string;
  bg: string;
  card: string;
  fg: string;
  muted: string;
  line: string;
}

export const THEME: Theme = {
  accent: '#c96442',
  soft: '#f3e3da',
  bg: '#faf9f5',
  card: '#ffffff',
  fg: '#2c1810',
  muted: '#8a7a6e',
  line: 'rgba(60,40,30,0.12)',
};

const ThemeContext = createContext<Theme>(THEME);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={THEME}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
