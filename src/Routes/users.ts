import express from "express";
import multer from "multer";
import {
  register,
  login,
  getUser,
  authenticateToken,
  upload,
} from "../Controllers/users";

const router = express.Router();
const uploadObj = multer({ dest: "profilePictures" });

router.post("/register", register);
router.post("/login", login);
router.post("/upload", uploadObj.single("profilePicture"), upload);
router.get("/", authenticateToken, getUser);

export default router;
