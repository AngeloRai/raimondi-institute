import type { Metadata } from "next";
import { getPageBySlug } from "@/lib/contentful/fetchers/pageCms";
import type { SupportedLocale } from "@/lib/locale-types";

export async function generatePageMetadata(
  pageSlug: string,
  locale: SupportedLocale
): Promise<Metadata> {
  try {
    const page = await getPageBySlug(pageSlug, locale);
    
    if (!page?.fields?.seo?.fields) {
      // Fallback metadata
      return {
        title: "Raimondi Institute",
        description: "Premier piano lessons and music education",
      };
    }

    const seo = page.fields.seo.fields;
    const ogImageUrl = seo.ogImage?.fields?.file?.url 
      ? `https:${seo.ogImage.fields.file.url}`
      : undefined;

    return {
      title: seo.title || seo.internalName,
      description: seo.description,
      openGraph: {
        title: seo.ogTitle || seo.title || seo.internalName,
        description: seo.ogDescription || seo.description,
        images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
        locale: locale,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: seo.ogTitle || seo.title || seo.internalName,
        description: seo.ogDescription || seo.description,
        images: ogImageUrl ? [ogImageUrl] : undefined,
      },
    };
  } catch (error) {
    console.warn(`Failed to generate metadata for ${pageSlug}:`, error);
    return {
      title: "Raimondi Institute",
      description: "Premier piano lessons and music education",
    };
  }
}