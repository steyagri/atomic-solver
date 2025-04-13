import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';

// Import language resources
import en from './locales/en';
import fr from './locales/fr';
import ar from './locales/ar';

// Define resources
const resources = {
  en: { translation: en },
  fr: { translation: fr },
  ar: { translation: ar },
};

// Language detector
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      // Get stored language from AsyncStorage
      const storedLanguage = await AsyncStorage.getItem('user-language');
      
      if (storedLanguage) {
        // Return stored language
        return callback(storedLanguage);
      } else {
        // If no stored language, use device language or default to English
        const deviceLanguage = RNLocalize.getLocales()[0].languageCode;
        const supportedLanguages = Object.keys(resources);
        
        // Check if device language is supported
        if (supportedLanguages.includes(deviceLanguage)) {
          return callback(deviceLanguage);
        } else {
          return callback('en');
        }
      }
    } catch (error) {
      console.error('Error detecting language:', error);
      return callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      // Store selected language without RTL handling
      // RTL is now handled in the LanguageSwitcher component
      await AsyncStorage.getItem('user-language');
      await AsyncStorage.setItem('user-language', lng);
    } catch (error) {
      console.error('Error caching language:', error);
    }
  }
};

// Initialize i18next
i18n
  .use(languageDetector as any)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'translation',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Helper functions
export const changeLanguage = async (lng: string) => {
  await i18n.changeLanguage(lng);
};

export const getCurrentLanguage = () => {
  return i18n.language || 'en';
};

export const isRTL = () => {
  return i18n.language === 'ar';
};

export default i18n;

// Create a type for our translation keys
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      common: typeof en.common;
      calculator: typeof en.calculator;
      results: typeof en.results;
      auth: typeof en.auth;
    };
  }
} 