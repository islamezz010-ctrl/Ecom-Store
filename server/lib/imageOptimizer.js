const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

/**
 * Image optimization settings
 */
const OPTIMIZATION_PRESETS = {
  thumbnail: {
    width: 200,
    height: 200,
    fit: "cover",
  },
  card: {
    width: 400,
    height: 400,
    fit: "cover",
  },
  hero: {
    width: 1200,
    height: 600,
    fit: "cover",
  },
  full: {
    width: 1920,
    height: 1080,
    fit: "cover",
  },
};

/**
 * Optimize a single image and save in multiple sizes
 * @param {string} inputPath - Path to original image
 * @param {string} outputDir - Directory to save optimized images
 * @param {string} filename - Base filename (without extension)
 * @returns {object} Object with paths to optimized images
 */
async function optimizeImage(inputPath, outputDir, filename) {
  try {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const results = {};
    const inputImage = sharp(inputPath);

    // Generate all preset sizes
    for (const [preset, options] of Object.entries(OPTIMIZATION_PRESETS)) {
      const outputPath = path.join(outputDir, `${filename}-${preset}.webp`);

      await inputImage
        .clone()
        .resize(options.width, options.height, {
          fit: options.fit,
          position: "center",
          withoutEnlargement: true,
        })
        .webp({ quality: 80 })
        .toFile(outputPath);

      results[preset] = outputPath;
      console.log(`✓ Created ${preset}: ${outputPath}`);
    }

    return results;
  } catch (error) {
    console.error(`Error optimizing image ${inputPath}:`, error);
    throw error;
  }
}

/**
 * Generate optimized srcset string for responsive images
 * @param {string} imageName - Image filename without extension
 * @param {string} baseUrl - Base URL for CDN or static files
 * @returns {string} srcset string for img tags
 */
function generateSrcSet(imageName, baseUrl = "/images") {
  const sizes = [
    { preset: "thumbnail", width: 200 },
    { preset: "card", width: 400 },
    { preset: "hero", width: 1200 },
    { preset: "full", width: 1920 },
  ];

  return sizes
    .map((size) => `${baseUrl}/${imageName}-${size.preset}.webp ${size.width}w`)
    .join(", ");
}

/**
 * Batch optimize all images in a directory
 * @param {string} inputDir - Directory containing original images
 * @param {string} outputDir - Directory to save optimized images
 */
async function optimizeDirectory(inputDir, outputDir) {
  try {
    const files = fs.readdirSync(inputDir);
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];

    const results = {};

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!imageExtensions.includes(ext)) continue;

      const filename = path.basename(file, ext);
      const inputPath = path.join(inputDir, file);

      console.log(`Processing: ${file}`);
      results[filename] = await optimizeImage(inputPath, outputDir, filename);
    }

    console.log(`\n✓ Optimized ${Object.keys(results).length} images`);
    return results;
  } catch (error) {
    console.error(`Error batch optimizing images:`, error);
    throw error;
  }
}

/**
 * Create a responsive image object for API responses
 * @param {string} imageName - Image name without extension
 * @param {string} cdnUrl - CDN base URL (e.g., 'https://cdn.example.com/images')
 * @returns {object} Image metadata for frontend
 */
function getResponsiveImageMetadata(imageName, cdnUrl = "/images") {
  return {
    srcset: generateSrcSet(imageName, cdnUrl),
    src: `${cdnUrl}/${imageName}-card.webp`,
    alt: imageName,
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  };
}

module.exports = {
  optimizeImage,
  optimizeDirectory,
  generateSrcSet,
  getResponsiveImageMetadata,
  OPTIMIZATION_PRESETS,
};
