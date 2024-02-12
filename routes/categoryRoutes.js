const express = require("express");
const {
  fetchCategories,
  createCategorys,
} = require("../controller/categoryController");

const router = express.Router();

router.route("/category").get(fetchCategories).post(createCategorys);

module.exports = router;
