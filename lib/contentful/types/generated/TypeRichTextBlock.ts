import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeRichTextBlockFields {
    internalName: EntryFieldTypes.Symbol;
    copy?: EntryFieldTypes.RichText;
}

export type TypeRichTextBlockSkeleton = EntrySkeletonType<TypeRichTextBlockFields, "richTextBlock">;
export type TypeRichTextBlock<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeRichTextBlockSkeleton, Modifiers, Locales>;

export function isTypeRichTextBlock<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeRichTextBlock<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'richTextBlock'
}
