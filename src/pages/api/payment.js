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
        const { username, amount, method } = req.body;

        if (!username || !amount || !method) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        try {
            const sql = 'INSERT INTO payments (username, amount, method) VALUES (?, ?, ?)';
            const [result] = await pool.execute(sql, [username, amount, method]);

            return res.status(200).json({ message: 'Payment recorded successfully', id: result.insertId });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
