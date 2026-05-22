const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    googleId: { type: String },
    name: String,
    picture: String,
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^@\s]+@[^@\s]+\.[^@\s]+$/
    },
    // Password required only for non‑Google accounts
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      }
    },
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Encrypt password before saving (skip if no password)
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Helper to compare candidate password with stored hash
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
