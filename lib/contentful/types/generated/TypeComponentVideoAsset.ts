import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeComponentVideoAssetFields {
    internalName: EntryFieldTypes.Symbol;
    youTubeUrl?: EntryFieldTypes.Symbol;
    videoAsset?: EntryFieldTypes.AssetLink;
}

export type TypeComponentVideoAssetSkeleton = EntrySkeletonType<TypeComponentVideoAssetFields, "componentVideoAsset">;
export type TypeComponentVideoAsset<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeComponentVideoAssetSkeleton, Modifiers, Locales>;

export function isTypeComponentVideoAsset<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeComponentVideoAsset<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'componentVideoAsset'
}
