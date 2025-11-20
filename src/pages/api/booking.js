import db  from "@/lib/db"; // your MySQL connection

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { username, room, checkIn, checkOut } = req.body;

    if (!username || !room || !checkIn || !checkOut) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Insert booking into SQL
        const query = `
            INSERT INTO bookings (username, room, check_in, check_out, created_at)
            VALUES (?, ?, ?, ?, NOW())
        `;
        const values = [username, room, checkIn, checkOut];

        await db.execute(query, values);

        res.status(200).json({ message: "Booking submitted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to submit booking." });
    }
}
