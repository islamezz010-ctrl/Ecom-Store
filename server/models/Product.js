const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    image: String,
    category: String,
    stock: { type: Number, default: 1 },
  },
  { timestamps: true },
);

// ── Database Indexes for Performance ─────────
// Commonly searched fields
ProductSchema.index({ category: 1 });
ProductSchema.index({ name: "text" }); // Text index for search
ProductSchema.index({ stock: 1 });
ProductSchema.index({ createdAt: -1 });

// Compound indexes for common queries
ProductSchema.index({ stock: 1, category: 1 });
ProductSchema.index({ price: 1, stock: 1 });

module.exports = mongoose.model("Product", ProductSchema);
