// Server-only locale functions
import { cookies, headers } from 'next/headers';
import { 
  SUPPORTED_LOCALES, 
  DEFAULT_LOCALE, 
  LOCALE_COOKIE_NAME,
  COUNTRY_TO_LOCALE,
  type SupportedLocale 
} from './locale-types';

/**
 * Get the current locale from cookies or geolocation
 * Priority: Cookie > Geolocation > Default
 */
export async function getLocale(): Promise<SupportedLocale> {
  const cookieStore = await cookies();
  const headersList = await headers();
  
  // 1. Check if locale cookie exists
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value as SupportedLocale | undefined;
  
  if (cookieLocale && SUPPORTED_LOCALES[cookieLocale]) {
    return cookieLocale;
  }
  
  // 2. Use Vercel geolocation headers as fallback
  const country = headersList.get('x-vercel-ip-country');
  
  if (country) {
    const geoLocale = COUNTRY_TO_LOCALE[country];
    
    if (geoLocale) {
      // Set cookie for future visits (but don't await to keep it fast)
      setLocaleCookie(geoLocale);
      return geoLocale;
    }
  }
  
  // 3. Return default locale
  setLocaleCookie(DEFAULT_LOCALE);
  return DEFAULT_LOCALE;
}

/**
 * Set the locale cookie
 */
export async function setLocaleCookie(locale: SupportedLocale) {
  const cookieStore = await cookies();
  
  cookieStore.set(LOCALE_COOKIE_NAME, locale, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  });
}

/**
 * Clear the locale cookie (useful for testing)
 */
export async function clearLocaleCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(LOCALE_COOKIE_NAME);
}