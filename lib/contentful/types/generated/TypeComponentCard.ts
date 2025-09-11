import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCtaSkeleton } from "./TypeCta";

export interface TypeComponentCardFields {
    internalName: EntryFieldTypes.Symbol;
    heading: EntryFieldTypes.Symbol;
    subheading: EntryFieldTypes.Text;
    icon: EntryFieldTypes.Symbol<"chevronLeft" | "chevronRight" | "craftsman" | "facebook" | "grandPiano" | "heart" | "instagram" | "menu" | "music" | "piano" | "playingPiano" | "service" | "twitter" | "x" | "youtube">;
    backgroundColor?: EntryFieldTypes.Symbol<"brand-accent" | "brand-primary" | "brand-secondary" | "neutral-dark" | "surface-pure" | "surface-soft">;
    cta?: EntryFieldTypes.EntryLink<TypeCtaSkeleton>;
}

export type TypeComponentCardSkeleton = EntrySkeletonType<TypeComponentCardFields, "componentCard">;
export type TypeComponentCard<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeComponentCardSkeleton, Modifiers, Locales>;

export function isTypeComponentCard<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeComponentCard<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'componentCard'
}
