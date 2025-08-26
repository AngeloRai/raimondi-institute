/*
  Contentful Migration: Create [Page] CMS content type
  ID: pageCms
*/

module.exports = function (migration) {
  const page = migration
    .createContentType("pageCms")
    .name("[Page] CMS")
    .description("")
    .displayField("internalName");

  page
    .createField("internalName")
    .name("Internal Name")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  page
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  // Array of references to entries (many references)
  page
    .createField("contentModules")
    .name("Content Modules")
    .type("Array")
    .items({ type: "Link", linkType: "Entry", validations: [] })
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
};
