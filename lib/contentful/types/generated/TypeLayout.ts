import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeFooterSkeleton } from "./TypeFooter";
import type { TypeNavbarSkeleton } from "./TypeNavbar";

export interface TypeLayoutFields {
    internalName: EntryFieldTypes.Symbol;
    navbar?: EntryFieldTypes.EntryLink<TypeNavbarSkeleton>;
    footer?: EntryFieldTypes.EntryLink<TypeFooterSkeleton>;
}

export type TypeLayoutSkeleton = EntrySkeletonType<TypeLayoutFields, "layout">;
export type TypeLayout<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeLayoutSkeleton, Modifiers, Locales>;

export function isTypeLayout<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeLayout<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'layout'
}
