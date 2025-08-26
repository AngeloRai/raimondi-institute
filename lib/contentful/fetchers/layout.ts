import type { Entry } from "contentful";
import { fetchEntries } from "@/lib/contentful/fetchers/base";
import type {
  DefaultChainModifiers,
  SupportedLocales,
} from "@/lib/contentful/types/fields";
import type { TypeLayoutSkeleton } from "@/lib/contentful/types/generated";
import type { SupportedLocale } from "@/lib/locale-types";

type IncludeLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// Fetch the most recently updated layout for a specific locale
export async function getLayout(
  locale: SupportedLocale = "en-US",
  options: {
    preview?: boolean;
    include?: IncludeLevel;
  } = { include: 4, preview: false }
): Promise<
  Entry<TypeLayoutSkeleton, DefaultChainModifiers, SupportedLocales> | null
> {
  const allLayouts = await fetchEntries<TypeLayoutSkeleton>(
    "layout",
    {},
    { 
      preview: options.preview, 
      include: options.include ?? 4,
      order: ["-sys.updatedAt"], // Order by most recently updated first
      limit: 1, // Only fetch the first (most recent) entry
      locale
    }
  );
  
  return allLayouts.length > 0 ? allLayouts[0] : null;
}
