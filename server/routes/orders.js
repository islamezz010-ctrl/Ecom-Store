// server/routes/orders.js
const express = require("express");
const { protect } = require("../middleware/auth");
const ctrl = require("../controllers/orderController");

const router = express.Router();

router.get("/", protect, ctrl.getMyOrders);
router.get("/:id", protect, ctrl.getOrderById);

module.exports = router;
