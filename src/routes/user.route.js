const express = require("express");
const router = express.Router();
const { validateJsonContent } = require("../utils/common");
const { registerOneUser } = require("../controllers/user.controller");

router.post("/register", validateJsonContent, registerOneUser);

module.exports = router;
