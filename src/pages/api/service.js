import { db } from '@/lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const [services] = await db.query('SELECT * FROM services WHERE available = TRUE ORDER BY category, name');
            res.status(200).json(services);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}