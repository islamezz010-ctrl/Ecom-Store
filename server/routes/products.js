// server/routes/products.js
const express = require("express");
const ctrl = require("../controllers/productController");

const router = express.Router();

router.get("/", ctrl.getProducts);
router.get("/:id", ctrl.getProductById);

module.exports = router;
