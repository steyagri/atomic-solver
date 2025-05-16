import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Image,
} from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../navigation/AppNavigator';

// Firebase and Device
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const INSTALL_ID_KEY = 'INSTALL_ID';

type LoginScreenNavigationProp = StackNavigationProp<AppStackParamList, 'Login'>;

const LoginScreen = () => {
  const { login } = useAuth();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [showPasswordRequestModal, setShowPasswordRequestModal] = useState(false);

  const navigation = useNavigation<LoginScreenNavigationProp>();

  // Generate or retrieve install ID
  const getInstallId = async () => {
    let installId = await AsyncStorage.getItem(INSTALL_ID_KEY);
    if (!installId) {
      installId = 'InNOScEnce-' + Math.random().toString(36).substr(2, 9);
      await AsyncStorage.setItem(INSTALL_ID_KEY, installId);
    }
    return installId;
  };

  // Check if app has expired (February 2028)
  const checkAppExpiration = () => {
    const currentDate = new Date();
    const expirationDate = new Date('2028-02-29T23:59:59');
    return currentDate > expirationDate;
  };

  const handleLogin = async () => {
    if (checkAppExpiration()) {
      setError(t('auth.appExpired', 'Application has expired.'));
      setSnackbarVisible(true);
      return;
    }

    if (!password.trim()) {
      setError(t('auth.passwordRequired', 'Password is required'));
      setSnackbarVisible(true);
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(password);
      if (success) {
        navigation.navigate("Calculator");
      } else {
        setError(t('auth.invalidPassword', 'Invalid or expired password'));
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(t('auth.loginError', 'An error occurred during login.'));
      setSnackbarVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const dismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  const handleRequestPassword = async () => {
    if (!email.trim()) {
      setError(t('auth.emailRequired', 'Email is required'));
      setSnackbarVisible(true);
      return;
    }

    setIsLoading(true);

    try {
      const deviceId = DeviceInfo.getDeviceId() || 'UnknownDevice';
      const installId = await getInstallId();

      const requestRef = collection(db, 'passwordRequests');

      const emailQuery = query(requestRef, where('email', '==', email.trim()));
      const installIdQuery = query(requestRef, where('installId', '==', installId));

      const [emailSnapshot, installIdSnapshot] = await Promise.all([
        getDocs(emailQuery),
        getDocs(installIdQuery),
      ]);

      if (!emailSnapshot.empty) {
        setError(t('auth.emailAlreadyUsed', 'This email already has a pending request.'));
        setSnackbarVisible(true);
        setIsLoading(false);
        return;
      }

      if (!installIdSnapshot.empty) {
        setError(t('auth.installIdAlreadyUsed', 'This device already has a pending request.'));
        setSnackbarVisible(true);
        setIsLoading(false);
        return;
      }

      // No existing request — proceed
      await addDoc(collection(db, 'passwordRequests'), {
        email: email.trim(),
        deviceId,
        installId,
        requestedAt: new Date(),
        status: 'pending',
      });

      setEmail('');
      setShowPasswordRequestModal(false);
      setError(t('auth.passwordRequestSent', 'Request sent successfully.'));
      setSnackbarVisible(true);

    } catch (err) {
      console.error('Error submitting request:', err);
      setError(t('auth.requestFailed', 'Failed to submit request.'));
      setSnackbarVisible(true);
    } finally {
      setIsLoading(false);
    }
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

      {/* Language Switcher */}
      <View style={styles.languageSwitcherContainer}>
        <LanguageSwitcher />
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.logoContainer}>
            <Text style={[styles.appName, { color: theme.colors.primary }]}>
              {t('common.appName')}
            </Text>
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

              {!!error && <Text style={styles.errorText}>{error}</Text>}

              <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.loginButton}
                loading={isLoading}
                disabled={isLoading}
              >
                {t('auth.login')}
              </Button>

              <Button
                mode="text"
                onPress={() => setShowPasswordRequestModal(true)}
                style={styles.forgotPasswordButton}
              >
                {t('auth.needPassword', 'Need a Password?')}
              </Button>
            </View>
          </View>

          {/* Powered by YAGRI */}
          <View style={styles.poweredByContainer}>
            <Image 
              source={require('../../assets/images/YAGRINV.png')} 
              style={styles.sscLogo} 
              resizeMode="contain" 
            />
            <Text style={styles.poweredByText}>
              {t('common.poweredBy', 'Powered by YAGRI')}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Snackbar for errors */}
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

      {/* Modal for Password Request */}
      {showPasswordRequestModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {t('auth.enterEmailToSendPassword', 'Enter your email')}
            </Text>
            <TextInput
              label={t('auth.email')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              mode="outlined"
              style={styles.modalInput}
              disabled={isLoading}
            />
            <Button
              mode="contained"
              onPress={handleRequestPassword}
              loading={isLoading}
              disabled={isLoading}
              style={styles.modalButton}
            >
              {t('auth.submit')}
            </Button>
            <Button
              mode="text"
              onPress={() => setShowPasswordRequestModal(false)}
              disabled={isLoading}
              style={styles.modalCancel}
            >
              {t('auth.cancel')}
            </Button>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

// ✅ Styles
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
  forgotPasswordButton: {
    marginTop: 16,
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

  // Modal Styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 24,
    zIndex: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    marginBottom: 16,
  },
  modalButton: {
    marginTop: 8,
  },
  modalCancel: {
    marginTop: 8,
  },
});