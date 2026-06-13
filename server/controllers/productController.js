// server/controllers/productController.js
const Product = require("../models/Product");

// ──────────────────────────────────────────────
// GET /api/products
// ──────────────────────────────────────────────
exports.getProducts = async (req, res) => {
  const { category, search, sort, limit, page, minPrice, maxPrice } = req.query;

  const filter = { stock: { $gt: 0 } };

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
    if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
  }

  // Sorting
  let sortOption = { createdAt: -1 };
  if (sort === "price_asc") sortOption = { price: 1 };
  else if (sort === "price_desc") sortOption = { price: -1 };
  else if (sort === "name") sortOption = { name: 1 };

  // Return raw array directly if page or limit query parameters are not provided
  // to maintain backward compatibility with the frontend
  if (!page && !limit) {
    const products = await Product.find(filter).sort(sortOption);
    return res.json(products);
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
  const skip = (pageNum - 1) * pageSize;

  const [products, total] = await Promise.all([
    Product.find(filter).sort(sortOption).skip(skip).limit(pageSize),
    Product.countDocuments(filter),
  ]);

  res.json({
    products,
    page: pageNum,
    pages: Math.ceil(total / pageSize),
    total,
  });
};

// ──────────────────────────────────────────────
// GET /api/products/:id
// ──────────────────────────────────────────────
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
};

// ──────────────────────────────────────────────
// GET /api/products/categories
// ──────────────────────────────────────────────
exports.getCategories = async (req, res) => {
  const categories = await Product.distinct("category");
  res.json(categories.filter(Boolean)); // remove null/undefined
};
