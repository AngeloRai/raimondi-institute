import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCtaSkeleton } from "./TypeCta";

export interface TypeComponentImageCardFields {
    internalName: EntryFieldTypes.Symbol;
    heading: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    image?: EntryFieldTypes.AssetLink;
    cta?: EntryFieldTypes.EntryLink<TypeCtaSkeleton>;
    backgroundColor?: EntryFieldTypes.Symbol<"charcoal-gray" | "dark-forest-green" | "light-forest-green" | "medium-forest-green" | "pure-white" | "warm-cream">;
}

export type TypeComponentImageCardSkeleton = EntrySkeletonType<TypeComponentImageCardFields, "componentImageCard">;
export type TypeComponentImageCard<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeComponentImageCardSkeleton, Modifiers, Locales>;

export function isTypeComponentImageCard<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeComponentImageCard<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'componentImageCard'
}
