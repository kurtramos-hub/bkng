import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { username, amount, method, user_id, order_id } = req.body;

            // Validate required fields
            if (!username || !amount || !method) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Missing required fields: username, amount, and method are required' 
                });
            }

            // Generate a transaction ID
            const transaction_id = `TXN-${Date.now()}`;

            // Insert into payments table with your exact column names
            const paymentSql = `
                INSERT INTO payments 
                (username, user_id, amount, method, transaction_id, status, created_at) 
                VALUES (?, ?, ?, ?, ?, 'completed', NOW())
            `;
            
            const [paymentResult] = await pool.execute(paymentSql, [
                username, 
                user_id || null,
                parseFloat(amount), 
                method,
                transaction_id
            ]);

            const paymentId = paymentResult.insertId;

            // If an order_id was provided, try to update the room service order
            if (order_id && user_id) {
                try {
                    // First, check if the order belongs to this user
                    const [orderCheck] = await pool.execute(
                        'SELECT id FROM room_service_orders WHERE id = ? AND user_id = ?',
                        [order_id, user_id]
                    );
                    
                    if (orderCheck.length > 0) {
                        // Try to update payment status columns if they exist
                        await pool.execute(
                            `UPDATE room_service_orders 
                             SET payment_status = 'paid',
                                 payment_method = ?,
                                 payment_id = ?,
                                 paid_at = NOW()
                             WHERE id = ? AND user_id = ?`,
                            [method, paymentId, order_id, user_id]
                        ).catch(err => {
                            // If columns don't exist, that's okay - payment is still recorded
                            console.log('Note: Could not update order status (columns might not exist):', err.message);
                        });
                    }
                } catch (orderError) {
                    console.log('Note: Order update had an issue:', orderError.message);
                    // Don't fail the whole payment if order update fails
                }
            }

            return res.status(200).json({ 
                success: true,
                message: 'Payment recorded successfully',
                payment_id: paymentId,
                transaction_id: transaction_id,
                order_id: order_id || null,
                amount: parseFloat(amount)
            });

        } catch (err) {
            console.error('Payment processing error:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Payment processing failed',
                error: err.message 
            });
        }
    } 
    
    // GET method to fetch payment history
    else if (req.method === 'GET') {
        try {
            const { user_id, username } = req.query;
            
            if (!username && !user_id) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Username or user_id is required' 
                });
            }

            let sql = `
                SELECT 
                    id,
                    username,
                    user_id,
                    amount,
                    method,
                    transaction_id,
                    status,
                    DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at
                FROM payments
                WHERE 1=1
            `;
            
            const params = [];
            
            if (username) {
                sql += ` AND username = ?`;
                params.push(username);
            }
            if (user_id) {
                sql += ` AND user_id = ?`;
                params.push(user_id);
            }
            
            sql += ` ORDER BY created_at DESC LIMIT 50`;
            
            const [rows] = await pool.execute(sql, params);
            
            return res.status(200).json({ 
                success: true, 
                payments: rows 
            });

        } catch (err) {
            console.error('Error fetching payments:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch payments' 
            });
        }
    } 
    
    else {
        return res.status(405).json({ 
            success: false, 
            message: 'Method not allowed' 
        });
    }
}