const redis = require("redis");

// Initialize Redis client (optional, only if REDIS_URL is set)
let redisClient = null;

if (process.env.REDIS_URL) {
  redisClient = redis.createClient({
    url: process.env.REDIS_URL,
    socket: {
      reconnectStrategy: (retries) => Math.min(retries * 50, 500),
    },
  });

  redisClient.on("error", (err) => {
    console.warn("Redis error:", err);
    redisClient = null; // Disable caching if Redis fails
  });

  redisClient.on("connect", () => {
    console.log("Redis connected");
  });

  redisClient.connect().catch((err) => {
    console.warn("Failed to connect to Redis:", err);
    redisClient = null;
  });
}

/**
 * Cache middleware: Check cache before executing controller
 * Usage: app.get('/api/products', cache('products:all', 300), controller);
 * @param {string} key - Cache key
 * @param {number} ttl - Time to live in seconds
 */
const cacheMiddleware = (key, ttl = 300) => {
  return async (req, res, next) => {
    if (!redisClient) {
      return next(); // Skip caching if Redis not available
    }

    try {
      const cached = await redisClient.get(key);
      if (cached) {
        console.log(`Cache hit: ${key}`);
        res.set("X-Cache", "HIT");
        return res.json(JSON.parse(cached));
      }
    } catch (err) {
      console.warn(`Cache get error for ${key}:`, err);
    }

    // Store original json method
    const originalJson = res.json.bind(res);

    // Override json method to cache response
    res.json = function (data) {
      if (!redisClient) {
        return originalJson(data);
      }

      try {
        redisClient.setEx(key, ttl, JSON.stringify(data)).catch((err) => {
          console.warn(`Cache set error for ${key}:`, err);
        });
        res.set("X-Cache", "MISS");
      } catch (err) {
        console.warn(`Error caching response for ${key}:`, err);
      }

      return originalJson(data);
    };

    next();
  };
};

/**
 * Invalidate cache pattern
 * Usage: await invalidateCache('products:*');
 * @param {string} pattern - Pattern to invalidate (supports wildcards)
 */
const invalidateCache = async (pattern) => {
  if (!redisClient) return;

  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`Invalidated ${keys.length} cache keys matching ${pattern}`);
    }
  } catch (err) {
    console.warn(`Cache invalidation error for ${pattern}:`, err);
  }
};

/**
 * Invalidate single cache key
 * @param {string} key - Cache key to invalidate
 */
const invalidateCacheKey = async (key) => {
  if (!redisClient) return;

  try {
    await redisClient.del(key);
    console.log(`Invalidated cache key: ${key}`);
  } catch (err) {
    console.warn(`Cache invalidation error for ${key}:`, err);
  }
};

/**
 * Get Redis client (useful for custom caching logic)
 */
const getRedisClient = () => redisClient;

/**
 * Check if Redis is connected
 */
const isRedisConnected = () => redisClient !== null;

module.exports = {
  cacheMiddleware,
  invalidateCache,
  invalidateCacheKey,
  getRedisClient,
  isRedisConnected,
};
