/*
  Contentful Migration: Update existing Hero Section content type
  ID: heroSection
*/

module.exports = function (migration) {
  const hero = migration
    .editContentType("moduleHero")
    .name("[Module] Hero")
    .description("")
    .displayField("internalName");

  hero
    .editField("internalName")
    .name("Internal Name")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  hero
    .editField("heading")
    .name("Heading")
    .type("Symbol")
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  hero
    .editField("subheading")
    .name("Subheading")
    .type("RichText")
    .localized(true)
    .required(false)
    .validations([
      {
        enabledNodeTypes: [
          "heading-1",
          "heading-2",
          "heading-3",
          "heading-4",
          "heading-5",
          "heading-6",
          "ordered-list",
          "unordered-list",
          "hr",
          "blockquote",
          "embedded-entry-block",
          "embedded-asset-block",
          "hyperlink",
          "entry-hyperlink",
          "asset-hyperlink",
          "embedded-entry-inline",
        ],
        message:
          "Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, link to Url, link to entry, link to asset, and inline entry nodes are allowed",
      },
      {
        enabledMarks: ["bold", "italic", "underline", "code"],
        message: "Only bold, italic, underline, and code marks are allowed",
      },
    ])
    .disabled(false)
    .omitted(false);

  hero
    .editField("image")
    .name("Image")
    .type("Link")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType("Asset");

  hero
    .editField("bgColor")
    .name("Background Color")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  hero
    .editField("primaryCta")
    .name("Primary CTA")
    .type("Link")
    .localized(false)
    .required(false)
    .validations([{ linkContentType: ["cta"] }])
    .disabled(false)
    .omitted(false)
    .linkType("Entry");

  hero
    .editField("secondaryCta")
    .name("Secondary CTA")
    .type("Link")
    .localized(false)
    .required(false)
    .validations([{ linkContentType: ["cta"] }])
    .disabled(false)
    .omitted(false)
    .linkType("Entry");

  hero
    .editField("height")
    .name("Height")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([{ in: ["small", "medium", "large", "full screen"] }])
    .defaultValue({ "en-US": "medium" })
    .disabled(false)
    .omitted(false);
};
