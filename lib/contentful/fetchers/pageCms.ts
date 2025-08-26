import type { Entry } from "contentful";
import { fetchEntry, fetchEntries } from "@/lib/contentful/fetchers/base";
import type {
  DefaultChainModifiers,
  SupportedLocales,
} from "@/lib/contentful/types/fields";
import type { TypePageCmsSkeleton } from "@/lib/contentful/types/generated";
import type { SupportedLocale } from "@/lib/locale-types";

type IncludeLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// Fetch a single page by slug for a specific locale
export async function getPageBySlug(
  slug: string,
  locale: SupportedLocale = "en-US",
  options: {
    preview?: boolean;
    include?: IncludeLevel;
  } = { include: 3, preview: false }
): Promise<Entry<
  TypePageCmsSkeleton,
  DefaultChainModifiers,
  SupportedLocales
> | null> {
  return fetchEntry<TypePageCmsSkeleton>(
    "pageCms",
    { "fields.slug": slug },
    { preview: options.preview, include: options.include ?? 3, locale }
  );
}

// Fetch all pages for a specific locale
export async function getAllPages(
  locale: SupportedLocale = "en-US",
  options: {
    preview?: boolean;
    include?: IncludeLevel;
  } = { include: 2, preview: false }
): Promise<
  Entry<TypePageCmsSkeleton, DefaultChainModifiers, SupportedLocales>[]
> {
  return fetchEntries<TypePageCmsSkeleton>(
    "pageCms",
    {},
    { preview: options.preview, include: options.include ?? 2, locale }
  );
}
