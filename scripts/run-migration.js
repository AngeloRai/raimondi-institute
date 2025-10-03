#!/usr/bin/env node
/* eslint-disable */
const { spawnSync } = require("child_process");

const env = process.env;
const space = env.CONTENTFUL_SPACE_ID;
const envId =
  env.CONTENTFUL_ENVIRONMENT_ID || env.CONTENTFUL_ENVIRONMENT || "master";
const token = env.CONTENTFUL_MANAGEMENT_API_TOKEN;

if (!space) {
  console.error("Missing CONTENTFUL_SPACE_ID");
  process.exit(1);
}
if (!token) {
  console.error(
    "Missing CONTENTFUL_MANAGEMENT_TOKEN or CONTENTFUL_MANAGEMENT_API_TOKEN"
  );
  process.exit(1);
}

// Allow explicit file via arg or MIGRATION_FILE env var; else try update then create.
const explicit = process.argv[2] || env.MIGRATION_FILE;
const files = explicit
  ? [explicit]
  : [
      "scripts/migrations/create/create_cta.js",
      "scripts/migrations/create/create_card.js",
      "scripts/migrations/create/create_testimonial.js",
      "scripts/migrations/update/add_heading_subheading.js",
    ];

let lastStatus = 1;
for (const file of files) {
  const args = [
    "--space-id",
    space,
    "--environment-id",
    envId,
    "--access-token",
    token,
    "--yes",
    file,
  ];
  const result = spawnSync("contentful-migration", args, { stdio: "inherit" });
  lastStatus = result.status || 0;
  if (lastStatus === 0) {
    process.exit(0);
  }
}
process.exit(lastStatus);
