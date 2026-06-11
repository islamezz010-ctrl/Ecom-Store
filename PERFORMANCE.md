# Performance Optimization Guide

This document outlines the four performance optimizations implemented for production:

## 1. Redis API Response Caching

### Setup

Redis caching is **optional** but highly recommended for production.

#### Local Development (with Redis)

```bash
# Install Redis (Windows: use Windows Subsystem for Linux or Docker)
# Docker:
docker run -d -p 6379:6379 redis:alpine

# Set REDIS_URL in .env
REDIS_URL=redis://localhost:6379
```

#### Production (Render)

1. Add Redis database to your Render account
2. Copy the connection URL to your environment variables
3. Set `REDIS_URL` in Render's environment settings

### How It Works

- Product list queries are cached for **5 minutes** (300 seconds)
- Individual product details are cached for **10 minutes** (600 seconds)
- Cache is **automatically invalidated** when products are updated/deleted
- If Redis is unavailable, the app gracefully falls back to direct database queries
- Cache hits are indicated by `X-Cache: HIT` response header

### Usage

The caching middleware is already integrated into product routes:

```javascript
// GET /api/products — 5 min cache
// GET /api/products/:id — 10 min cache
```

To customize cache TTL, edit [server/routes/products.js](server/routes/products.js):

```javascript
// Change cache duration (in seconds)
cacheMiddleware(cacheKey, 300); // 5 minutes
cacheMiddleware(cacheKey, 600); // 10 minutes
```

To add caching to other endpoints:

```javascript
const { cacheMiddleware } = require("../middleware/cache");

router.get(
  "/endpoint",
  cacheMiddleware("unique-cache-key", 300),
  controller.method,
);
```

---

## 2. Image Optimization

### Overview

Product images are automatically optimized into **4 responsive sizes** using WebP format:

- **thumbnail** (200×200) — for cards in lists
- **card** (400×400) — for product cards
- **hero** (1200×600) — for hero sections
- **full** (1920×1080) — for full-screen displays

### Generate Optimized Images

```bash
# Install dependencies first
npm install --prefix server

# Optimize all images in public/images
npm run optimize:images --prefix server
```

**Output:** Optimized images are saved to `public/images/optimized/`

### Use Optimized Images

In your frontend, use the responsive image helper:

```javascript
import { getResponsiveImageMetadata } from "@/lib/imageOptimizer";

const imageMeta = getResponsiveImageMetadata("product-name", "https://cdn.example.com/images");

// Returns:
{
  srcset: "https://cdn.../product-name-thumbnail.webp 200w, ...",
  src: "https://cdn.../product-name-card.webp",
  alt: "product-name",
  sizes: "(max-width: 768px) 100vw, ..."
}
```

Use in HTML:

```html
<img
  srcset="{imageMeta.srcset}"
  src="{imageMeta.src}"
  sizes="{imageMeta.sizes}"
  alt="{imageMeta.alt}"
/>
```

### Benefits

✅ **50-70% smaller** file sizes (WebP compression)
✅ **Responsive** — browser picks best size
✅ **Fast loading** — optimized formats
✅ **Better SEO** — faster page load times

---

## 3. CDN for Static Assets

### Vite Configuration

The build process is optimized for CDN deployment:

```javascript
// vite.config.js
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor': ['react', 'react-dom', ...],
        'stripe': ['@stripe/stripe-js'],
        'oauth': ['@react-oauth/google'],
      }
    }
  },
  minify: 'terser',
  cssCodeSplit: true,
}
```

### Build for Production

```bash
npm run build
```

This generates:

- Code-split bundles in `dist/`
- Minified assets
- Optimal cache busting with hash filenames

### Deploy to CDN (Production)

**Option 1: Vercel (automatic CDN)**

- Files are automatically distributed to Vercel's global CDN
- No additional setup needed
- Set `VITE_CDN_URL` in Vercel environment (optional)

**Option 2: External CDN (CloudFront, Cloudflare, etc.)**

```bash
# Build files
npm run build

# Upload dist/ folder to your CDN
# Then set:
VITE_CDN_URL=https://cdn.example.com/
```

### Cache Headers

The server sets optimal cache headers:

```
Cache-Control: public, max-age=3600
X-Content-Type-Options: nosniff
```

Files are cached for **1 hour**, with automatic cache busting via hash filenames.

---

## 4. Database Indexing

### Implemented Indexes

Indexes have been added to **Product** and **User** models for frequently queried fields:

#### Product Model

```javascript
// Single field indexes
{ category: 1 }
{ name: 'text' }        // Text search index
{ stock: 1 }
{ createdAt: -1 }

// Compound indexes (for complex queries)
{ stock: 1, category: 1 }
{ price: 1, stock: 1 }
```

#### User Model

```javascript
{
  email: 1;
}
{
  googleId: 1;
}
{
  isAdmin: 1;
}
```

### Benefits

✅ **Faster queries** — 10-100x improvement
✅ **Reduced CPU usage** — no full collection scans
✅ **Better pagination** — compound indexes speed up sorted queries
✅ **Text search** — full-text search on product names

### Verify Indexes

In MongoDB Atlas or local MongoDB:

```bash
# Connect to MongoDB
mongosh

# Select database
use ecom-store

# View indexes on Product collection
db.products.getIndexes()

# View indexes on User collection
db.users.getIndexes()
```

---

## Performance Checklist

Before going to production:

- [ ] Install Redis (production database on Render)
- [ ] Set `REDIS_URL` in environment variables
- [ ] Run `npm run optimize:images` to generate responsive images
- [ ] Upload optimized images to CDN
- [ ] Set `VITE_CDN_URL` in Vercel environment
- [ ] Run `npm run build` and verify bundle sizes
- [ ] Test database queries with DevTools MongoDB Extension
- [ ] Monitor Redis cache hit rate in logs

---

## Monitoring

### Cache Performance

Look for `X-Cache` headers in browser DevTools:

```
X-Cache: HIT    → Served from Redis cache (fast ✅)
X-Cache: MISS   → Generated fresh from database (first load)
```

### Database Performance

Enable query logging in MongoDB:

```javascript
// Monitor slow queries
db.setProfilingLevel(1, { slowms: 100 });
```

### CDN Performance

Use browser DevTools to check:

- **Network tab** → check file sizes and load times
- **Application tab** → verify cache headers
- **Coverage tab** → identify unused code

---

## Troubleshooting

### Redis not connecting

```
⚠️ Redis disabled (no REDIS_URL set)
```

**Solution:** Set `REDIS_URL` or disable caching for development

### Images not optimized

```
# Ensure sharp is installed
npm install --prefix server

# Run optimization
npm run optimize:images --prefix server
```

### CDN files not loading

**Check:**

1. `VITE_CDN_URL` matches your actual CDN domain
2. CDN CORS headers allow your frontend origin
3. Files are actually uploaded to CDN

---

## Resources

- [Redis Documentation](https://redis.io/docs/)
- [Sharp Image Processing](https://sharp.pixelplumbing.com/)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [MongoDB Indexes](https://docs.mongodb.com/manual/indexes/)
