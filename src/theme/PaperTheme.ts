import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

// You can customize according to your brand's color palette
export const PaperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0062FF',
    accent: '#03DAC6',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#212529',
    // Add or override more colors if needed
  },
  roundness: 8,
}; 