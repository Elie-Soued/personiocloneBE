import express from "express";
import multer from "multer";
import path from "path";
import {
  register,
  login,
  getUser,
  authenticateToken,
  upload,
} from "../Controllers/users";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/upload", authenticateToken, upload);
router.get("/", authenticateToken, getUser);

export default router;
