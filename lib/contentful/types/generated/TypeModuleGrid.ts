import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeComponentCardSkeleton } from "./TypeComponentCard";
import type { TypeComponentTestimonialSkeleton } from "./TypeComponentTestimonial";

export interface TypeModuleGridFields {
    internalName: EntryFieldTypes.Symbol;
    backgroundColor?: EntryFieldTypes.Symbol<"brand-accent" | "brand-primary" | "brand-secondary" | "neutral-dark" | "surface-pure" | "surface-soft">;
    heading?: EntryFieldTypes.Symbol;
    subheading?: EntryFieldTypes.Text;
    items?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeComponentCardSkeleton | TypeComponentTestimonialSkeleton>>;
}

export type TypeModuleGridSkeleton = EntrySkeletonType<TypeModuleGridFields, "moduleGrid">;
export type TypeModuleGrid<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeModuleGridSkeleton, Modifiers, Locales>;

export function isTypeModuleGrid<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeModuleGrid<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'moduleGrid'
}
