const express = require("express");
const router = express.Router();
const userControllers = require("../Controllers/users");

router.post("/", userControllers.register);
router.post("/login", userControllers.login);

module.exports = router;
