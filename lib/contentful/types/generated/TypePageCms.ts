import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypePageCmsFields {
    internalName: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    contentModules?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
}

export type TypePageCmsSkeleton = EntrySkeletonType<TypePageCmsFields, "pageCms">;
export type TypePageCms<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePageCmsSkeleton, Modifiers, Locales>;

export function isTypePageCms<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePageCms<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'pageCms'
}
