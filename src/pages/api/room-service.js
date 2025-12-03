import db from "@/lib/db";

export default async function handler(req, res) {
    // GET: fetch all orders for a user
    if (req.method === "GET") {
        try {
            const { user_id } = req.query;

            const [rows] = await db.query(
                `SELECT * FROM room_service_orders WHERE user_id = ? ORDER BY created_at DESC`,
                [user_id]
            );

            return res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch orders" });
        }
    }

    // POST: add orders
    if (req.method === "POST") {
        try {
            const { user_id, username, items } = req.body;

            for (const item of items) {
                await db.query(
                    `INSERT INTO room_service_orders (user_id, username, item_name, price, quantity, created_at)
                    VALUES (?, ?, ?, ?, ?, NOW())`,
                    [user_id, username, item.item_name, item.price, item.quantity]
                );
            }

            return res.status(200).json({ message: "Order placed" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to place order" });
        }
    }

    // DELETE: remove 1 order after payment
    if (req.method === "DELETE") {
        try {
            const { order_id } = req.query;

            await db.query(
                `DELETE FROM room_service_orders WHERE id = ?`,
                [order_id]
            );

            return res.status(200).json({ message: "Order deleted" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to delete order" });
        }
    }

    return res.status(405).json({ message: "Method not allowed" });
}
