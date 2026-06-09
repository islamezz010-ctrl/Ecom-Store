// server/controllers/admin/orderController.js
const Order = require("../../models/Order");

// ──────────────────────────────────────────────
// GET /api/admin/orders
// All orders with pagination and optional filters
// ──────────────────────────────────────────────
exports.getAllOrders = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }
  if (req.query.user) {
    filter.user = req.query.user;
  }

  const [orders, total] = await Promise.all([
    Order.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Order.countDocuments(filter),
  ]);

  res.json({
    orders,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
};

// ──────────────────────────────────────────────
// PUT /api/admin/orders/:id/status
// Update an order's status
// ──────────────────────────────────────────────
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Validate status transitions
  const validTransitions = {
    pending: ["paid", "cancelled"],
    paid: ["shipped", "cancelled"],
    shipped: ["delivered"],
    delivered: [],
    cancelled: [],
  };

  const allowed = validTransitions[order.status] || [];
  if (!allowed.includes(status)) {
    return res.status(400).json({
      message: `Cannot transition from "${order.status}" to "${status}". Allowed: ${allowed.join(", ") || "none"}`,
    });
  }

  order.status = status;
  if (status === "paid" && !order.paidAt) {
    order.paidAt = new Date();
  }
  await order.save();

  res.json(order);
};
