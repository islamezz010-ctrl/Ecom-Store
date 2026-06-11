/**
 * Image optimization script
 * Run with: npm run optimize:images
 */
const path = require("path");
const { optimizeDirectory } = require("../lib/imageOptimizer");

const inputDir = path.join(__dirname, "../public/images");
const outputDir = path.join(__dirname, "../public/images/optimized");

async function main() {
  console.log("🖼️  Starting image optimization...\n");
  try {
    await optimizeDirectory(inputDir, outputDir);
    console.log("\n✅ Image optimization complete!");
    console.log(`Output: ${outputDir}`);
  } catch (error) {
    console.error("❌ Image optimization failed:", error);
    process.exit(1);
  }
}

main();
