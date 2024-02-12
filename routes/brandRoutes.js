const express = require("express");
const { fetchBrands, createBrand } = require("../controller/brandController");

const router = express.Router();

router.route("/addBrand").post(createBrand);
router.route("/brands").post(fetchBrands);

module.exports = router;
