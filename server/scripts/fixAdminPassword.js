// Fix admin password
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const ADMIN_EMAIL = "admin@test.com";
const ADMIN_PASSWORD = "admin123";
const MONGO_URI = process.env.MONGO_URI;

async function fixAdminPassword() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✓ Connected to MongoDB");

    // Hash password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // Update the password for admin user
    const result = await User.findOneAndUpdate(
      { email: ADMIN_EMAIL },
      { password: hashedPassword },
      { new: true },
    ).select("+password");

    if (result) {
      console.log("✓ Password updated successfully!");
      console.log("Email:", result.email);
      console.log("Password Hash:", result.password.substring(0, 30) + "...");
      console.log("\n💡 You can now login with:");
      console.log(`Email: ${ADMIN_EMAIL}`);
      console.log(`Password: ${ADMIN_PASSWORD}`);
    } else {
      console.log("✗ Admin user not found");
    }

    await mongoose.disconnect();
    console.log("\n✓ Database connection closed");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

fixAdminPassword();
