// server/index.js — Application bootstrap
// All business logic lives in controllers/ and routes/.
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// ── Route modules ────────────────────────────
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const checkoutRoutes = require("./routes/checkout");
const webhookRoutes = require("./routes/webhook");
const orderRoutes = require("./routes/orders");
const addressRoutes = require("./routes/addresses");
const adminProductRoutes = require("./routes/admin/products");
const adminOrderRoutes = require("./routes/admin/orders");

// ── Validate required env vars ───────────────
const required = ["JWT_SECRET", "MONGO_URI", "STRIPE_SECRET_KEY"];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`FATAL: ${key} environment variable is not set.`);
    process.exit(1);
  }
}

const app = express();

// ── CORS ─────────────────────────────────────
const allowedOrigins = (
  process.env.CORS_ORIGIN || "http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""));

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ── Webhook route MUST come before express.json() ──
// Stripe requires the raw body for signature verification.
app.use("/api/webhook", webhookRoutes);

// ── Common middleware ────────────────────────
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Request logging
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// ── Health check ─────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// ── API routes ───────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes);

// ── Admin routes ─────────────────────────────
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// ── Backward compatibility (old checkout path) ──
// Remove this once the frontend is updated
app.post("/create-checkout-session", (req, res, next) => {
  req.url = "/api/checkout/session";
  app.handle(req, res, next);
});

// ── Global error handler (must be last) ──────
app.use(errorHandler);

// ── Start server ─────────────────────────────
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(
        `   Environment: ${process.env.NODE_ENV || "development"}`
      );
    });
  });
}

// ── Graceful shutdown ────────────────────────
const shutdown = (signal) => {
  console.log(`\n${signal} received — shutting down gracefully…`);
  process.exit(0);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

module.exports = app; // Exported for testing with supertest
