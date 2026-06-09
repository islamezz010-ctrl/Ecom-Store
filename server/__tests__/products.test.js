// server/__tests__/products.test.js
process.env.JWT_SECRET = "testsecretkey";
process.env.MONGO_URI = "mongodb://localhost:27017/test";
process.env.STRIPE_SECRET_KEY = "sk_test_key";

const request = require("supertest");
const app = require("../index");
const db = require("./setup");
const Product = require("../models/Product");

beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("Product Endpoints", () => {
  const dummyProduct = {
    name: "AeroFit Wireless Headphones",
    price: 189.99,
    description: "Noise-isolating headphones",
    image: "http://example.com/image.jpg",
    category: "Electronics",
    stock: 12,
  };

  test("GET /api/products -> Should return all products with stock > 0 as raw array by default", async () => {
    await Product.create(dummyProduct);
    await Product.create({ ...dummyProduct, name: "Out of Stock", stock: 0 });

    const res = await request(app).get("/api/products").expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe(dummyProduct.name);
  });

  test("GET /api/products -> Should return paginated object when page/limit is provided", async () => {
    await Product.create(dummyProduct);

    const res = await request(app)
      .get("/api/products")
      .query({ page: 1, limit: 10 })
      .expect(200);

    expect(res.body).toHaveProperty("products");
    expect(res.body.products).toHaveLength(1);
    expect(res.body.page).toBe(1);
  });

  test("GET /api/products -> Should filter by category", async () => {
    await Product.create(dummyProduct);
    await Product.create({ ...dummyProduct, name: "Shirt", category: "Fashion" });

    const res = await request(app)
      .get("/api/products")
      .query({ category: "Fashion" })
      .expect(200);

    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe("Shirt");
  });

  test("GET /api/products/:id -> Should return a single product", async () => {
    const p = await Product.create(dummyProduct);

    const res = await request(app)
      .get(`/api/products/${p._id}`)
      .expect(200);

    expect(res.body.name).toBe(dummyProduct.name);
  });

  test("GET /api/products/:id -> Should return 404 if not found", async () => {
    await request(app)
      .get("/api/products/60d21b4667d0d8992e610c85")
      .expect(404);
  });
});
