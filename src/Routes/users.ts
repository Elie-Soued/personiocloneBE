import express from "express";
import {
  register,
  login,
  getUser,
  authenticateToken,
} from "../Controllers/users";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", authenticateToken, getUser);

export default router;
