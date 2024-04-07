require("dotenv").config();
const pool = require("../dbconfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkIfUserExists = async (req) => {
  const { user_name } = req.body;
  const users = await pool.query("SELECT * FROM users");
  const result = users.rows;
  const user = result.find((user) => user.user_name === user_name);
  return user;
};

module.exports = {
  register: async (req, res) => {
    const user = req.body;

    let userFlat = {};

    Object.values(user).forEach((section) => {
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
  },

  login: async (req, res) => {
    const { password } = req.body;

    const user = await checkIfUserExists(req);

    if (user === undefined) {
      res.json({
        code: 404,
        message: "Account does not exist",
      });
      return;
    }

    try {
      const passwordIsMatching = password === user.password;

      if (passwordIsMatching) {
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.send({ accessToken });
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
  },

  authenticateToken: async (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403);
      }
      req.user = user;
      next();
    });
  },

  getUser: async (req, res) => {
    const { id } = req.user;
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json(formatResponse(employeeProfileBlank, user.rows[0]));
  },
};

const formatResponse = (obj, response) => {
  const result = {}; // Annotate result as any
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      result[key] = formatResponse(obj[key], response);
    } else {
      result[key] = response[key];
    }
  }
  return result;
};

const employeeProfileBlank = {
  public: {
    first_name: "",
    last_name: "",
    user_name: "",
    password: "",
    gender: "",
    email: "",
    company_phone_number: "",
    office: "",
    department: "",
    position: "",
    team: "",
    linked_in: "",
    birthday: "",
    phone_number: "",
  },

  hrInformation: {
    status: "",
    employment_type: "",
    occupation_type: "",
    supervisor: "",
    hire_date: "",
    contract_end: "",
    length_of_probation: "",
    notice_period: "",
    weekly_hours: "",
    cost_center: "",
    nationality: "",
    resident_permit_valid_until: "",
  },

  personalData: {
    street_and_house_number: "",
    postal_code: "",
    city: "",
    private_email: "",
    private_phone: "",
  },

  payrollInformation: {
    salary_type: "",
    tax_id: "",
    social_security_number: "",
    wage_tax_class: "",
    children: "",
    child_allowance: "",
    marital_status: "",
    religious_denomination: "",
    type_of_health_insurance: "",
    name_of_health_insurance: "",
    main_or_secondary_occupation: "",
    wage_tax_allowance: "",
  },

  bankDetails: {
    holder_of_bank_account: "",
    iban: "",
    bic: "",
  },

  emergencyContact: {
    emergency_name: "",
    emergency_number: "",
  },

  employeeEquipment: {
    notebook: "",
    cell_phone: "",
  },

  development: {
    training: "",
  },
};
