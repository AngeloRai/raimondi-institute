import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeComponentSeoFields {
    internalName: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Text;
    description?: EntryFieldTypes.Text;
    ogTitle?: EntryFieldTypes.Text;
    ogDescription?: EntryFieldTypes.Text;
    ogImage?: EntryFieldTypes.AssetLink;
}

export type TypeComponentSeoSkeleton = EntrySkeletonType<TypeComponentSeoFields, "componentSeo">;
export type TypeComponentSeo<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeComponentSeoSkeleton, Modifiers, Locales>;

export function isTypeComponentSeo<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeComponentSeo<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'componentSeo'
}
