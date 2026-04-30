const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String,
  category: String,
  stock: { type: Number, default: 1 }
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt'

module.exports = mongoose.model('Product', ProductSchema);


