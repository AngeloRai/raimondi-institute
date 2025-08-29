#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");

// Migration groups in proper dependency order
const migrationGroups = [
  {
    name: "1. Base Types (Level 0) - No dependencies",
    migrations: [
      "create/20250825_create_link.js",
      "create/20250822_create_seo.js",
    ],
  },
  {
    name: "2. Base Types Updates (Level 0)",
    migrations: [
      "update/update_link.js",
      "update/update_seo.js",
    ],
  },
  {
    name: "3. Simple Components (Level 1) - Depend on base types",
    migrations: [
      "create/20250822_create_cta.js",
      "create/20250828_create_component_video_asset.js",
    ],
  },
  {
    name: "4. Simple Components Updates (Level 1)",
    migrations: [
      "update/update_cta.js",
      "update/update_component_video_asset.js",
    ],
  },
  {
    name: "5. Component Collections (Level 2) - Depend on CTA/Link",
    migrations: [
      "create/20250828_create_component_links.js",
      "create/20250824_create_card.js",
      "create/20250826_create_component_image_card.js",
      "create/20250824_create_testimonial.js",
    ],
  },
  {
    name: "6. Component Collections Updates (Level 2)",
    migrations: [
      "update/update_component_links.js",
      "update/update_component_card.js",
      "update/update_component_image_card.js",
      "update/update_component_testimonial.js",
    ],
  },
  {
    name: "7. Modules (Level 3) - Depend on components",
    migrations: [
      "create/20250826_create_module_contact_form.js",
      "create/20250828_create_rich_text_block.js",
      "create/20250822_create_module_image_text.js",
      "create/20250825_create_module_image_carousel.js",
      "create/20250824_create_module_grid.js",
      "create/20250822_create_hero.js",
    ],
  },
  {
    name: "8. Modules Updates (Level 3)",
    migrations: [
      "update/update_module_contact_form.js",
      "update/update_rich_text_block.js",
      "update/update_module_image_text.js",
      "update/update_module_image_carousel.js",
      "update/update_module_grid.js",
      "update/update_hero.js",
    ],
  },
  {
    name: "9. Layout Components (Level 4) - Depend on components",
    migrations: [
      "create/20250828_create_navbar.js",
      "create/20250828_create_footer.js",
    ],
  },
  {
    name: "10. Layout Components Updates (Level 4)",
    migrations: [
      "update/update_navbar.js",
      "update/update_footer.js",
    ],
  },
  {
    name: "11. Layout Wrapper (Level 5) - Depends on navbar/footer",
    migrations: [
      "create/20250828_create_layout.js",
    ],
  },
  {
    name: "12. Layout Wrapper Updates (Level 5)",
    migrations: [
      "update/update_layout.js",
    ],
  },
  {
    name: "13. Pages (Level 6) - Depend on all modules and components",
    migrations: [
      "create/20250822_create_page_cms.js",
    ],
  },
  {
    name: "14. Pages Updates (Level 6)",
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
        // Check if the error is just "no changes" or "already exists"
        if (errorOutput.includes("No changes detected") || 
            errorOutput.includes("already exists") ||
            output.includes("No changes detected") ||
            output.includes("already exists")) {
          console.log(`  ⚠️  Skipped (no changes): ${migrationFile}`);
          resolve({ success: true, output: errorOutput || output, migrationFile, skipped: true });
        } else {
          console.log(`  ❌ Failed: ${migrationFile}`);
          console.log(`     Error: ${errorOutput || output}`);
          reject({ success: false, error: errorOutput || output, migrationFile });
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
  console.log("=" .repeat(60));
  
  const results = [];
  
  for (const migration of group.migrations) {
    try {
      const result = await runMigration(migration);
      results.push(result);
      
      // Add small delay between migrations
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      results.push(error);
      
      // Log error but continue with next migration
      console.log(`  ⚠️  Error occurred, but continuing with next migration...`);
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
  console.log("\n" + "=".repeat(70));
  console.log("🎉 MIGRATION SUMMARY");
  console.log("=".repeat(70));
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
    console.log("Note: Some failures may be expected (e.g., trying to create content types that already exist)");
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