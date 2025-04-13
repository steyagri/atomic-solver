import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CalculatorScreen from '../screens/CalculatorScreen';
import { useTheme } from '../context/ThemeContext';

// Define the types for our stack navigator
type AppStackParamList = {
  Calculator: undefined;
};

// Create stack navigator
const Stack = createStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 