import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeComponentLinksSkeleton } from "./TypeComponentLinks";
import type { TypeCtaSkeleton } from "./TypeCta";

export interface TypeModuleHeroFields {
    internalName: EntryFieldTypes.Symbol;
    height?: EntryFieldTypes.Symbol<"full screen" | "large" | "medium" | "small">;
    heading?: EntryFieldTypes.Symbol;
    socialShare?: EntryFieldTypes.EntryLink<TypeComponentLinksSkeleton>;
    subheading?: EntryFieldTypes.RichText;
    image?: EntryFieldTypes.AssetLink;
    imagePosition?: EntryFieldTypes.Symbol<"center" | "overlay" | "split">;
    primaryCta?: EntryFieldTypes.EntryLink<TypeCtaSkeleton>;
    secondaryCta?: EntryFieldTypes.EntryLink<TypeCtaSkeleton>;
    copy?: EntryFieldTypes.RichText;
    backgroundColor?: EntryFieldTypes.Symbol<"brand-accent" | "brand-primary" | "brand-secondary" | "neutral-dark" | "surface-pure" | "surface-soft">;
}

export type TypeModuleHeroSkeleton = EntrySkeletonType<TypeModuleHeroFields, "moduleHero">;
export type TypeModuleHero<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeModuleHeroSkeleton, Modifiers, Locales>;

export function isTypeModuleHero<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeModuleHero<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'moduleHero'
}
