const express = require("express");
const { createUser, loginUser } = require("../controller/authController");
const { fetchUserById } = require("../controller/userController");

const router = express.Router();

router
  .post("/signup", createUser)
  .post("/login", loginUser)
  .post("/user/:id", fetchUserById);

module.exports = router;
