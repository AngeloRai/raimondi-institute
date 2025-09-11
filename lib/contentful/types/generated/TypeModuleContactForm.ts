import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeModuleContactFormFields {
    internalName: EntryFieldTypes.Symbol;
    heading: EntryFieldTypes.Symbol;
    subheading?: EntryFieldTypes.Text;
    subjects: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    messagePlaceholder?: EntryFieldTypes.Text;
    buttonText?: EntryFieldTypes.Symbol;
    businessInfoHeading?: EntryFieldTypes.Symbol;
    addresses: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    phones: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    schedule: EntryFieldTypes.Text;
    copy?: EntryFieldTypes.Text;
    backgroundColor?: EntryFieldTypes.Symbol<"brand-accent" | "brand-primary" | "brand-secondary" | "neutral-dark" | "surface-pure" | "surface-soft">;
    redirectUrl?: EntryFieldTypes.Symbol;
}

export type TypeModuleContactFormSkeleton = EntrySkeletonType<TypeModuleContactFormFields, "moduleContactForm">;
export type TypeModuleContactForm<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeModuleContactFormSkeleton, Modifiers, Locales>;

export function isTypeModuleContactForm<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeModuleContactForm<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'moduleContactForm'
}
