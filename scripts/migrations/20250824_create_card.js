/*
  Contentful Migration: Create [Component] Card content type
  Run via contentful-migration CLI.
*/

module.exports = function (migration) {
  const card = migration
    .createContentType("componentCard")
    .name("[Component] Card")
    .description("Card component for displaying content with icon, title, and CTA")
    .displayField("internalName");

  card
    .createField("internalName")
    .name("Internal Name")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  card
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

  card
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

  card
    .createField("icon")
    .name("Icon")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      { 
        in: ["music", "craftsman", "service", "heart", "piano", "grandPiano", "playingPiano"] 
      }
    ])
    .defaultValue({ "en-US": "music" })
    .disabled(false)
    .omitted(false);

  card
    .createField("backgroundColor")
    .name("Background Color")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([
      { 
        in: ["white", "light", "dark"] 
      }
    ])
    .defaultValue({ "en-US": "white" })
    .disabled(false)
    .omitted(false);

  card
    .createField("cta")
    .name("CTA")
    .type("Link")
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ["componentCta"]
      }
    ])
    .linkType("Entry")
    .disabled(false)
    .omitted(false);

  card.changeFieldControl("internalName", "builtin", "singleLine", {
    helpText: "Used internally to identify this card"
  });

  card.changeFieldControl("header", "builtin", "singleLine", {
    helpText: "Card header displayed prominently"
  });

  card.changeFieldControl("subheader", "builtin", "multipleLine", {
    helpText: "Card subheader/description text (max 500 characters)"
  });

  card.changeFieldControl("icon", "builtin", "dropdown", {
    helpText: "Select the icon to display in the card"
  });

  card.changeFieldControl("backgroundColor", "builtin", "dropdown", {
    helpText: "Background color for the card"
  });

  card.changeFieldControl("cta", "builtin", "entryLinkEditor", {
    helpText: "Optional CTA button for the card"
  });
};