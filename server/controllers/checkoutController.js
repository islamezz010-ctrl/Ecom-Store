// server/controllers/checkoutController.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Product = require("../models/Product");
const Order = require("../models/Order");
const { getLocationById, getShippingCost } = require("../data/locations");
const { withTransaction } = require("../lib/transactionHelper");

// ──────────────────────────────────────────────
// POST /api/checkout/session
// Creates a Stripe Checkout session and a pending Order.
// Stock is atomically reserved before redirecting to Stripe.
// ──────────────────────────────────────────────
exports.createCheckoutSession = async (req, res) => {
  const { items, location: locationInput, address } = req.body;

  // ── 1. Look up products ────────────────────
  const productIds = items.map((i) => i.id);
  const storeItems = await Product.find({ _id: { $in: productIds } });

  if (storeItems.length !== productIds.length) {
    const found = storeItems.map((p) => p._id.toString());
    const missing = productIds.filter((id) => !found.includes(id));
    return res
      .status(404)
      .json({ message: `Product(s) not found: ${missing.join(", ")}` });
  }

  // ── 2. Verify & reserve stock (atomic) ─────
  // ── 4. Build Stripe line items ─────────────
  // ── 5. Create pending Order ────────────────
  // All wrapped in transaction: if any step fails, all changes rollback
  let order;
  try {
    order = await withTransaction(async (session) => {
      // First, verify all items have sufficient stock
      const updatedProducts = [];
      for (const item of items) {
        const result = await Product.findOneAndUpdate(
          { _id: item.id, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity } },
          { new: true, session },
        );
        if (!result) {
          const prod = storeItems.find((p) => p._id.toString() === item.id);
          throw new Error(
            `Insufficient stock for "${prod?.name || item.id}". Requested ${item.quantity}, available ${prod?.stock ?? 0}.`,
          );
        }
        updatedProducts.push(result);
      }

      // Calculate totals
      const orderItems = items.map((item) => {
        const storeItem = storeItems.find((p) => p._id.toString() === item.id);
        return {
          product: storeItem._id,
          name: storeItem.name,
          price: storeItem.price,
          quantity: item.quantity,
          image: storeItem.image,
        };
      });

      const subtotal = orderItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0,
      );

      const deliveryLocation = locationInput
        ? getLocationById(locationInput.id)
        : getLocationById("cairo");
      const shippingCost = getShippingCost(deliveryLocation, subtotal);

      const total = subtotal + shippingCost;

      // Create order within transaction
      const [createdOrder] = await Order.create(
        [
          {
            user: req.user._id,
            items: orderItems,
            shippingAddress: address || undefined,
            shippingCost,
            subtotal,
            total,
            status: "pending",
          },
        ],
        { session },
      );

      return {
        order: createdOrder,
        orderItems,
        shippingCost,
        total,
        deliveryLocation,
      };
    });
  } catch (error) {
    // Transaction automatically rolled back if any operation fails
    if (error.message.includes("Insufficient stock")) {
      return res.status(409).json({ message: error.message });
    }
    throw error;
  }

  // ── 3. Calculate totals ────────────────────
  // ── 6. Create Stripe session ───────────────
  const clientUrl = (process.env.CLIENT_URL || "http://localhost:5173").replace(
    /\/$/,
    "",
  );

  const line_items = order.orderItems.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        images: item.image ? [item.image] : [],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  if (order.shippingCost > 0) {
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: `Shipping to ${order.deliveryLocation.name}`,
        },
        unit_amount: Math.round(order.shippingCost * 100),
      },
      quantity: 1,
    });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    customer_email: req.user.email,
    success_url: `${clientUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${clientUrl}/cart`,
    metadata: {
      orderId: order.order._id.toString(),
      deliveryCity:
        order.order.shippingAddress?.cityArea || order.deliveryLocation.name,
      deliveryGovernorate:
        order.order.shippingAddress?.governorate ||
        order.deliveryLocation.governorate,
    },
  });

  // Save the Stripe session ID to the order
  order.order.stripeSessionId = session.id;
  await order.order.save();

  res.json({ url: session.url });
};
