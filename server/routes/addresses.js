// server/routes/addresses.js
const express = require("express");
const Joi = require("joi");
const validate = require("../middleware/validate");
const { protect } = require("../middleware/auth");
const ctrl = require("../controllers/addressController");

const router = express.Router();

const addressSchema = Joi.object({
  fullName: Joi.string().trim().required(),
  mobile: Joi.string().trim().required(),
  street: Joi.string().trim().required(),
  building: Joi.string().allow("").optional(),
  cityArea: Joi.string().trim().required(),
  district: Joi.string().allow("").optional(),
  governorate: Joi.string().trim().required(),
  landmark: Joi.string().allow("").optional(),
  addressType: Joi.string().valid("home", "office").default("home"),
  isDefault: Joi.boolean().default(false),
});

router.get("/", protect, ctrl.getAddresses);
router.post("/", protect, validate(addressSchema), ctrl.createAddress);
router.put("/:id", protect, validate(addressSchema), ctrl.updateAddress);
router.delete("/:id", protect, ctrl.deleteAddress);

module.exports = router;
