import db from "@/lib/db"; // adjust to your db connection file

export default async function handler(req, res) {
if (req.method !== "POST") {
return res.status(405).json({ message: "Method not allowed" });
}


try {
    const { user_id, username, items } = req.body;

    if (!user_id || !username || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Invalid request data." });
    }

    // Insert each item into the database
    for (const item of items) {
        const { item_name, price, quantity } = item;
        if (!item_name || !price || !quantity) continue;

        await db.query(
            `INSERT INTO room_service_orders (user_id, username, item_name, price, quantity, created_at)
             VALUES (?, ?, ?, ?, ?, NOW())`,
            [user_id, username, item_name, price, quantity]
        );
    }

    return res.status(200).json({ message: "Order placed successfully." });
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
}


}
