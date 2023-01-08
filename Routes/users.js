const express = require("express");
const router = express.Router();
const userControllers = require("../Controllers/users");

router.post("/register", userControllers.register);
router.post("/login", userControllers.login);

module.exports = router;
