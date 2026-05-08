import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Fraunces_400Regular } from '@expo-google-fonts/fraunces';
import { CrimsonPro_400Regular } from '@expo-google-fonts/crimson-pro';
import { View, ActivityIndicator } from 'react-native';

import { ThemeProvider, useTheme } from './theme';
import { AppProvider, useApp } from './lib/AppContext';

import { SplashScreen } from './components/screens/SplashScreen';
import { NameScreen } from './components/screens/NameScreen';
import { GreetingScreen } from './components/screens/GreetingScreen';
import { NotNowScreen } from './components/screens/NotNowScreen';
import { DailyScreen } from './components/screens/DailyScreen';
import { WarmupAskScreen } from './components/screens/WarmupAskScreen';
import { WarmupScreen } from './components/screens/WarmupScreen';
import { ExerciseScreen } from './components/screens/ExerciseScreen';
import { DoneScreen } from './components/screens/DoneScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

function ScreenRouter() {
  const { screen, loaded } = useApp();
  const theme = useTheme();

  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.bg }}>
        <ActivityIndicator color={theme.accent} />
      </View>
    );
  }

  switch (screen) {
    case 'splash':     return <SplashScreen />;
    case 'name':       return <NameScreen />;
    case 'greeting':   return <GreetingScreen />;
    case 'notnow':     return <NotNowScreen />;
    case 'daily':      return <DailyScreen />;
    case 'warmupAsk':  return <WarmupAskScreen />;
    case 'warmup':     return <WarmupScreen />;
    case 'exercise':   return <ExerciseScreen />;
    case 'done':       return <DoneScreen />;
    case 'settings':   return <SettingsScreen />;
    default:           return <SplashScreen />;
  }
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Fraunces_400Regular,
    CrimsonPro_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#faf9f5' }}>
        <ActivityIndicator color="#c96442" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <ScreenRouter />
          </SafeAreaView>
        </AppProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
