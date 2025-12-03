import { initializeDatabase } from '@/src/lib/init-db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await initializeDatabase();
            res.status(200).json({ message: 'Database initialized successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}