import { Request } from "express";
import pool from "./dbconfig";

const checkIfUserExists = async (req: Request) => {
  const { user_name } = req.body;
  const users = await pool.query("SELECT * FROM users");
  const result = users.rows;
  const user = result.find((user) => user.user_name === user_name);
  return user;
};

export { checkIfUserExists };
