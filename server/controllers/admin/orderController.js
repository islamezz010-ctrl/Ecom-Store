// server/controllers/admin/orderController.js
const Order = require("../../models/Order");

// ──────────────────────────────────────────────
// GET /api/admin/orders
// All orders with pagination and optional filters
// ──────────────────────────────────────────────
exports.getAllOrders = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit, 10) || 20),
    );
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.user) {
      filter.user = req.query.user;
    }
    if (req.query.search) {
      filter.$or = [
        { stripeSessionId: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate("user", "name email picture")
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ──────────────────────────────────────────────
// GET /api/admin/orders/:id
// Get order details
// ──────────────────────────────────────────────
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email picture address",
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ──────────────────────────────────────────────
// PUT /api/admin/orders/:id/status
// Update an order's status
// ──────────────────────────────────────────────
exports.updateOrderStatus = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ──────────────────────────────────────────────
// PUT /api/admin/orders/:id/shipping-address
// Update shipping address
// ──────────────────────────────────────────────
exports.updateShippingAddress = async (req, res) => {
  try {
    const { address, city, state, zipcode, country } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          shippingAddress: { address, city, state, zipcode, country },
        },
      },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Shipping address updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ──────────────────────────────────────────────
// DELETE /api/admin/orders/:id
// Cancel an order (soft delete)
// ──────────────────────────────────────────────
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "delivered" || order.status === "cancelled") {
      return res.status(400).json({
        message: `Cannot cancel an order with status: ${order.status}`,
      });
    }

    order.status = "cancelled";
    await order.save();

    res.json({ message: "Order cancelled successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ──────────────────────────────────────────────
// GET /api/admin/orders/stats/summary
// Get order statistics
// ──────────────────────────────────────────────
exports.getOrderStats = async (req, res) => {
  try {
    const [statusBreakdown, totalValue, avgValue] = await Promise.all([
      Order.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Order.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }]),
      Order.aggregate([{ $group: { _id: null, avg: { $avg: "$total" } } }]),
    ]);

    const breakdown = {};
    statusBreakdown.forEach((item) => {
      breakdown[item._id] = item.count;
    });

    res.json({
      statusBreakdown: breakdown,
      totalValue: totalValue[0]?.total || 0,
      avgOrderValue: avgValue[0]?.avg || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
