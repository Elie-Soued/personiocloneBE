import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";
import pool from "../dbconfig";
import dotenv from "dotenv";
import multer from "multer";
import { employeeProfileBlank } from "../constants";
import { EmployeeProfileType } from "../types";
import { checkIfUserExists, formatResponse } from "../Utils";

dotenv.config();

const register = async (req: Request, res: Response) => {
  const user = req.body;

  let userFlat = {};

  Object.values(user).forEach((section: Object | any) => {
    userFlat = { ...userFlat, ...section };
  });

  const columns = Object.keys(userFlat);
  const data = Object.values(userFlat);

  try {
    const placeholders = data.map((_, i) => `$${i + 1}`).join(", ");
    const queryString = `INSERT INTO "users" (${columns.join(
      ", "
    )}) VALUES (${placeholders});`;
    const result = await pool.query(queryString, data);

    res.status(201).json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: "Error registering user" });
  }
};

const login = async (req: Request, res: Response) => {
  const { password } = req.body;

  const user = await checkIfUserExists(req);

  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET environment variable not set");
  }

  if (user === undefined) {
    res.json({
      code: 404,
      message: "Account does not exist",
    });
    return;
  }

  const { isadmin } = user;

  try {
    const passwordIsMatching = password === user.password;

    if (passwordIsMatching) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

      // Set CORS headers
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );

      res.send({
        accessToken: accessToken,
        isadmin: isadmin,
      });
    } else {
      res.json({
        code: 401,
        message: "Wrong Password",
      });
      return;
    }
  } catch (e) {
    res.status(500).send();
  }
};

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET environment variable not set");
  }
  if (!token) return res.status(401);
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: Error | null, decoder) => {
      if (err) {
        return res.status(403);
      }

      req.body.user = decoder as EmployeeProfileType;
      next();
    }
  );
};

const getUser = async (req: Request, res: Response) => {
  if (!req.body.user) return;
  const { id } = req.body.user;
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  res.json(formatResponse(employeeProfileBlank, user.rows[0]));
};

const getProfilePicture = async (req: Request, res: Response) => {
  try {
    if (!req.body.user || !req.body.user.id) {
      return res.status(400).json({ error: "Missing user ID" });
    }

    const { id } = req.body.user;
    const profilePicturePath = await pool.query(
      "SELECT profilepicture FROM users WHERE id = $1",
      [id]
    );

    return res.json(profilePicturePath.rows[0]);
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const upload = async (req: Request, res: Response) => {
  if (!req.body.user) return;
  const basePath = "/home/pilex/repos/personioclone/data/profilePictures";
  let path;
  if (req.file) path = `${basePath}/${Date.now()}${req.file.fieldname}`;
  const { id } = req.body.user;
  const query = "UPDATE users SET profilepicture = $1 WHERE id = $2";
  let values = [path, id];

  try {
    const result = await pool.query(query, values);
    return result;
  } catch (err) {
    res.send(err);
  }
};
export {
  register,
  login,
  getUser,
  authenticateToken,
  upload,
  getProfilePicture,
};
