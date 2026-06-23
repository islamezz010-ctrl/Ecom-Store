// server/routes/admin/users.js
const express = require("express");
const Joi = require("joi");
const validate = require("../../middleware/validate");
const { protect } = require("../../middleware/auth");
const requireAdmin = require("../../middleware/admin");
const ctrl = require("../../controllers/admin/userController");

const router = express.Router();

// GET /api/admin/users - Get all users with pagination
router.get("/", protect, requireAdmin, ctrl.getAllUsers);

// GET /api/admin/users/:id - Get specific user details
router.get("/:id", protect, requireAdmin, ctrl.getUserDetails);

// PUT /api/admin/users/:id/role - Update user's admin role
const roleSchema = Joi.object({
  isAdmin: Joi.boolean().required(),
});
router.put(
  "/:id/role",
  protect,
  requireAdmin,
  validate(roleSchema),
  ctrl.updateUserRole,
);

// DELETE /api/admin/users/:id - Delete a user
router.delete("/:id", protect, requireAdmin, ctrl.deleteUser);

// GET /api/admin/users/reports/customer-segments - Customer segmentation
router.get(
  "/reports/customer-segments",
  protect,
  requireAdmin,
  ctrl.getCustomerSegments,
);

module.exports = router;
