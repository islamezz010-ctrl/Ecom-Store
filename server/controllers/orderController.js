// server/controllers/orderController.js
const Order = require("../models/Order");

// ──────────────────────────────────────────────
// GET /api/orders
// Returns the authenticated user's orders (newest first)
// ──────────────────────────────────────────────
exports.getMyOrders = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Order.countDocuments({ user: req.user._id }),
  ]);

  res.json({
    orders,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
};

// ──────────────────────────────────────────────
// GET /api/orders/:id
// Returns a single order (owner-only)
// ──────────────────────────────────────────────
exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).lean();

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Only the order owner or an admin can view it
  if (
    order.user.toString() !== req.user._id.toString() &&
    !req.user.isAdmin
  ) {
    return res.status(403).json({ message: "Not authorized to view this order" });
  }

  res.json(order);
};
