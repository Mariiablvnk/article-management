import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../db_utility';
import { parseISO, isValid } from 'date-fns';
function generateId(length = 20) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return String(result);
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const articles = await prisma.article.findMany();
            res.status(200).json(articles);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching articles' });
        }
    } else if (req.method === 'POST') {
        // Validate pubDate if it exists in the request body
        const { pubDate, createdAt, ...articleData } = req.body;

        if (pubDate) {
            const parsedPubDate = parseISO(pubDate);
            const parsedCreatedAt = parseISO(createdAt);
            const newid = generateId()
            if (!isValid(parsedPubDate)) {
                return res.status(400).json({ error: 'Invalid pubDate format. Expected ISO-8601 DateTime.' });
            }
            try {
                const article = await prisma.article.create({
                    data: {
                        ...req.body,
                        createdAt: parsedCreatedAt,
                        id: newid,
                        pubDate: parsedPubDate,
                    }
                });
                res.status(201).json(article);
            } catch (error) {
                console.log(error)
                res.status(500).json({ error });
            }
        }

    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
