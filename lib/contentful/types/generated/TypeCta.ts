import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCtaFields {
    internalName: EntryFieldTypes.Symbol;
    label?: EntryFieldTypes.Symbol;
    url?: EntryFieldTypes.Symbol;
    variant?: EntryFieldTypes.Symbol<"ghost" | "ghost-dark" | "icon rounded" | "icon" | "outline" | "outline-dark" | "primary" | "secondary">;
    icon?: EntryFieldTypes.Symbol<"craftsman" | "facebook" | "grandPiano" | "heart" | "instagram" | "music" | "piano" | "playingPiano" | "service" | "twitter" | "youtube">;
    size?: EntryFieldTypes.Symbol<"large" | "medium" | "small">;
    external?: EntryFieldTypes.Boolean;
    disabled?: EntryFieldTypes.Boolean;
}

export type TypeCtaSkeleton = EntrySkeletonType<TypeCtaFields, "cta">;
export type TypeCta<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCtaSkeleton, Modifiers, Locales>;

export function isTypeCta<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeCta<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'cta'
}
