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

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
