// server/controllers/webhookController.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/Order");
const Product = require("../models/Product");

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// ──────────────────────────────────────────────
// POST /api/webhook
// Stripe sends events here after payment events.
// The route must use express.raw() — NOT express.json().
// ──────────────────────────────────────────────
exports.handleStripeWebhook = async (req, res) => {
  let event;

  // ── 1. Verify signature ────────────────────
  if (endpointSecret) {
    const sig = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error("⚠️  Webhook signature verification failed:", err.message);
      return res.status(400).json({ message: `Webhook Error: ${err.message}` });
    }
  } else {
    // No secret configured — parse body directly (dev mode only)
    console.warn(
      "⚠️  STRIPE_WEBHOOK_SECRET not set — skipping signature verification"
    );
    event = req.body;
  }

  // ── 2. Handle event types ──────────────────
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      await handleCheckoutCompleted(session);
      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object;
      await handleCheckoutExpired(session);
      break;
    }

    default:
      // Unhandled event type — acknowledge it silently
      break;
  }

  // Always respond 200 so Stripe doesn't retry
  res.json({ received: true });
};

// ──────────────────────────────────────────────
// Handle successful payment
// ──────────────────────────────────────────────
async function handleCheckoutCompleted(session) {
  const order = await Order.findOne({ stripeSessionId: session.id });

  if (!order) {
    console.error(`Webhook: no order found for session ${session.id}`);
    return;
  }

  // Idempotent — skip if already paid
  if (order.status === "paid") {
    console.log(`Webhook: order ${order._id} already marked as paid`);
    return;
  }

  order.status = "paid";
  order.paidAt = new Date();
  await order.save();

  console.log(`✅ Order ${order._id} marked as paid via webhook`);
}

// ──────────────────────────────────────────────
// Handle expired checkout (release reserved stock)
// ──────────────────────────────────────────────
async function handleCheckoutExpired(session) {
  const order = await Order.findOne({ stripeSessionId: session.id });

  if (!order || order.status !== "pending") {
    return;
  }

  // Release reserved stock
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: item.quantity },
    });
  }

  order.status = "cancelled";
  await order.save();

  console.log(
    `⏰ Order ${order._id} cancelled — stock released (session expired)`
  );
}
