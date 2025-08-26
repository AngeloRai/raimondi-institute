/*
  Contentful Migration: Add heading/subheading fields to all content types
  This adds the new fields with same configuration as header/subheader
  Run via contentful-migration CLI.
*/

module.exports = function (migration) {
  
  // 1. ComponentCard - Add heading/subheading fields
  const componentCard = migration.editContentType("componentCard");
  
  componentCard
    .createField("heading")
    .name("Heading")
    .type("Symbol")
    .localized(true)
    .required(true)
    .validations([
      {
        size: {
          max: 100
        }
      }
    ])
    .disabled(false)
    .omitted(false);

  componentCard
    .createField("subheading")
    .name("Subheading")
    .type("Text")
    .localized(true)
    .required(true)
    .validations([
      {
        size: {
          max: 500
        }
      }
    ])
    .disabled(false)
    .omitted(false);

  // Configure field controls for ComponentCard
  componentCard.changeFieldControl("heading", "builtin", "singleLine", {
    helpText: "Card heading displayed prominently"
  });

  componentCard.changeFieldControl("subheading", "builtin", "multipleLine", {
    helpText: "Card subheading/description text (max 500 characters)"
  });

  // 2. ModuleImageText - Add heading/subheading fields
  const moduleImageText = migration.editContentType("moduleImageText");
  
  moduleImageText
    .createField("heading")
    .name("Heading")
    .type("Symbol")
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  moduleImageText
    .createField("subheading")
    .name("Subheading")
    .type("RichText")
    .localized(true)
    .required(false)
    .validations([
      {
        enabledMarks: ["bold", "italic", "underline"],
        message: "Only bold, italic, and underline formatting is allowed"
      },
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
          "embedded-asset-block",
          "hyperlink",
          "entry-hyperlink",
          "asset-hyperlink"
        ],
        message: "Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block embedded asset, link to Url, link to entry, and link to asset nodes are allowed"
      }
    ])
    .disabled(false)
    .omitted(false);

  // Configure field controls for ModuleImageText
  moduleImageText.changeFieldControl("heading", "builtin", "singleLine", {
    helpText: "Section heading"
  });

  moduleImageText.changeFieldControl("subheading", "builtin", "richTextEditor", {
    helpText: "Section subheading with rich text formatting"
  });

  // 3. ModuleGrid - Add heading/subheading fields
  const moduleGrid = migration.editContentType("moduleGrid");
  
  moduleGrid
    .createField("heading")
    .name("Heading")
    .type("Symbol")
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  moduleGrid
    .createField("subheading")
    .name("Subheading")
    .type("Text")
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  // Configure field controls for ModuleGrid
  moduleGrid.changeFieldControl("heading", "builtin", "singleLine", {
    helpText: "Grid section heading"
  });

  moduleGrid.changeFieldControl("subheading", "builtin", "multipleLine", {
    helpText: "Grid section subheading"
  });

  // 4. ModuleHero - Add heading/subheading fields
  const moduleHero = migration.editContentType("moduleHero");
  
  moduleHero
    .createField("heading")
    .name("Heading")
    .type("Symbol")
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  moduleHero
    .createField("subheading")
    .name("Subheading")
    .type("RichText")
    .localized(true)
    .required(false)
    .validations([
      {
        enabledMarks: ["bold", "italic", "underline"],
        message: "Only bold, italic, and underline formatting is allowed"
      },
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
          "embedded-asset-block",
          "hyperlink",
          "entry-hyperlink",
          "asset-hyperlink"
        ],
        message: "Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block embedded asset, link to Url, link to entry, and link to asset nodes are allowed"
      }
    ])
    .disabled(false)
    .omitted(false);

  // Configure field controls for ModuleHero
  moduleHero.changeFieldControl("heading", "builtin", "singleLine", {
    helpText: "Hero heading"
  });

  moduleHero.changeFieldControl("subheading", "builtin", "richTextEditor", {
    helpText: "Hero subheading with rich text formatting"
  });
};