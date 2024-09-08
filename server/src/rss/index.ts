
import { pool } from '@/db/tenant/Pool';
import {newArticl} from '@/db/tenant/schema/article';
import { newFeed } from "xml-trap";

interface Article {
    id?: string;
    Link?: string;
    title?: string;
    pubDate?: string;
    description?: string;
    source?: string;
  }
  
export const googleNews = async  ( keyword: string, TimeCount: string, language: string, country: string, tenant:string): Promise<void> => {
 
    const feed = await newFeed(
      `https://news.google.com/rss/search?q=${keyword}+when:${TimeCount}d&hl=${language}&gl=${country}&ceid=${language}:${country}`
    );

    if (!feed || !feed.items) {
      console.error(`Entry with missing feed or items for keyword ${keyword}`);
      return;
    }

    feed.items.forEach(async (item:any ) =>  {
      if (!item || !item.title || !item.link || !item.guid || !item.pubDate) {
        console.error(`Entry with missing id or link for keyword ${keyword}`);
        return;
      }

      const articlesToInsert: Article[] = [];
      articlesToInsert.push({
        id: '',
        Link: item.link  ,
        title: item.title ,
        pubDate: item.pubDate ,
        description: item.description ,
        source: item.source ,
      });

      if (articlesToInsert.length === 0) {
        console.error(`Entry with missing items to insert for keyword ${keyword}`);
        return;
      }

      try {
        await Promise.all(articlesToInsert.map(async (article) => {
          return pool(tenant).insert(newArticl)
            .values({
              id: article.id,
              link: article.Link,
              title: article.title,
              pubDate: article.pubDate,
              description: article.description,
              source: article.source
            }
          )
        }
      )
    );
    console.log('Articles added successfully');
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
);
};

