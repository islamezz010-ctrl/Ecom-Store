// server/scripts/createAdminUser.js
/**
 * Script to create a test admin user
 * Usage: node server/scripts/createAdminUser.js
 */

require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL || "admin@test.com";
const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD || "admin123";
const MONGO_URI = process.env.MONGO_URI;

async function createAdminUser() {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✓ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log(`⚠️  Admin user with email "${ADMIN_EMAIL}" already exists`);
      console.log("Email:", existingAdmin.email);
      console.log("Is Admin:", existingAdmin.isAdmin);
      await mongoose.disconnect();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // Create admin user
    const adminUser = await User.create({
      name: "Admin",
      email: ADMIN_EMAIL,
      password: hashedPassword,
      isAdmin: true,
    });

    console.log("✓ Admin user created successfully!");
    console.log("\n📋 Admin Credentials:");
    console.log("─".repeat(40));
    console.log(`Email:    ${ADMIN_EMAIL}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);
    console.log(`Is Admin: ${adminUser.isAdmin}`);
    console.log("─".repeat(40));
    console.log("\n💡 Tips:");
    console.log("1. Login with the credentials above");
    console.log("2. Click your profile icon in top-right");
    console.log("3. Select '🔧 Admin Panel'");
    console.log("4. Start managing your store!");

    await mongoose.disconnect();
    console.log("\n✓ Database connection closed");
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
    process.exit(1);
  }
}

createAdminUser();
