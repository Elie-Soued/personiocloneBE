import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";
import pool from "../dbconfig";
import dotenv from "dotenv";
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

export { register, login, getUser, authenticateToken };
