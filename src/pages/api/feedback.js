import db from "@/lib/db";

export default async function handler(req, res) {
  try {
    // GET all feedback
    if (req.method === "GET") {
      const [rows] = await db.query(`SELECT * FROM feedback ORDER BY created_at DESC`);
      return res.status(200).json(rows);
    }

    // POST new feedback
    if (req.method === "POST") {
      const { rating, comment, category } = req.body;

      // Validation
      if (rating == null || !comment || !category) {
        return res.status(400).json({ error: "Missing fields" });
      }

      // Parse user info from header
      let user = {};
      try {
        user = JSON.parse(req.headers["x-user"] || "{}");
      } catch (e) {
        console.warn("Invalid x-user header");
      }

      const userId = user.id || null;
      const userName = user.name || user.username || "Anonymous";

      // Insert feedback
      const [result] = await db.query(
        `INSERT INTO feedback (user_id, user_name, rating, comment, category)
         VALUES (?, ?, ?, ?, ?)`,
        [userId, userName, rating, comment, category]
      );

      // Fetch the newly inserted feedback
      const [inserted] = await db.query(
        "SELECT * FROM feedback WHERE id = ?",
        [result.insertId]
      );

      return res.status(201).json(inserted[0]);
    }

    // Method not allowed
    return res.status(405).json({ error: "Method not allowed" });

  } catch (err) {
    console.error("SQL ERROR:", err);
    return res.status(500).json({ error: "SQL error", details: err.message });
  }
}