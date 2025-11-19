import db from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2️⃣ Query DB
    let rows;
    try {
      [rows] = await db.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
    } catch (dbError) {
      console.error("Database query error:", dbError);
      return res.status(500).json({ message: "Database error", error: dbError.message });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // 4️⃣ Check JWT_SECRET
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not defined!");
      return res.status(500).json({ message: "JWT secret not configured" });
    }

    // 5️⃣ Generate JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      secret,
      { expiresIn: "7d" }
    );

    // 6️⃣ Return response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Unexpected login error:", error);
    return res.status(500).json({ message: "Unexpected server error", error: error.message });
  }
}
