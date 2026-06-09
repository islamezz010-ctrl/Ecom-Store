// server/controllers/admin/productController.js
const Product = require("../../models/Product");

// ──────────────────────────────────────────────
// POST /api/admin/products
// ──────────────────────────────────────────────
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

// ──────────────────────────────────────────────
// PUT /api/admin/products/:id
// ──────────────────────────────────────────────
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

// ──────────────────────────────────────────────
// DELETE /api/admin/products/:id
// Soft-delete by setting stock to 0
// ──────────────────────────────────────────────
exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { stock: 0 },
    { new: true }
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ message: "Product removed from storefront", product });
};
