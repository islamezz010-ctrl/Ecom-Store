// server/controllers/addressController.js
const Address = require("../models/Address");

// ──────────────────────────────────────────────
// GET /api/addresses
// ──────────────────────────────────────────────
exports.getAddresses = async (req, res) => {
  const addresses = await Address.find({ user: req.user._id }).sort({
    isDefault: -1,
    updatedAt: -1,
  });
  res.json(addresses);
};

// ──────────────────────────────────────────────
// POST /api/addresses
// ──────────────────────────────────────────────
exports.createAddress = async (req, res) => {
  const count = await Address.countDocuments({ user: req.user._id });
  if (count >= 10) {
    return res
      .status(400)
      .json({ message: "Maximum of 10 saved addresses reached" });
  }

  const address = await Address.create({
    ...req.body,
    user: req.user._id,
    // First address is automatically default
    isDefault: count === 0 ? true : req.body.isDefault || false,
  });

  res.status(201).json(address);
};

// ──────────────────────────────────────────────
// PUT /api/addresses/:id
// ──────────────────────────────────────────────
exports.updateAddress = async (req, res) => {
  const address = await Address.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!address) {
    return res.status(404).json({ message: "Address not found" });
  }

  // Update only allowed fields
  const allowed = [
    "fullName",
    "mobile",
    "street",
    "building",
    "cityArea",
    "district",
    "governorate",
    "landmark",
    "addressType",
    "isDefault",
  ];
  for (const key of allowed) {
    if (req.body[key] !== undefined) {
      address[key] = req.body[key];
    }
  }

  await address.save();
  res.json(address);
};

// ──────────────────────────────────────────────
// DELETE /api/addresses/:id
// ──────────────────────────────────────────────
exports.deleteAddress = async (req, res) => {
  const address = await Address.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!address) {
    return res.status(404).json({ message: "Address not found" });
  }

  // If the deleted address was default, make the most recent one default
  if (address.isDefault) {
    const next = await Address.findOne({ user: req.user._id }).sort({
      updatedAt: -1,
    });
    if (next) {
      next.isDefault = true;
      await next.save();
    }
  }

  res.json({ message: "Address deleted" });
};
