import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../db_utility';

// Handle requests to `/api/articles/[id]`
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (id && typeof id === 'string') {
        if (req.method === 'PUT') {
            // Update article
            try {
                const article = await prisma.article.update({
                    where: { id: id },
                    data: req.body,
                });
                res.status(200).json(article);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error updating article' });
            }
        } else if (req.method === 'PATCH') {
            // Partial update for editing
            try {
                const article = await prisma.article.update({
                    where: { id: id },
                    data: req.body,
                });
                res.status(200).json(article);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error updating article' });
            }
        } else if (req.method === 'DELETE') {
            // Delete article
            try {
                const deleted = await prisma.article.delete({
                    where: { id: id },
                });
                res.status(204).json(deleted);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error deleting article' });
            }
        } else {
            res.setHeader('Allow', ['PUT', 'PATCH', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } else if (req.method === 'POST') {
        // Create new article
        try {
            const article = await prisma.article.create({
                data: req.body,
            });
            res.status(201).json(article);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating article' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'PUT', 'PATCH', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
