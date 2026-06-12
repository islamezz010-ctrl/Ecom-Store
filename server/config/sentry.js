/**
 * Sentry Configuration
 * Error tracking and monitoring service
 *
 * Sentry captures unhandled exceptions, errors, and performance issues
 * in production and sends them to sentry.io for analysis.
 */

const Sentry = require("sentry-node");

/**
 * Initialize Sentry error tracking
 */
const initSentry = (app) => {
  // Only initialize in production or if SENTRY_DSN is explicitly set
  if (!process.env.SENTRY_DSN) {
    console.log("⚠️  Sentry not configured (SENTRY_DSN not set)");
    return;
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || "development",
    integrations: [
      // Express integration for automatic middleware wrapping
      new Sentry.Integrations.Express({
        app: true,
        request: true,
        serverName: true,
        transaction: true,
        user: true,
        ip: true,
      }),
    ],
    // Performance monitoring: sample 10% of transactions in production
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    // Release tracking (optional, for better grouping)
    release: process.env.APP_VERSION || "1.0.0",
    // Environment-specific options
    ...(process.env.NODE_ENV === "production" && {
      // In production, don't send personally identifiable info
      denyUrls: [/health/, /metrics/],
      maxBreadcrumbs: 50,
    }),
  });

  // Middleware to track request context
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.errorHandler());

  console.log("✅ Sentry initialized");
};

/**
 * Capture an exception with context
 */
const captureException = (error, context = {}) => {
  if (!process.env.SENTRY_DSN) return;

  Sentry.captureException(error, {
    contexts: {
      custom: context,
    },
  });
};

/**
 * Capture a message
 */
const captureMessage = (message, level = "info", context = {}) => {
  if (!process.env.SENTRY_DSN) return;

  Sentry.captureMessage(message, level, {
    contexts: {
      custom: context,
    },
  });
};

/**
 * Set user context for error tracking
 */
const setUserContext = (userId, email = null) => {
  if (!process.env.SENTRY_DSN) return;

  Sentry.setUser({
    id: userId,
    email: email,
  });
};

/**
 * Clear user context
 */
const clearUserContext = () => {
  if (!process.env.SENTRY_DSN) return;

  Sentry.setUser(null);
};

/**
 * Add breadcrumb for debugging
 */
const addBreadcrumb = (message, category = "info", data = {}) => {
  if (!process.env.SENTRY_DSN) return;

  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level: "info",
  });
};

/**
 * Flush pending events to Sentry
 * Call before server shutdown
 */
const flush = async (timeout = 2000) => {
  if (!process.env.SENTRY_DSN) return;

  return Sentry.close(timeout);
};

module.exports = {
  initSentry,
  captureException,
  captureMessage,
  setUserContext,
  clearUserContext,
  addBreadcrumb,
  flush,
  Sentry,
};
