import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeModuleContactFormSkeleton } from "./TypeModuleContactForm";
import type { TypeModuleGridSkeleton } from "./TypeModuleGrid";
import type { TypeModuleHeroSkeleton } from "./TypeModuleHero";
import type { TypeModuleImageCarouselSkeleton } from "./TypeModuleImageCarousel";
import type { TypeModuleImageTextSkeleton } from "./TypeModuleImageText";
import type { TypeRichTextBlockSkeleton } from "./TypeRichTextBlock";

export interface TypePageCmsFields {
    internalName: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    contentModules?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeModuleContactFormSkeleton | TypeModuleGridSkeleton | TypeModuleHeroSkeleton | TypeModuleImageCarouselSkeleton | TypeModuleImageTextSkeleton | TypeRichTextBlockSkeleton>>;
}

export type TypePageCmsSkeleton = EntrySkeletonType<TypePageCmsFields, "pageCms">;
export type TypePageCms<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePageCmsSkeleton, Modifiers, Locales>;

export function isTypePageCms<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePageCms<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'pageCms'
}
