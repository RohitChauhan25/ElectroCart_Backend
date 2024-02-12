const express = require("express");
const { createTypes, fetchTypes } = require("../controller/typesController");

const router = express.Router();

router.route("/types").get(fetchTypes).post(createTypes);

module.exports = router;
