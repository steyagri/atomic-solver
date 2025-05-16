import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import { db } from '../firebase/firebase';

// Session constants
const SESSION_KEY = 'auth_session';
const PASSWORD_EXPIRY_DAYS = 7;

// Firestore password request interface
interface PasswordRequest {
  email: string;
  deviceId: string;
  installId: string;
  requestedAt: { toDate: () => Date }; // Assume it's a Firestore Timestamp
  status: 'pending' | 'approved';
}

// Auth context type
type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getInstallId = async () => {
    let installId = await AsyncStorage.getItem('INSTALL_ID');
    if (!installId) {
      installId = 'InNOScEnce-' + Math.random().toString(36).substr(2, 9);
      await AsyncStorage.setItem('INSTALL_ID', installId);
    }
    return installId;
  };

  // Load session on start
  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionData = await AsyncStorage.getItem(SESSION_KEY);
        if (sessionData) {
          const session = JSON.parse(sessionData);
          const expiry = new Date(session.expiresAt);
          if (expiry > new Date()) {
            setIsAuthenticated(true);
          } else {
            await AsyncStorage.removeItem(SESSION_KEY);
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Login function using Firestore doc ID as password
  const login = async (password: string): Promise<boolean> => {
    try {
      const deviceId = DeviceInfo.getDeviceId() || 'UnknownDevice';
      const installId = await getInstallId();

      const passwordDocRef = doc(db, 'passwordRequests', password.trim());
      const passwordDoc = await getDoc(passwordDocRef);

      if (!passwordDoc.exists()) {
        return false;
      }

      const data = passwordDoc.data() as PasswordRequest;

      // Check approval status
      if (data.status !== 'approved') {
        return false;
      }

      // Check expiration
      const expiresAt = data.requestedAt.toDate();
      expiresAt.setDate(expiresAt.getDate() + PASSWORD_EXPIRY_DAYS);

      if (expiresAt < new Date()) {
        return false;
      }

      // Validate device and install ID match
      if (
        data.deviceId === deviceId &&
        data.installId === installId
      ) {
        // Save session
        const sessionExpiry = new Date();
        sessionExpiry.setDate(sessionExpiry.getDate() + 7); // Example session duration

        await AsyncStorage.setItem(
          SESSION_KEY,
          JSON.stringify({
            authenticated: true,
            expiresAt: sessionExpiry.toISOString(),
          })
        );

        setIsAuthenticated(true);
        return true;
      }

      return false;

    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem(SESSION_KEY);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};