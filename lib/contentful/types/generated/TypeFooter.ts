import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeComponentLinksSkeleton } from "./TypeComponentLinks";
import type { TypeLinkSkeleton } from "./TypeLink";

export interface TypeFooterFields {
    internalName: EntryFieldTypes.Symbol;
    logo?: EntryFieldTypes.AssetLink;
    socialShare?: EntryFieldTypes.EntryLink<TypeComponentLinksSkeleton>;
    slogan?: EntryFieldTypes.Text;
    links?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeComponentLinksSkeleton>>;
    copyrightMessage?: EntryFieldTypes.Symbol;
    copyrightLinks?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLinkSkeleton>>;
    backgroundColor?: EntryFieldTypes.Symbol<"charcoal-gray" | "dark-forest-green" | "light-forest-green" | "medium-forest-green" | "pure-white" | "warm-cream">;
}

export type TypeFooterSkeleton = EntrySkeletonType<TypeFooterFields, "footer">;
export type TypeFooter<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeFooterSkeleton, Modifiers, Locales>;

export function isTypeFooter<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeFooter<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'footer'
}
