import { db } from "@/lib/db";
import bcrypt from "bcryptjs";


export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

        const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (user.length > 0) return res.status(409).json({ message: "Email already exists" });

        const hashed = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashed]);

        res.status(201).json({ message: "Registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
}