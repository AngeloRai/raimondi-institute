import type { SupportedLocales, DefaultLocale } from '@/lib/contentful/types/fields'

export const SUPPORTED_LOCALES: SupportedLocales[] = ['en-US', 'pt-BR']
export const DEFAULT_LOCALE: DefaultLocale = 'en-US'

export function isValidLocale(locale: string): locale is SupportedLocales {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocales)
}

export function getValidLocale(locale: string | undefined): SupportedLocales {
  if (locale && isValidLocale(locale)) {
    return locale
  }
  return DEFAULT_LOCALE
}

// Extract content from multi-locale field (for component props)
export function getLocalizedContent<T>(
  content: { [K in SupportedLocales]?: T } | T | undefined,
  locale: SupportedLocales,
  fallbackLocale: SupportedLocales = DEFAULT_LOCALE
): T | undefined {
  if (!content) return undefined
  
  // If content is not localized (single value) - shouldn't happen in your setup but good fallback
  if (typeof content === 'string' || (typeof content === 'object' && content && !('en-US' in content))) {
    return content as T
  }
  
  // Try requested locale first
  const localizedContent = content as { [K in SupportedLocales]?: T }
  if (localizedContent[locale]) {
    return localizedContent[locale]
  }
  
  // Fallback to default locale
  if (localizedContent[fallbackLocale]) {
    return localizedContent[fallbackLocale]
  }
  
  // Return first available locale
  for (const availableLocale of SUPPORTED_LOCALES) {
    if (localizedContent[availableLocale]) {
      return localizedContent[availableLocale]
    }
  }
  
  return undefined
}

// Helper to localize all fields in component props
export function localizeProps<T extends Record<string, unknown>>(
  props: T,
  locale: SupportedLocales,
  fallbackLocale: SupportedLocales = DEFAULT_LOCALE
): Record<string, unknown> {
  const localizedProps: Record<string, unknown> = {}
  
  for (const [key, value] of Object.entries(props)) {
    localizedProps[key] = getLocalizedContent(value, locale, fallbackLocale)
  }
  
  return localizedProps
}