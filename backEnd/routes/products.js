const express = require("express");
const router = express.Router();

const { getProductById } = require("../controllers/products");

router.param("productId", getProductById);

module.exports = router;
