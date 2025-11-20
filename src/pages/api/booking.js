import db from "@/lib/db"; // your database connection

// Room prices (should match frontend)
const roomPrices = {
"Standard Room": 149,
"Deluxe Room": 249,
"Suite": 399
};

export default async function handler(req, res) {
if (req.method === "POST") {
const { username, room, checkIn, checkOut, guests } = req.body;


    if (!username || !room || !checkIn || !checkOut || !guests) {  
        return res.status(400).json({ message: "Missing required fields" });  
    }  

    // Calculate number of nights  
    const start = new Date(checkIn);  
    const end = new Date(checkOut);  
    const diffTime = Math.abs(end - start);  
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));  

    if (nights <= 0) {  
        return res.status(400).json({ message: "Check-out date must be after check-in date." });  
    }  

    // Calculate total  
    const pricePerNight = roomPrices[room];  
    const total = pricePerNight * nights;  

    try {  
        const [result] = await db.execute(  
            "INSERT INTO bookings (username, room, check_in, check_out, guests, total) VALUES (?, ?, ?, ?, ?, ?)",  
            [username, room, checkIn, checkOut, guests, total]  
        );  

        return res.status(200).json({  
            message: "Booking placed successfully!",  
            bookingId: result.insertId,  
            total  
        });  
    } catch (err) {  
        console.error(err);  
        return res.status(500).json({ message: "Database error" });  
    }  
}  

if (req.method === "GET") {  
    try {  
        const [bookings] = await db.execute("SELECT * FROM bookings ORDER BY created_at DESC");  
        return res.status(200).json(bookings);  
    } catch (err) {  
        console.error(err);  
        return res.status(500).json({ message: "Database error" });  
    }  
}  

return res.status(405).json({ message: "Method not allowed" });  


}
