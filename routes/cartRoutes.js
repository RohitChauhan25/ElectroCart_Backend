const express = require("express");
const { createCart, fetchCartByUser } = require("../controller/cartController");
const router = express.Router();

router.post("/addToCart", createCart).post("/cart/:id", fetchCartByUser);

module.exports = router;
