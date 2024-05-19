import { Pool } from "pg";

const { DBUSER, DBHOST, DBNAME, DBPASS } = process.env;

const pool: Pool = new Pool({
  user: DBUSER,
  host: DBHOST,
  database: DBNAME,
  password: DBPASS,
});

export default pool;
