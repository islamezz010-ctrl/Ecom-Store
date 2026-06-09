// server/routes/admin/orders.js
const express = require("express");
const Joi = require("joi");
const validate = require("../../middleware/validate");
const { protect } = require("../../middleware/auth");
const requireAdmin = require("../../middleware/admin");
const ctrl = require("../../controllers/admin/orderController");

const router = express.Router();

const statusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "paid", "shipped", "delivered", "cancelled")
    .required(),
});

router.get("/", protect, requireAdmin, ctrl.getAllOrders);
router.put(
  "/:id/status",
  protect,
  requireAdmin,
  validate(statusSchema),
  ctrl.updateOrderStatus
);

module.exports = router;
