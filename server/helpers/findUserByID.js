import pool from "../pool.js";

async function findUserByID(user_id) {
  console.log("user_id", user_id, typeof user_id);

  const query = "SELECT * FROM users_simple_registation WHERE id = $1";

  try {
    const { rows } = await pool.query(query, [user_id]);
    return rows[0]; // Return the first matching user
  } catch (err) {
    console.error("Error executing query", err.stack);
    throw err;
  }
}

export default findUserByID;
