import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCtaSkeleton } from "./TypeCta";
import type { TypeLinkSkeleton } from "./TypeLink";

export interface TypeComponentLinksFields {
    internalName: EntryFieldTypes.Symbol;
    title?: EntryFieldTypes.Symbol;
    links?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCtaSkeleton | TypeLinkSkeleton>>;
}

export type TypeComponentLinksSkeleton = EntrySkeletonType<TypeComponentLinksFields, "componentLinks">;
export type TypeComponentLinks<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeComponentLinksSkeleton, Modifiers, Locales>;

export function isTypeComponentLinks<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeComponentLinks<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'componentLinks'
}
