import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeComponentTestimonialFields {
    internalName: EntryFieldTypes.Symbol;
    backgroundColor?: EntryFieldTypes.Symbol<"brand-accent" | "brand-primary" | "brand-secondary" | "neutral-dark" | "surface-pure" | "surface-soft">;
    name: EntryFieldTypes.Symbol;
    role?: EntryFieldTypes.Symbol;
    testimonial: EntryFieldTypes.Text;
    showRating?: EntryFieldTypes.Boolean;
}

export type TypeComponentTestimonialSkeleton = EntrySkeletonType<TypeComponentTestimonialFields, "componentTestimonial">;
export type TypeComponentTestimonial<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeComponentTestimonialSkeleton, Modifiers, Locales>;

export function isTypeComponentTestimonial<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeComponentTestimonial<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'componentTestimonial'
}
