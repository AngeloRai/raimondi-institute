/*
  Contentful Migration: Update [Page] CMS to include Contact Form module
  ID: pageCms
*/

module.exports = function (migration) {
  const page = migration
    .editContentType("pageCms")
    .name("[Page] CMS")
    .description("CMS page with various content modules including contact form")
    .displayField("internalName");

  page
    .editField("contentModules")
    .name("Content Modules")
    .type("Array")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: "Link",
      validations: [
        { 
          linkContentType: [
            "moduleHero", 
            "moduleImageText", 
            "moduleGrid", 
            "moduleImageCarousel", 
            "moduleContactForm",
            "richTextBlock"
          ] 
        }
      ],
      linkType: "Entry",
    });

  page.changeFieldControl("contentModules", "builtin", "entryLinksEditor", {
    helpText: "Select content modules to include on this page (hero, image text, grid, carousel, contact form, rich text, etc.)"
  });
};