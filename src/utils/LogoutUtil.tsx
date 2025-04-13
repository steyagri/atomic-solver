import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * A utility component for testing that can be added temporarily to any screen.
 * It provides:
 * 1. A standard logout button using the auth context
 * 2. A force clear sessions button for testing
 */
const LogoutUtil = () => {
  const { logout } = useAuth();
  const { t } = useTranslation();

  const forceLogout = async () => {
    try {
      await AsyncStorage.removeItem('auth_session');
      console.log('Manually cleared auth session');
      
      // Force a reload of the app - in a real app, you might want to use a better method
      if (logout) {
        logout();
      } else {
        // Fallback if logout function isn't available
        console.log('Logout function not available, just cleared storage');
      }
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Debug Tools</Text>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={logout} style={styles.button}>
          {t('auth.logout')}
        </Button>
        <Button mode="outlined" onPress={forceLogout} style={styles.button}>
          Force Clear Session
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default LogoutUtil; 