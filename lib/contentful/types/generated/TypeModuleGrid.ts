import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeComponentCardSkeleton } from "./TypeComponentCard";
import type { TypeComponentTestimonialSkeleton } from "./TypeComponentTestimonial";
import type { TypeCtaSkeleton } from "./TypeCta";

export interface TypeModuleGridFields {
    internalName: EntryFieldTypes.Symbol;
    heading?: EntryFieldTypes.Symbol;
    subheading?: EntryFieldTypes.Text;
    items?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeComponentCardSkeleton | TypeComponentTestimonialSkeleton>>;
    backgroundColor?: EntryFieldTypes.Symbol<"dark" | "light" | "white">;
    cta?: EntryFieldTypes.EntryLink<TypeCtaSkeleton>;
}

export type TypeModuleGridSkeleton = EntrySkeletonType<TypeModuleGridFields, "moduleGrid">;
export type TypeModuleGrid<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeModuleGridSkeleton, Modifiers, Locales>;

export function isTypeModuleGrid<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeModuleGrid<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'moduleGrid'
}
