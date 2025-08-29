import type {
  TypeComponentCard,
  TypeComponentImageCard,
  TypeComponentLinks,
  TypeComponentSeo,
  TypeComponentTestimonial,
  TypeCta,
  TypeFooter,
  TypeLayout,
  TypeLink,
  TypeModuleGrid,
  TypeModuleHero,
  TypeModuleImageCarousel,
  TypeModuleImageText,
  TypeNavbar,
  TypePageCms,
  TypeRichTextBlock,
  TypeComponentVideoAsset,
  TypeModuleContactForm
} from "./generated";

import type { SupportedLocale } from '@/lib/locale-types';
export type SupportedLocales = SupportedLocale;
export type DefaultLocale = SupportedLocale;

// Chain modifiers for fetching
export type DefaultChainModifiers = "WITHOUT_UNRESOLVABLE_LINKS";
export type AllLocalesChainModifiers =
  | "WITHOUT_UNRESOLVABLE_LINKS"
  | "WITH_ALL_LOCALES";

// Helper to extract and clean fields
type ExtractFields<T> = T extends { fields: infer F } ? F : never;
export type OmitInternalName<T> = Omit<T, "internalName">;

// Component prop types - single locale since we fetch with specific locale
export type CardProps = OmitInternalName<
  ExtractFields<TypeComponentCard<DefaultChainModifiers, SupportedLocales>>
>;
export type ImageCardProps = OmitInternalName<
  ExtractFields<TypeComponentImageCard<DefaultChainModifiers, SupportedLocales>>
>;
export type CTAProps = OmitInternalName<
  ExtractFields<TypeCta<DefaultChainModifiers, SupportedLocales>>
>;
export type FooterProps = OmitInternalName<
  ExtractFields<TypeFooter<DefaultChainModifiers, SupportedLocales>>
>;
export type GridProps = OmitInternalName<
  ExtractFields<TypeModuleGrid<DefaultChainModifiers, SupportedLocales>>
>;
export type HeroProps = OmitInternalName<
  ExtractFields<TypeModuleHero<DefaultChainModifiers, SupportedLocales>>
>;
export type ImageCarouselProps = OmitInternalName<
  ExtractFields<TypeModuleImageCarousel<DefaultChainModifiers, SupportedLocales>>
>;
export type ImageTextProps = OmitInternalName<
  ExtractFields<TypeModuleImageText<DefaultChainModifiers, SupportedLocales>>
>;
export type LayoutProps = OmitInternalName<
  ExtractFields<TypeLayout<DefaultChainModifiers, SupportedLocales>>
>;
export type LinkProps = OmitInternalName<
  ExtractFields<TypeLink<DefaultChainModifiers, SupportedLocales>>
>;
export type LinksProps = OmitInternalName<
  ExtractFields<TypeComponentLinks<DefaultChainModifiers, SupportedLocales>>
>;
export type NavbarProps = OmitInternalName<
  ExtractFields<TypeNavbar<DefaultChainModifiers, SupportedLocales>>
>;
export type PageProps = OmitInternalName<
  ExtractFields<TypePageCms<DefaultChainModifiers, SupportedLocales>>
>;
export type SEOProps = OmitInternalName<
  ExtractFields<TypeComponentSeo<DefaultChainModifiers, SupportedLocales>>
>;
export type TestimonialProps = OmitInternalName<
  ExtractFields<TypeComponentTestimonial<DefaultChainModifiers, SupportedLocales>>
>;
export type RichTextBlockProps = OmitInternalName<
  ExtractFields<TypeRichTextBlock<DefaultChainModifiers, SupportedLocales>>
>;
export type VideoAssetProps = OmitInternalName<
  ExtractFields<TypeComponentVideoAsset<DefaultChainModifiers, SupportedLocales>>
>;
export type ContactFormProps = OmitInternalName<
  ExtractFields<TypeModuleContactForm<DefaultChainModifiers, SupportedLocales>>
>;