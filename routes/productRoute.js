const express = require("express");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProductById,
  fetchBrand,
  FilterProducts,
} = require("../controller/productController");
const router = express.Router();

router.route("/products").post(getAllProduct);
router.route("/products/brand").get(fetchBrand);
router.route("/product/filter").post(FilterProducts);
router.route("/product/").post(createProduct);
router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(fetchProductById);
module.exports = router;
