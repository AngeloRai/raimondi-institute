import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCtaSkeleton } from "./TypeCta";

export interface TypeModuleImageTextFields {
    internalName: EntryFieldTypes.Symbol;
    heading?: EntryFieldTypes.Symbol;
    subheading?: EntryFieldTypes.RichText;
    image?: EntryFieldTypes.AssetLink;
    imagePosition?: EntryFieldTypes.Symbol<"left" | "overlay" | "right">;
    backgroundColor?: EntryFieldTypes.Symbol;
    primaryCta?: EntryFieldTypes.EntryLink<TypeCtaSkeleton>;
    secondaryCta?: EntryFieldTypes.EntryLink<TypeCtaSkeleton>;
}

export type TypeModuleImageTextSkeleton = EntrySkeletonType<TypeModuleImageTextFields, "moduleImageText">;
export type TypeModuleImageText<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeModuleImageTextSkeleton, Modifiers, Locales>;

export function isTypeModuleImageText<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeModuleImageText<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'moduleImageText'
}
