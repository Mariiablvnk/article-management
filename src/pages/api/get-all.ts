import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { fetchAndStoreArticles } from '../../lib/rssParser';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const existingArticles = await prisma.article.findMany();
    if (existingArticles.length > 100) {
        console.log('Articles already exist. Skipping fetch and store.');
        res.status(200).json('Articles already exist. Skipping fetch and store.');
        return;
    }
    try {
        console.log('Fetching and storing articles on first page load...');
        await fetchAndStoreArticles();
    } catch (error) {
        console.error('Error fetching articles:', error);
    } 
}
