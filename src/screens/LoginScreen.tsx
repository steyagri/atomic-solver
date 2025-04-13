import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

const LoginScreen = () => {
  const { login } = useAuth();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // Check if app has expired (February 2028)
  const checkAppExpiration = () => {
    const currentDate = new Date();
    const expirationDate = new Date('2028-02-29T23:59:59');
    return currentDate > expirationDate;
  };

  const handleLogin = async () => {
    // Check for app expiration first
    if (checkAppExpiration()) {
      setError(t('auth.appExpired', 'Application has expired. Please contact support.'));
      setSnackbarVisible(true);
      return;
    }

    if (!password.trim()) {
      setError(t('auth.passwordRequired'));
      setSnackbarVisible(true);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const success = await login(password);
      if (!success) {
        setError(t('auth.invalidPassword'));
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(t('auth.loginError'));
      setSnackbarVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const dismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      
      {/* Language Switcher at the top */}
      <View style={styles.languageSwitcherContainer}>
        <LanguageSwitcher />
      </View>
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.logoContainer}>
            {/* You can replace this with your app logo */}
            <Text style={[styles.appName, { color: theme.colors.primary }]}>
              {t('common.appName')}
            </Text>
            
            {/* Optional: Lottie animation */}
            {/* <LottieView
              source={require('../../assets/animations/login-animation.json')}
              autoPlay
              loop
              style={styles.animation}
            /> */}
          </View>

          <View style={styles.formContainer}>
            <Text style={[styles.loginTitle, { color: theme.colors.onSurface }]}>
              {t('auth.loginTitle')}
            </Text>
            <Text style={[styles.loginSubtitle, { color: theme.colors.onSurfaceVariant }]}>
              {t('auth.loginSubtitle')}
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                label={t('auth.password')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                mode="outlined"
                autoCapitalize="none"
                style={styles.input}
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? 'eye-off' : 'eye'}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                }
                error={!!error}
              />

              {!!error && (
                <Text style={styles.errorText}>{error}</Text>
              )}

              <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.loginButton}
                loading={isLoading}
                disabled={isLoading}
              >
                {t('auth.login')}
              </Button>
            </View>
          </View>
          
          {/* SSC logo and Powered by text */}
          <View style={styles.poweredByContainer}>
            <Image 
              source={require('../../assets/images/ssc.png')} 
              style={styles.sscLogo} 
              resizeMode="contain" 
            />
            <Text style={styles.poweredByText}>
              {t('common.poweredBy', 'Powered by SSC (Secure Shield Consulting)')}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Snackbar for error messages */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={dismissSnackbar}
        duration={3000}
        action={{
          label: t('common.dismiss'),
          onPress: dismissSnackbar,
        }}
        style={{
          backgroundColor: theme.colors.errorContainer,
        }}
      >
        <Text style={{ color: theme.colors.onErrorContainer, fontWeight: 'bold' }}>
          {error}
        </Text>
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  languageSwitcherContainer: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
  },
  animation: {
    width: 200,
    height: 200,
  },
  formContainer: {
    width: '100%',
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
  errorText: {
    color: '#B00020',
    fontSize: 14,
    marginTop: -8,
    marginBottom: 16,
  },
  poweredByContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  sscLogo: {
    height: 50,
    width: 100,
    marginBottom: 10,
  },
  poweredByText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default LoginScreen; 