import { Request } from "express";
import pool from "./dbconfig";
import { ObjectType } from "./types";

const checkIfUserExists = async (req: Request) => {
  const { user_name } = req.body;
  const users = await pool.query("SELECT * FROM users");
  const result = users.rows;
  const user = result.find((user) => user.user_name === user_name);
  return user;
};

const formatResponse = (obj: any, response: any) => {
  const result: ObjectType = {}; // Annotate result as any
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      result[key] = formatResponse(obj[key], response);
    } else {
      result[key] = response[key];
    }
  }
  return result;
};

export { checkIfUserExists, formatResponse };
