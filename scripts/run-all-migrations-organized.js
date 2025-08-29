#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");

// Migration groups organized by content type
const migrationGroups = [
  {
    name: "1. Base Components - Create",
    migrations: [
      "create/20250822_create_cta.js",
      "create/20250822_create_seo.js", 
      "create/20250825_create_link.js",
      "create/20250828_create_component_links.js",
      "create/20250828_create_component_video_asset.js",
    ],
  },
  {
    name: "2. Base Components - Update", 
    migrations: [
      "update/update_cta.js",
      "update/update_seo.js",
      "update/update_link.js",
      "update/update_component_links.js",
      "update/update_component_video_asset.js",
    ],
  },
  {
    name: "3. Content Components - Create",
    migrations: [
      "create/20250824_create_card.js",
      "create/20250826_create_component_image_card.js", 
      "create/20250824_create_testimonial.js",
    ],
  },
  {
    name: "4. Content Components - Update",
    migrations: [
      "update/update_component_card.js",
      "update/update_component_image_card.js",
      "update/update_component_testimonial.js",
    ],
  },
  {
    name: "5. Layout Components - Create",
    migrations: [
      "create/20250828_create_navbar.js",
      "create/20250828_create_footer.js",
      "create/20250828_create_layout.js",
    ],
  },
  {
    name: "6. Layout Components - Update",
    migrations: [
      "update/update_navbar.js",
      "update/update_footer.js",
      "update/update_layout.js",
    ],
  },
  {
    name: "7. Modules - Create",
    migrations: [
      "create/20250822_create_hero.js",
      "create/20250822_create_module_image_text.js",
      "create/20250824_create_module_grid.js",
      "create/20250825_create_module_image_carousel.js",
      "create/20250826_create_module_contact_form.js",
      "create/20250828_create_rich_text_block.js",
    ],
  },
  {
    name: "8. Modules - Update",
    migrations: [
      "update/update_hero.js",
      "update/update_module_image_text.js",
      "update/update_module_grid.js",
      "update/update_module_image_carousel.js",
      "update/update_module_contact_form.js",
      "update/update_rich_text_block.js",
    ],
  },
  {
    name: "9. Pages - Create",
    migrations: [
      "create/20250822_create_page_cms.js",
    ],
  },
  {
    name: "10. Pages - Update",
    migrations: [
      "update/update_page_cms.js",
    ],
  },
];

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT_ID || "master";
const managementToken = process.env.CONTENTFUL_MANAGEMENT_API_TOKEN;

if (!spaceId || !managementToken) {
  console.error("❌ Missing required environment variables:");
  if (!spaceId) console.error("  - CONTENTFUL_SPACE_ID");
  if (!managementToken) console.error("  - CONTENTFUL_MANAGEMENT_API_TOKEN");
  console.error("\nPlease set these variables in your .env file");
  process.exit(1);
}

console.log("🚀 Starting Contentful migrations...");
console.log(`Space: ${spaceId}`);
console.log(`Environment: ${environmentId}`);
console.log("");

async function runMigration(migrationFile) {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(__dirname, "migrations", migrationFile);
    
    console.log(`  📝 Running: ${migrationFile}`);
    
    const args = [
      "--space-id", spaceId,
      "--environment-id", environmentId, 
      "--access-token", managementToken,
      "--yes",
      fullPath
    ];

    const child = spawn("contentful-migration", args, { 
      stdio: "pipe"
    });

    let output = "";
    let errorOutput = "";

    child.stdout.on("data", (data) => {
      output += data.toString();
    });

    child.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    child.on("close", (code) => {
      if (code === 0) {
        console.log(`  ✅ Success: ${migrationFile}`);
        resolve({ success: true, output, migrationFile });
      } else {
        // Check if the error is just "no changes" 
        if (errorOutput.includes("No changes detected") || errorOutput.includes("already exists")) {
          console.log(`  ⚠️  Skipped (no changes): ${migrationFile}`);
          resolve({ success: true, output: errorOutput, migrationFile, skipped: true });
        } else {
          console.log(`  ❌ Failed: ${migrationFile}`);
          console.log(`     Error: ${errorOutput}`);
          reject({ success: false, error: errorOutput, migrationFile });
        }
      }
    });

    child.on("error", (error) => {
      console.log(`  ❌ Failed to start: ${migrationFile}`);
      console.log(`     Error: ${error.message}`);
      reject({ success: false, error: error.message, migrationFile });
    });
  });
}

async function runMigrationGroup(group) {
  console.log(`\n🔄 ${group.name}`);
  console.log("=" .repeat(50));
  
  const results = [];
  
  for (const migration of group.migrations) {
    try {
      const result = await runMigration(migration);
      results.push(result);
      
      // Add small delay between migrations
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      results.push(error);
      
      // Continue with next migration even if one fails
      console.log(`  ⚠️  Continuing with next migration...`);
    }
  }
  
  return results;
}

async function main() {
  const allResults = [];
  let totalSuccess = 0;
  let totalSkipped = 0; 
  let totalFailed = 0;
  
  for (const group of migrationGroups) {
    try {
      const groupResults = await runMigrationGroup(group);
      allResults.push(...groupResults);
      
      // Count results
      groupResults.forEach(result => {
        if (result.success) {
          if (result.skipped) {
            totalSkipped++;
          } else {
            totalSuccess++;
          }
        } else {
          totalFailed++;
        }
      });
      
    } catch (error) {
      console.error(`❌ Group failed: ${group.name}`, error);
      totalFailed++;
    }
  }
  
  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("🎉 MIGRATION SUMMARY");
  console.log("=".repeat(60));
  console.log(`✅ Successful: ${totalSuccess}`);
  console.log(`⚠️  Skipped: ${totalSkipped}`);
  console.log(`❌ Failed: ${totalFailed}`);
  console.log(`📊 Total: ${totalSuccess + totalSkipped + totalFailed}`);
  
  if (totalFailed === 0) {
    console.log("\n🎉 All migrations completed successfully!");
    console.log("🔄 Running codegen to update TypeScript types...");
    
    // Run codegen
    try {
      await new Promise((resolve, reject) => {
        const child = spawn("node", ["scripts/generate-types.js"], { 
          stdio: "inherit"
        });
        child.on("close", (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(`Codegen failed with code ${code}`));
          }
        });
      });
      console.log("✅ TypeScript types updated!");
    } catch (error) {
      console.error("❌ Failed to run codegen:", error.message);
    }
  } else {
    console.log(`\n⚠️  ${totalFailed} migration(s) failed. Please review the errors above.`);
    process.exit(1);
  }
}

// Handle process interruption
process.on("SIGINT", () => {
  console.log("\n\n⚠️  Migration interrupted by user");
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("\n\n⚠️  Migration terminated");
  process.exit(1);
});

main().catch(error => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});