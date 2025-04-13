// Type declarations for modules without TypeScript definitions

declare module 'react-native-localize' {
  export function getLocales(): Array<{
    countryCode: string;
    languageTag: string;
    languageCode: string;
    isRTL: boolean;
  }>;
  
  export function getNumberFormatSettings(): {
    decimalSeparator: string;
    groupingSeparator: string;
  };
  
  export function getCalendar(): string;
  export function getCountry(): string;
  export function getCurrencies(): string[];
  export function getTemperatureUnit(): string;
  export function getTimeZone(): string;
  export function uses24HourClock(): boolean;
  export function usesMetricSystem(): boolean;
  
  export function addEventListener(
    type: string,
    handler: Function
  ): void;
  
  export function removeEventListener(
    type: string,
    handler: Function
  ): void;
}

declare module './locales/en' {
  const en: Record<string, any>;
  export default en;
}

declare module './locales/fr' {
  const fr: Record<string, any>;
  export default fr;
}

declare module './locales/ar' {
  const ar: Record<string, any>;
  export default ar;
} 