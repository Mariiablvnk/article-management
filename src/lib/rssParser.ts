import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { RSSItem } from './interfaces';
const prisma = new PrismaClient();



async function fetchAndStoreArticles() {
    try {
      const response = await axios.get('https://podcastfeeds.nbcnews.com/HL4TzgYC');
      const data = await parseStringPromise(response.data);
      console.log('Data received from RSS feed:', JSON.stringify(data, null, 2));
      
      const items: RSSItem[] = data.rss.channel[0].item;
  
      for (const item of items) {
        console.log('Processing item:', item);
  
        // Safeguard against missing properties
        const guid = item.guid?.[0]?._?.trim() || '';
        const pubDate = new Date(item.pubDate?.[0] || '');
  
        await prisma.article.upsert({
          where: { id: guid },
          update: {
            title: item.title?.[0] || '',
            subtitle: item['itunes:subtitle']?.[0] || '',
            content: item['content:encoded']?.[0] || '',
            image: item['itunes:image']?.[0]?.$.href || '',
            pubDate,
            author: item.author?.[0] || '',
            link: item.link?.[0] || '',
            enclosureUrl: item.enclosure?.[0]?.$.url || '',
            itunesTitle: item['itunes:title']?.[0] || '',
            itunesAuthor: item['itunes:author']?.[0] || '',
            itunesImage: item['itunes:image']?.[0]?.$.href || '',
            itunesDuration: item['itunes:duration']?.[0] || '',
            itunesSummary: item['itunes:summary']?.[0] || '',
            itunesSubtitle: item['itunes:subtitle']?.[0] || '',
            itunesExplicit: item['itunes:explicit']?.[0] === 'true',
            itunesEpisodeType: item['itunes:episodeType']?.[0] || '',
          },
          create: {
            id: guid,
            title: item.title?.[0] || '',
            subtitle: item['itunes:subtitle']?.[0] || '',
            content: item['content:encoded']?.[0] || '',
            image: item['itunes:image']?.[0]?.$.href || '',
            pubDate,
            author: item.author?.[0] || '',
            link: item.link?.[0] || '',
            enclosureUrl: item.enclosure?.[0]?.$.url || '',
            itunesTitle: item['itunes:title']?.[0] || '',
            itunesAuthor: item['itunes:author']?.[0] || '',
            itunesImage: item['itunes:image']?.[0]?.$.href || '',
            itunesDuration: item['itunes:duration']?.[0] || '',
            itunesSummary: item['itunes:summary']?.[0] || '',
            itunesSubtitle: item['itunes:subtitle']?.[0] || '',
            itunesExplicit: item['itunes:explicit']?.[0] === 'true',
            itunesEpisodeType: item['itunes:episodeType']?.[0] || '',
          },
        });
      }
    } catch (error) {
      console.error('Error fetching or storing articles:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
export { fetchAndStoreArticles };
