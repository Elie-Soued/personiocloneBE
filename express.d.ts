import { EmployeeProfileType } from "./src/types";

declare global {
  namespace Express {
    interface Request {
      user?: EmployeeProfileType; // Use optional chaining if user may be undefined
    }
  }
}

export {};
