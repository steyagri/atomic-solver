import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

interface CustomColors {
  success: string;
  warning: string;
  info: string;
  surface2: string;
  surface3: string;
  cardBackground: string;
  inputBackground: string;
  subtleText: string;
  divider: string;
}

interface CustomSpacing {
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
}

interface CustomRoundness {
  s: number;
  m: number;
  l: number;
}

export interface CustomTheme extends MD3Theme {
  custom: CustomColors;
  spacing: CustomSpacing;
  customRoundness: CustomRoundness;
}

// Modern spacing system for consistent layout
const spacing = {
  xs: 4,
  s: 8, 
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48
};

// Consistent border radius
const customRoundness = {
  s: 4,
  m: 8,
  l: 16
};

const customColors: CustomColors = {
  success: '#4CAF50',
  warning: '#FF9800',
  info: '#2196F3',
  surface2: '#F9F9F9',
  surface3: '#F3F3F3',
  cardBackground: '#FFFFFF',
  inputBackground: '#F5F8FF',
  subtleText: '#6E7A8A',
  divider: '#E9EDF5'
};

const customDarkColors: CustomColors = {
  success: '#66BB6A',
  warning: '#FFA726',
  info: '#42A5F5',
  surface2: '#2C2C2C',
  surface3: '#222222',
  cardBackground: '#1E1E1E',
  inputBackground: '#2D2D2D',
  subtleText: '#9AA0A6',
  divider: '#333333'
};

export const lightTheme: CustomTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1976D2',
    onPrimary: '#FFFFFF',
    primaryContainer: '#E3F2FD',
    onPrimaryContainer: '#0D47A1',
    secondary: '#0288D1',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E1F5FE',
    onSecondaryContainer: '#01579B',
    tertiary: '#4527A0',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#EDE7F6',
    onTertiaryContainer: '#311B92',
    background: '#F8F9FC',
    surface: '#FFFFFF',
    error: '#D32F2F',
    onError: '#FFFFFF',
    errorContainer: '#FFEBEE',
    onErrorContainer: '#B71C1C',
  },
  custom: customColors,
  spacing,
  customRoundness
};

export const darkTheme: CustomTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#90CAF9',
    onPrimary: '#0D47A1',
    primaryContainer: '#1565C0',
    onPrimaryContainer: '#E3F2FD',
    secondary: '#81D4FA',
    onSecondary: '#01579B',
    secondaryContainer: '#0277BD',
    onSecondaryContainer: '#E1F5FE',
    tertiary: '#B39DDB',
    onTertiary: '#311B92',
    tertiaryContainer: '#4527A0',
    onTertiaryContainer: '#EDE7F6',
    background: '#121212',
    surface: '#1E1E1E',
    error: '#EF5350',
    onError: '#B71C1C',
    errorContainer: '#C62828',
    onErrorContainer: '#FFEBEE',
  },
  custom: customDarkColors,
  spacing,
  customRoundness
}; 