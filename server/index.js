const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
require("dotenv").config();

const User = require('./models/User');
const Product = require('./models/Product');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// --- Middleware Configuration ---
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // Your React URL
  credentials: true                // Required to accept cookies from frontend
}));

// --- Auth Middleware (The "Protect" Layer) ---
const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, please login" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'JWT_SECRET_KEY');
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Token failed" });
  }
};

// --- Database Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🍃 MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// --- 1. Auth Routes ---

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'JWT_SECRET_KEY', { expiresIn: '30d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // False on localhost
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    }).json({ _id: user._id, email: user.email });

  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// --- 2. Product Routes ---

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({ stock: { $gt: 0 } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- 3. Protected Routes (Payment & Stock) ---

app.post("/create-checkout-session", protect, async (req, res) => {
  try {
    const { items } = req.body; // Expecting [{id, quantity}]

    // Fetch real prices from MongoDB
    const productIds = items.map(item => item.id);
    const storeItems = await Product.find({ _id: { $in: productIds } });

    const line_items = items.map((item) => {
      const storeItem = storeItems.find(p => p._id.toString() === item.id);
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: req.user.email, // Automatically use the logged-in user's email
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cart",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products/reduce-stock', protect, async (req, res) => {
  try {
    const { items } = req.body;
    for (const item of items) {
      await Product.findByIdAndUpdate(item.id, { $inc: { stock: -item.quantity } });
    }
    res.json({ message: "Stock updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Server Start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
