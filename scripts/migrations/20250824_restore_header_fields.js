/*
  Contentful Migration: Restore header/subheader fields
  This restores the original fields that were accidentally removed
  Run via contentful-migration CLI.
*/

module.exports = function (migration) {
  
  // 1. ComponentCard - Restore header/subheader fields
  const componentCard = migration.editContentType("componentCard");
  
  componentCard
    .createField("header")
    .name("Header")
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
    .createField("subheader")
    .name("Subheader")
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

  // Move header field after internalName
  componentCard.moveField("header").afterField("internalName");
  componentCard.moveField("subheader").afterField("header");

  // 2. ModuleImageText - Restore header/subheader fields
  const moduleImageText = migration.editContentType("moduleImageText");
  
  moduleImageText
    .createField("header")
    .name("Header")
    .type("Symbol")
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  moduleImageText
    .createField("subheader")
    .name("Subheader")
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

  // Move fields after internalName
  moduleImageText.moveField("header").afterField("internalName");
  moduleImageText.moveField("subheader").afterField("header");

  // 3. ModuleGrid - Restore header/subheader fields
  const moduleGrid = migration.editContentType("moduleGrid");
  
  moduleGrid
    .createField("header")
    .name("Header")
    .type("Symbol")
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  moduleGrid
    .createField("subheader")
    .name("Subheader")
    .type("Text")
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  // Move fields after internalName
  moduleGrid.moveField("header").afterField("internalName");
  moduleGrid.moveField("subheader").afterField("header");

  // 4. ModuleHero - Restore header/subheader fields
  const moduleHero = migration.editContentType("moduleHero");
  
  moduleHero
    .createField("header")
    .name("Header")
    .type("Symbol")
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  moduleHero
    .createField("subheader")
    .name("Subheader")
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

  // Move fields after internalName
  moduleHero.moveField("header").afterField("internalName");
  moduleHero.moveField("subheader").afterField("header");
};