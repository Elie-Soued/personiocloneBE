import express from "express";
import multer from "multer";
import path from "path";
import {
  register,
  login,
  getUser,
  authenticateToken,
  upload,
  getProfilePicture,
} from "../Controllers/users";

const router = express.Router();

// Resolve the correct path for the directory
const directory = path.resolve(__dirname, "../../profilePictures");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    const name = Date.now() + file.fieldname;
    cb(null, name);
  },
});

const uploadObj = multer({ storage });

router.post("/register", register);
router.post("/login", login);
router.post(
  "/upload",
  uploadObj.single("profilePicture"),
  authenticateToken,
  upload
);
router.get("/", authenticateToken, getUser);
router.get("/profilePicture", authenticateToken, getProfilePicture);

export default router;
