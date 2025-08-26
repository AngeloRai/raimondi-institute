import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeComponentLinksSkeleton } from "./TypeComponentLinks";
import type { TypeLinkSkeleton } from "./TypeLink";

export interface TypeFooterComponentFields {
    internalName: EntryFieldTypes.Symbol;
    logo?: EntryFieldTypes.AssetLink;
    socialShare?: EntryFieldTypes.EntryLink<TypeComponentLinksSkeleton>;
    slogan?: EntryFieldTypes.Text;
    links?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeComponentLinksSkeleton>>;
    copyrightPhrase?: EntryFieldTypes.Text;
    copyrightLinks?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLinkSkeleton>>;
}

export type TypeFooterComponentSkeleton = EntrySkeletonType<TypeFooterComponentFields, "footerComponent">;
export type TypeFooterComponent<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeFooterComponentSkeleton, Modifiers, Locales>;

export function isTypeFooterComponent<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeFooterComponent<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'footerComponent'
}
