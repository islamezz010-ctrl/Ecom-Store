import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Build optimization
  build: {
    // Rollup options for code splitting
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react-router-dom")
          ) {
            return "vendor";
          }
          if (id.includes("@stripe/stripe-js")) {
            return "stripe";
          }
          if (id.includes("@react-oauth/google")) {
            return "oauth";
          }
        },
      },
    },
    // Minify and optimize
    // Set asset size limit for warnings
    assetsInlineLimit: 4096,
    // Enable CSS code splitting
    cssCodeSplit: true,
  },

  // Optimize static assets for CDN
  server: {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  },

  // Assets configuration
  assetsInclude: ["**/*.jpg", "**/*.jpeg", "**/*.png", "**/*.gif", "**/*.webp"],

  // Public directory base for CDN
  // Change to your CDN URL in production:
  // base: 'https://cdn.example.com/'
  base: process.env.VITE_CDN_URL || "/",
});
