'use server';

import { revalidatePath } from 'next/cache';
import { setLocaleCookie } from '@/lib/locale';
import type { SupportedLocale } from '@/lib/locale-types';

/**
 * Server action to update the user's locale preference
 */
export async function updateLocale(formData: FormData) {
  const locale = formData.get('locale') as SupportedLocale;
  
  if (locale) {
    await setLocaleCookie(locale);
    
    // Revalidate all pages to reflect the locale change
    revalidatePath('/', 'layout');
  }
}