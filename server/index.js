// server/index.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const Joi = require("joi");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const User = require("./models/User");
const Product = require("./models/Product");

const app = express();
const allowedOrigins = (
  process.env.CORS_ORIGIN || "http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""));

// Middleware
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

// Cookie options used for auth token
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Auth protect middleware
const protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authorized, please login" });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "JWT_SECRET_KEY",
    );
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch {
    res.status(401).json({ message: "Token failed" });
  }
};

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🍃 MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ----- Auth Routes -----
app.post("/api/auth/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || "JWT_SECRET_KEY",
        {
          expiresIn: "30d",
        },
      );
      res.cookie("token", token, cookieOptions).json({
        _id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      });
      console.log("✅ Token cookie set for user:", user.email);
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    next(err);
  }
});

app.post("/api/auth/google", async (req, res, next) => {
  try {
    const { googleId, email, name, picture } = req.body;
    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({ googleId, email, name, picture });
      await user.save();
      console.log("New User Created:", name);
    } else {
      user.name = name || user.name;
      user.picture = picture || user.picture;
      await user.save();
      console.log("Existing User Logged In:", name);
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "JWT_SECRET_KEY",
      {
        expiresIn: "30d",
      },
    );
    res.cookie("token", token, cookieOptions).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      googleId: user.googleId,
    });
    console.log("✅ Token cookie set for Google user:", email);
  } catch (err) {
    next(err);
  }
});

// ----- Product Routes -----
app.get("/api/products", async (req, res, next) => {
  try {
    const products = await Product.find({ stock: { $gt: 0 } });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// ----- Checkout & Stock Routes -----
app.post("/create-checkout-session", protect, async (req, res, next) => {
  const schema = Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          quantity: Joi.number().integer().min(1).required(),
        }),
      )
      .required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const { items } = value;
    const productIds = items.map((item) => item.id);
    const storeItems = await Product.find({ _id: { $in: productIds } });

    const line_items = items.map((item) => {
      const storeItem = storeItems.find((p) => p._id.toString() === item.id);
      if (!storeItem) {
        throw new Error(`Product not found: ${item.id}`);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: storeItem.name,
            images: [storeItem.image],
          },
          unit_amount: Math.round(storeItem.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const clientUrl = (
      process.env.CLIENT_URL || "http://localhost:5173"
    ).replace(/\/$/, "");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: req.user.email,
      success_url: `${clientUrl}/success`,
      cancel_url: `${clientUrl}/cart`,
    });

    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
});

app.post("/api/products/reduce-stock", protect, async (req, res, next) => {
  const schema = Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          quantity: Joi.number().integer().min(1).required(),
        }),
      )
      .required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const { items } = value;
    for (const item of items) {
      await Product.findByIdAndUpdate(item.id, {
        $inc: { stock: -item.quantity },
      });
    }
    res.json({ message: "Stock updated successfully!" });
  } catch (err) {
    next(err);
  }
});

// Global error handler (must be after routes)
app.use((err, req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Internal Server Error" });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
