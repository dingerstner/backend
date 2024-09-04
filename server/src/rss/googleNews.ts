
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

    feed.items.forEach(async (item:any ) =>  {
      if (!item.title || !item.link || !item.guid || !item.pubDate) {
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

