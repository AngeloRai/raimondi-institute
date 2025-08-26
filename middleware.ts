import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, LOCALE_COOKIE_NAME, COUNTRY_TO_LOCALE, type SupportedLocale } from './lib/locale-types';

export function middleware(request: NextRequest) {
  // Get locale from cookie first
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  
  if (cookieLocale && cookieLocale in SUPPORTED_LOCALES) {
    // Valid locale in cookie, continue with request
    return NextResponse.next();
  }

  // If no valid cookie locale, detect from headers
  const acceptLanguage = request.headers.get('accept-language');
  const country = request.headers.get('x-vercel-ip-country');
  
  let detectedLocale = DEFAULT_LOCALE;
  
  // Try to detect from country first
  if (country && COUNTRY_TO_LOCALE[country]) {
    detectedLocale = COUNTRY_TO_LOCALE[country] as SupportedLocale;
  } else if (acceptLanguage) {
    // Fallback to accept-language header
    const preferredLocales = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim());
    
    for (const locale of preferredLocales) {
      if (locale in SUPPORTED_LOCALES) {
        detectedLocale = locale as SupportedLocale;
        break;
      }
      // Check for partial matches (e.g., 'en' matches 'en-US')
      const match = Object.keys(SUPPORTED_LOCALES).find(key => 
        key.startsWith(locale.split('-')[0])
      );
      if (match) {
        detectedLocale = match as SupportedLocale;
        break;
      }
    }
  }

  // Set the locale cookie and continue
  const response = NextResponse.next();
  response.cookies.set(LOCALE_COOKIE_NAME, detectedLocale, {
    maxAge: 365 * 24 * 60 * 60, // 1 year
    httpOnly: false, // Allow client-side access for locale switching
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (*.svg, *.png, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)/'
  ]
};