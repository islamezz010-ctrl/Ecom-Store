// server/routes/admin/products.js
const express = require("express");
const Joi = require("joi");
const validate = require("../../middleware/validate");
const { protect } = require("../../middleware/auth");
const requireAdmin = require("../../middleware/admin");
const ctrl = require("../../controllers/admin/productController");

const router = express.Router();

const productSchema = Joi.object({
  name: Joi.string().trim().required(),
  price: Joi.number().positive().required(),
  description: Joi.string().allow("").optional(),
  image: Joi.string().uri().allow("").optional(),
  category: Joi.string().trim().optional(),
  stock: Joi.number().integer().min(0).default(1),
});

const updateSchema = Joi.object({
  name: Joi.string().trim().optional(),
  price: Joi.number().positive().optional(),
  description: Joi.string().allow("").optional(),
  image: Joi.string().uri().allow("").optional(),
  category: Joi.string().trim().optional(),
  stock: Joi.number().integer().min(0).optional(),
}).min(1); // at least one field

router.post("/", protect, requireAdmin, validate(productSchema), ctrl.createProduct);
router.put("/:id", protect, requireAdmin, validate(updateSchema), ctrl.updateProduct);
router.delete("/:id", protect, requireAdmin, ctrl.deleteProduct);

module.exports = router;
