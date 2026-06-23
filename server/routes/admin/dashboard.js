// server/routes/admin/dashboard.js
const express = require("express");
const { protect } = require("../../middleware/auth");
const requireAdmin = require("../../middleware/admin");
const ctrl = require("../../controllers/admin/dashboardController");

const router = express.Router();

// GET /api/admin/dashboard/stats - Dashboard overview statistics
router.get("/stats", protect, requireAdmin, ctrl.getDashboardStats);

// GET /api/admin/dashboard/sales - Sales analytics for specified period
router.get("/sales", protect, requireAdmin, ctrl.getSalesAnalytics);

// GET /api/admin/dashboard/top-products - Best-selling products
router.get("/top-products", protect, requireAdmin, ctrl.getTopProducts);

// GET /api/admin/dashboard/inventory-summary - Inventory summary
router.get(
  "/inventory-summary",
  protect,
  requireAdmin,
  ctrl.getInventorySummary,
);

module.exports = router;
