/*
  Contentful Migration: Update [Module] Grid to include Image Card components
  ID: moduleGrid
*/

module.exports = function (migration) {
  const grid = migration
    .editContentType("moduleGrid")
    .name("[Module] Grid")
    .description(
      "Grid layout to display a collection of component entries (cards, testimonials, image cards, etc.)"
    )
    .displayField("internalName");

  grid
    .editField("items")
    .name("Items")
    .type("Array")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: "Link",
      validations: [
        { linkContentType: ["componentCard", "componentTestimonial", "componentImageCard"] },
      ],
      linkType: "Entry",
    });

  grid.changeFieldControl("items", "builtin", "entryLinksEditor", {
    helpText:
      "Select entries (cards, testimonials, image cards, etc.) to include in the grid",
  });
};