import db from "@/lib/db"; // make sure this is your MySQL/MariaDB connection

export default async function handler(req, res) {
    if (req.method === "POST") {
        // Place a new room service order
        const { user_id, username, item_name, price, quantity } = req.body;

        if (!user_id || !username || !item_name || !price) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const total_price = price * (quantity || 1);

        try {
            const [result] = await db.execute(
                "INSERT INTO room_service_orders (user_id, username, item_name, price, quantity, total_price) VALUES (?, ?, ?, ?, ?, ?)",
                [user_id, username, item_name, price, quantity || 1, total_price]
            );

            return res.status(200).json({
                message: "Order placed successfully!",
                orderId: result.insertId
            });
        } catch (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }
    } 
    
    else if (req.method === "GET") {
        // Get all room service orders (for dashboard)
        try {
            const [orders] = await db.execute(
                "SELECT * FROM room_service_orders ORDER BY created_at DESC"
            );

            return res.status(200).json(orders);
        } catch (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }
    } 
    
    else {
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}