import { client, previewClient } from '@/lib/contentful/contentful'
import type { Entry, EntrySkeletonType, ChainModifiers } from 'contentful'
import type { DefaultChainModifiers, SupportedLocales } from '@/lib/contentful/types/fields'
import type { SupportedLocale } from '@/lib/locale-types'

export interface FetchOptions {
  preview?: boolean
  include?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
  order?: string[],
  limit?: number,
  locale?: SupportedLocale
}

export async function fetchEntry<T extends EntrySkeletonType>(
  contentType: string,
  query: Record<string, unknown>,
  options: FetchOptions = {}
): Promise<Entry<T, DefaultChainModifiers, SupportedLocales> | null> {
  const contentfulClient = options.preview ? previewClient : client
  
  try {
    const entries = await contentfulClient.withoutUnresolvableLinks.getEntries<T, SupportedLocales>({
      content_type: contentType,
      limit: 1,
      include: options.include || 2,
      ...(options.locale && { locale: options.locale }),
      ...query
    })
    
    return entries.items[0] || null
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error)
    return null
  }
}

export async function fetchEntries<T extends EntrySkeletonType>(
  contentType: string,
  query: Record<string, unknown> = {},
  options: FetchOptions = {}
): Promise<Entry<T, DefaultChainModifiers, SupportedLocales>[]> {
  const contentfulClient = options.preview ? previewClient : client
  
  try {
    const entries = await contentfulClient.withoutUnresolvableLinks.getEntries<T, SupportedLocales>({
      content_type: contentType,
      limit: 1000,
      include: options.include || 2,
      ...(options.locale && { locale: options.locale }),
      ...query
    })
    
    return entries.items
  } catch (error) {
    console.error(`Error fetching ${contentType} entries:`, error)
    return []
  }
}

export function resolveFields<T extends EntrySkeletonType>(
  entry: Entry<T, ChainModifiers, SupportedLocales> | undefined | null
): T['fields'] | null {
  return entry?.fields || null
}