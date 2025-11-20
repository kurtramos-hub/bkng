import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

// Configure your database connection
const dbConfig = {
  host: process.env.DB_HOST,      // e.g., localhost
  user: process.env.DB_USER,      // your DB username
  password: process.env.DB_PASS,  // your DB password
  database: process.env.DB_NAME,  // your database name
};

export default async function handler(req, res) {
  try {
    const connection = await mysql.createConnection(dbConfig);

    if (req.method === "POST") {
      const { username, message, rating } = req.body;

      if (!username || !message || !rating) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const [result] = await connection.execute(
        "INSERT INTO feedbacks (username, message, rating) VALUES (?, ?, ?)",
        [username, message, rating]
      );

      await connection.end();

      return res.status(200).json({ success: true, id: result.insertId });
    }

    if (req.method === "GET") {
      const [rows] = await connection.execute("SELECT * FROM feedbacks ORDER BY created_at DESC");
      await connection.end();
      return res.status(200).json(rows);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection error" });
  }
}