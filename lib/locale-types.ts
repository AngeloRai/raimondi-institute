// Shared locale types and constants that can be used in both client and server

// Supported locales in Contentful
export const SUPPORTED_LOCALES = {
  'en-US': 'English',
  'pt-BR': 'Portuguese',
} as const;

export type SupportedLocale = keyof typeof SUPPORTED_LOCALES;

export const DEFAULT_LOCALE: SupportedLocale = 'en-US';
export const LOCALE_COOKIE_NAME = 'locale';

// Map countries to default locales
export const COUNTRY_TO_LOCALE: Record<string, SupportedLocale> = {
  // English speaking countries
  'US': 'en-US',
  'GB': 'en-US',
  'CA': 'en-US',
  'AU': 'en-US',
  'NZ': 'en-US',
  'IE': 'en-US',
  
  // Portuguese speaking countries
  'PT': 'pt-BR',
  'BR': 'pt-BR',
  'AO': 'pt-BR',
  'MZ': 'pt-BR',
  
  // All other countries default to English
  'ES': 'en-US',
  'MX': 'en-US',
  'AR': 'en-US',
  'CO': 'en-US',
  'CL': 'en-US',
  'PE': 'en-US',
  'VE': 'en-US',
  'FR': 'en-US',
  'BE': 'en-US',
  'CH': 'en-US',
  'LU': 'en-US',
  'DE': 'en-US',
  'AT': 'en-US',
  'IT': 'en-US',
  'SM': 'en-US',
  'VA': 'en-US',
};