import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCtaSkeleton } from "./TypeCta";

export interface TypeModuleImageCarouselFields {
    internalName: EntryFieldTypes.Symbol;
    heading?: EntryFieldTypes.Symbol;
    subheading?: EntryFieldTypes.Text;
    images: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    backgroundColor?: EntryFieldTypes.Symbol<"brand-accent" | "brand-primary" | "brand-secondary" | "neutral-dark" | "surface-pure" | "surface-soft">;
    autoplay?: EntryFieldTypes.Boolean;
    autoplayInterval?: EntryFieldTypes.Integer;
    navigation?: EntryFieldTypes.Symbol<"arrows" | "both" | "dots" | "none">;
    cta?: EntryFieldTypes.EntryLink<TypeCtaSkeleton>;
}

export type TypeModuleImageCarouselSkeleton = EntrySkeletonType<TypeModuleImageCarouselFields, "moduleImageCarousel">;
export type TypeModuleImageCarousel<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeModuleImageCarouselSkeleton, Modifiers, Locales>;

export function isTypeModuleImageCarousel<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeModuleImageCarousel<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'moduleImageCarousel'
}
