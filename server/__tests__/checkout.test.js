// server/__tests__/checkout.test.js
process.env.JWT_SECRET = "testsecretkey";
process.env.MONGO_URI = "mongodb://localhost:27017/test";
process.env.STRIPE_SECRET_KEY = "sk_test_key";

// Mock stripe module before importing app/index
jest.mock("stripe", () => {
  return jest.fn().mockImplementation(() => {
    return {
      checkout: {
        sessions: {
          create: jest.fn().mockResolvedValue({
            id: "cs_test_session_id",
            url: "https://stripe.com/checkout",
          }),
        },
      },
    };
  });
});

const request = require("supertest");
const app = require("../index");
const db = require("./setup");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("Checkout Endpoints", () => {
  let userCookie;
  let testProduct;

  beforeEach(async () => {
    const user = await User.create({
      name: "Customer",
      email: "customer@example.com",
      password: "password123",
    });

    testProduct = await Product.create({
      name: "Premium Watch",
      price: 30.0,
      stock: 5,
    });

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "customer@example.com", password: "password123" });
    userCookie = loginRes.headers["set-cookie"];
  });

  test("POST /api/checkout/session -> Should reserve stock, create a pending order, and return Stripe URL", async () => {
    const res = await request(app)
      .post("/api/checkout/session")
      .set("Cookie", userCookie)
      .send({
        items: [{ id: testProduct._id.toString(), quantity: 2 }],
        location: { id: "giza", name: "Giza", governorate: "Giza" },
      })
      .expect(200);

    expect(res.body).toHaveProperty("url");
    expect(res.body.url).toBe("https://stripe.com/checkout");

    // Stock should be reserved (reduced by 2: 5 -> 3)
    const updatedProd = await Product.findById(testProduct._id);
    expect(updatedProd.stock).toBe(3);

    // Pending Order should be created in DB
    const order = await Order.findOne({ stripeSessionId: "cs_test_session_id" });
    expect(order).toBeDefined();
    expect(order.status).toBe("pending");
    expect(order.items[0].quantity).toBe(2);
    expect(order.shippingCost).toBe(3.99); // Shipping to Giza
    expect(order.total).toBe(63.99); // 60 subtotal + 3.99 shipping
  });

  test("POST /api/checkout/session -> Should fail if stock is insufficient", async () => {
    const res = await request(app)
      .post("/api/checkout/session")
      .set("Cookie", userCookie)
      .send({
        items: [{ id: testProduct._id.toString(), quantity: 10 }], // only 5 in stock
      })
      .expect(409);

    expect(res.body.message).toContain("Insufficient stock");

    // Stock should not have changed
    const unchangedProd = await Product.findById(testProduct._id);
    expect(unchangedProd.stock).toBe(5);
  });
});
