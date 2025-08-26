/*
  Contentful Migration: Remove old header/subheader fields
  WARNING: Only run this AFTER manually copying content from header/subheader to heading/subheading
  Run via contentful-migration CLI.
*/

module.exports = function (migration) {
  
  // 1. ComponentCard - Remove header/subheader fields
  const componentCard = migration.editContentType("componentCard");
  componentCard.deleteField("header");
  componentCard.deleteField("subheader");

  // 2. ModuleImageText - Remove header/subheader fields  
  const moduleImageText = migration.editContentType("moduleImageText");
  moduleImageText.deleteField("header");
  moduleImageText.deleteField("subheader");

  // 3. ModuleGrid - Remove header/subheader fields
  const moduleGrid = migration.editContentType("moduleGrid");
  moduleGrid.deleteField("header");
  moduleGrid.deleteField("subheader");

  // 4. ModuleHero - Remove header/subheader fields
  const moduleHero = migration.editContentType("moduleHero");
  moduleHero.deleteField("header");
  moduleHero.deleteField("subheader");
};