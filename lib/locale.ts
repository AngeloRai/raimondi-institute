// Server-only locale functions
import { cookies } from 'next/headers';
import { 
  SUPPORTED_LOCALES, 
  DEFAULT_LOCALE, 
  LOCALE_COOKIE_NAME,
  type SupportedLocale 
} from './locale-types';

/**
 * Get the current locale from cookies or geolocation
 * Priority: Cookie > Geolocation > Default
 */
export async function getLocale(): Promise<SupportedLocale> {
  try {
    const cookieStore = await cookies();
    
    // 1. Check if locale cookie exists
    const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value as SupportedLocale | undefined;
    
    if (cookieLocale && SUPPORTED_LOCALES[cookieLocale]) {
      return cookieLocale;
    }
  } catch {
    // During static generation, cookies/headers are not available
    // Return default locale for build time
  }
  
  // Return default locale
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