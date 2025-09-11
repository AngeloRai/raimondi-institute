import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCtaSkeleton } from "./TypeCta";
import type { TypeLinkSkeleton } from "./TypeLink";

export interface TypeNavbarFields {
    internalName: EntryFieldTypes.Symbol;
    logo?: EntryFieldTypes.AssetLink;
    navigationLinks?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLinkSkeleton>>;
    cta?: EntryFieldTypes.EntryLink<TypeCtaSkeleton>;
    backgroundColor?: EntryFieldTypes.Symbol<"brand-accent" | "brand-primary" | "brand-secondary" | "neutral-dark" | "surface-pure" | "surface-soft">;
}

export type TypeNavbarSkeleton = EntrySkeletonType<TypeNavbarFields, "navbar">;
export type TypeNavbar<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNavbarSkeleton, Modifiers, Locales>;

export function isTypeNavbar<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeNavbar<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'navbar'
}
