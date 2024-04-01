import pool from "../pool.js";

async function findUserByEmail(email) {
  // console.log("email", email, typeof email);
  const query = "SELECT * FROM users_simple_registation WHERE email = $1";
  try {
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  } catch (err) {
    console.error("Error executing query", err.stack);
    throw err;
  }
}

export default findUserByEmail;
