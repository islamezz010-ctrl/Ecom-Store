const path = require("path");

require("dotenv").config();
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
require("dotenv").config({ path: path.resolve(__dirname, "..", "..", ".env") });
require("dotenv").config({
  path: path.resolve(__dirname, "..", "..", ".env.local"),
});

const mongoose = require("mongoose");
const Product = require("../models/Product");
const products = require("../data/products");

const seedProducts = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is required to seed products.");
  }

  await mongoose.connect(process.env.MONGO_URI);

  let fakeProducts = [];
  try {
    const response = await fetch("https://dummyjson.com/products?limit=20");
    const data = await response.json();
    fakeProducts = data.products.map(item => ({
      name: item.title,
      description: item.description,
      price: item.price,
      image: item.thumbnail, 
      stock: item.stock || 50,
      category: item.category
    }));
  } catch (err) {
    console.error("Failed to fetch from fake api:", err);
  }

  const allProducts = [...products, ...fakeProducts];

  const operations = allProducts.map((product) => ({
    updateOne: {
      filter: { name: product.name },
      update: { $set: product },
      upsert: true,
    },
  }));

  const result = await Product.bulkWrite(operations);
  console.log(
    `Seeded products. Inserted: ${result.upsertedCount}, updated: ${result.modifiedCount}.`,
  );

  await mongoose.disconnect();
};

seedProducts().catch(async (error) => {
  console.error("Product seed failed:", error.message);
  await mongoose.disconnect();
  process.exit(1);
});
