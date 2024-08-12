import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db_utility'; // Adjust the path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query = '', page = 1, pageSize = 10, sort = 'desc' } = req.query;

  try {
    const searchQuery = query.toString();
    const pageNumber = parseInt(page.toString(), 10);
    const pageSizeNumber = parseInt(pageSize.toString(), 10);
    const sortOrder = sort === 'asc' ? 'asc' : 'desc';

    const articles = await prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          { content: { contains: searchQuery, mode: 'insensitive' } },
          { subtitle: { contains: searchQuery, mode: 'insensitive' } },
          { author: { contains: searchQuery, mode: 'insensitive' } },
        ],
      },
      orderBy: {
        pubDate: sortOrder, // Sorting by publication date
      },
      skip: (pageNumber - 1) * pageSizeNumber,
      take: pageSizeNumber,
    });

    const totalArticles = await prisma.article.count({
      where: {
        OR: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          { content: { contains: searchQuery, mode: 'insensitive' } },
          { subtitle: { contains: searchQuery, mode: 'insensitive' } },
          { author: { contains: searchQuery, mode: 'insensitive' } },
        ],
      },
    });

    res.status(200).json({
      articles,
      totalArticles,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalArticles / pageSizeNumber),
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
