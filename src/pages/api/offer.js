import { db } from '@/lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const [offers] = await db.query('SELECT * FROM offers WHERE active = TRUE AND valid_until >= CURDATE() ORDER BY valid_until');
            res.status(200).json(offers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}