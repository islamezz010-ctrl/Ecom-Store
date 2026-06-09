// server/routes/webhook.js
const express = require("express");
const ctrl = require("../controllers/webhookController");

const router = express.Router();

// IMPORTANT: Stripe webhooks require the RAW body for signature verification.
// This route must be mounted BEFORE express.json() in index.js,
// or use express.raw() specifically for this path.
router.post(
  "/",
  express.raw({ type: "application/json" }),
  ctrl.handleStripeWebhook
);

module.exports = router;
