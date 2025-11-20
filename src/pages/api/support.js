import db from "@/lib/db";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { username, message } = req.body;

        if (!username || !message) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Insert into SQL
        const query = `
            INSERT INTO support_tickets (username, message)
            VALUES (?, ?)
        `;
        await db.query(query, [username, message]);

        return res.status(200).json({ message: "Support ticket submitted!" });

    } catch (error) {
        console.error("Support API Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}













