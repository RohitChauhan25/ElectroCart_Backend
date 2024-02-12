const express = require("express");
const {
  createSubCategorys,
  fetchSubCategories,
} = require("../controller/subCategoryController");

const router = express.Router();

router.route("/subcategory").get(fetchSubCategories).post(createSubCategorys);

module.exports = router;
