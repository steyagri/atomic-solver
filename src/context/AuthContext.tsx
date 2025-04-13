import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '../constants/env';
import { compareHash, generateHash } from '../utils/hash';

// Constants with fallbacks
const HASHED_PASSWORD = ENV.HASHED_PASSWORD;
const SESSION_DURATION_DAYS = ENV.SESSION_DURATION_DAYS;

// Session key for storage
const SESSION_KEY = 'auth_session';

// Define the Auth context type
type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if there's an active session on app start
  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionData = await AsyncStorage.getItem(SESSION_KEY);
        
        if (sessionData) {
          const session = JSON.parse(sessionData);
          const sessionExpiry = new Date(session.expiresAt);
          
          if (sessionExpiry > new Date()) {
            setIsAuthenticated(true);
          } else {
            // Session expired, clean up
            await AsyncStorage.removeItem(SESSION_KEY);
          }
        }
      } catch (error) {
        console.error('Error checking auth session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Login function
  const login = async (password: string): Promise<boolean> => {
    try {
      // Compare password with stored hash using our custom function
      const isMatch = await compareHash(password, HASHED_PASSWORD);
      
      if (isMatch) {
        // Create session with expiry date
        const days = parseInt(SESSION_DURATION_DAYS, 10);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + days);
        
        // Store session data
        await AsyncStorage.setItem(
          SESSION_KEY,
          JSON.stringify({
            authenticated: true,
            expiresAt: expiresAt.toISOString(),
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
  const logout = async (): Promise<void> => {
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

// Hook for using the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Export our hash generator
export { generateHash }; 