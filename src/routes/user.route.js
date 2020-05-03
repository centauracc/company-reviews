const express = require("express");
const router = express.Router();
const { validateJsonContent } = require("../utils/common");
const {
  registerOneUser,
  signInUser,
} = require("../controllers/user.controller");

router.post("/register", validateJsonContent, registerOneUser);
router.post("/login", validateJsonContent, signInUser);

module.exports = router;
