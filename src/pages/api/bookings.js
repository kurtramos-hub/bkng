import { db } from '@/lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const [bookings] = await db.query(`
                SELECT b.*, r.room_number, r.room_type, u.name as user_name 
                FROM bookings b 
                JOIN rooms r ON b.room_id = r.id 
                JOIN users u ON b.user_id = u.id 
                ORDER BY b.created_at DESC
            `);
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'POST') {
        try {
            const { userId, roomId, checkIn, checkOut, guestCount, specialRequests } = req.body;
            
            // Calculate total amount
            const [room] = await db.query('SELECT price_per_night FROM rooms WHERE id = ?', [roomId]);
            const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
            const totalAmount = room[0].price_per_night * nights;

            const [result] = await db.query(
                'INSERT INTO bookings (user_id, room_id, check_in, check_out, total_amount, guest_count, special_requests) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [userId, roomId, checkIn, checkOut, totalAmount, guestCount, specialRequests]
            );

            res.status(201).json({ message: 'Booking created successfully', bookingId: result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}