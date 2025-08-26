import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeFooterComponentSkeleton } from "./TypeFooterComponent";
import type { TypeNavbarSkeleton } from "./TypeNavbar";

export interface TypeLayoutFields {
    internalName?: EntryFieldTypes.Text;
    navbar?: EntryFieldTypes.EntryLink<TypeNavbarSkeleton>;
    footer?: EntryFieldTypes.EntryLink<TypeFooterComponentSkeleton>;
}

export type TypeLayoutSkeleton = EntrySkeletonType<TypeLayoutFields, "layout">;
export type TypeLayout<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeLayoutSkeleton, Modifiers, Locales>;

export function isTypeLayout<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeLayout<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'layout'
}
