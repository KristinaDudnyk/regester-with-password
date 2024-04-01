import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import pool from "./pool.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import findUserByEmail from "./helpers/findUserByEmail.js";
import verifyToken from "./middleware/verifyToken.js";
import verifyAdmin from "./middleware/verifyAdmin.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hi");
});

app.post("/registration", async (req, res) => {
  const { email, username, password } = req.body;
  const query = `INSERT INTO users_simple_registation (username, password, email) VALUES ($1, $2, $3) RETURNING *`;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const request = await pool.query(query, [username, hashedPassword, email]);
    const insertedRow = request.rows;
    return res.send(insertedRow);
  } catch (error) {
    console.log("The ERROR occured in /register and the ERROR is:", error);
    res.status(500).json({
      error: "An error occurred in /register",
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "No username found" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Incorrect password" });
  }
  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      admin: user.admin,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  res.json({ token });
});

app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "YOU GOT THE PROTECTED MESSAGE WELL DONE 😍" });
});

app.post("/mood", verifyToken, async (req, res) => {
  const { userId } = req.decodedToken;
  const { mood } = req.body;
  const query = `INSERT INTO to_do (user_id, mood) VALUES ($1, $2) RETURNING *`;
  try {
    const request = await pool.query(query, [userId, mood]);
    const insertedRow = request.rows;
    return res.send(insertedRow);
  } catch (error) {
    console.error("The ERROR occured in /mood and the ERROR is:", error);
    res.status(500).json({
      error: "An error occurred in /mood",
    });
  }
});

app.get("/moods", verifyToken, async (req, res) => {
  const { userId } = req.decodedToken;
  const query = `SELECT * FROM to_do WHERE user_id = $1`;
  try {
    const request = await pool.query(query, [userId]);
    // console.log("GET /moods request.rows", request.rows);
    return res.send(request.rows);
  } catch (error) {
    console.error("The ERROR occured in /mood and the ERROR is:", error);
    res.status(500).json({
      error: "An error occurred in /mood",
    });
  }
});

app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
  const query = `SELECT * FROM users_simple_registation`;
  try {
    const request = await pool.query(query);
    // console.log("GET /users request.rows", request.rows);
    return res.send(request.rows);
  } catch (error) {
    console.error("The ERROR occured in /users and the ERROR is:", error);
    res.status(500).json({
      error: "An error occurred in /users",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
