// server/routes/auth.js
const express = require("express");
const Joi = require("joi");
const validate = require("../middleware/validate");
const { protect } = require("../middleware/auth");
const ctrl = require("../controllers/authController");

const router = express.Router();

// ── Validation schemas ───────────────────────

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const googleSchema = Joi.object({
  googleId: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().allow("").optional(),
  picture: Joi.string().uri().allow("").optional(),
});

const profileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).optional(),
  picture: Joi.string().uri().allow("").optional(),
});

const passwordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).max(128).required(),
});

// ── Routes ───────────────────────────────────

router.post("/register", validate(registerSchema), ctrl.register);
router.post("/login", validate(loginSchema), ctrl.login);
router.post("/google", validate(googleSchema), ctrl.googleAuth);
router.post("/logout", ctrl.logout);
router.get("/me", protect, ctrl.getMe);
router.put("/profile", protect, validate(profileSchema), ctrl.updateProfile);
router.put("/password", protect, validate(passwordSchema), ctrl.changePassword);

module.exports = router;
