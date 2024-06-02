import express from "express";
import { uploadObj } from "../Utils";
import {
  register,
  login,
  getUser,
  authenticateToken,
} from "../Controllers/users";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/upload", uploadObj.single("profilePicture"), (req, res) => {
  res.json(req.file);
});
router.get("/", authenticateToken, getUser);

export default router;
