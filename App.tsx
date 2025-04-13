// App.tsx
import React from 'react';
import { StatusBar, StyleSheet, I18nManager } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './src/context/ThemeContext';
import { useTheme } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import './src/i18n'; // Import i18n configuration
import { useTranslation } from 'react-i18next';

function Main() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();

  // We no longer handle RTL changes here as it's now managed in the LanguageSwitcher component
  // This prevents conflicts between different parts of the app trying to manage RTL

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <AppNavigator />
    </PaperProvider>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <Main />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});