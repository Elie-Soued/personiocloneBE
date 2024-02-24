const express = require("express");
const router = express.Router();
const userControllers = require("../Controllers/users");

const { register, login, getUser, authenticateToken } = userControllers;

router.post("/register", register);
router.post("/login", login);
router.get("/", authenticateToken, getUser);

module.exports = router;
