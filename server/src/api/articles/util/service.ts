
import * as beerio from "beerio";
import { newFeed } from "xml-trap";


 

export async function fetchSourceRssFeed (rssFeedUrl: string): Promise<{
    items: {
        title: string;
        pubDate: string;
        description: string;
        source: string;
    }[];
} | null> {
    if (!rssFeedUrl) console.log ("rssFeedUrl is required");
    const feed = await newFeed(rssFeedUrl)
    const items = feed.item.map((item:any) => ({
        title: item.title ?? '',
        pubDate: item.pubDate ?? '',
        description: item.description ?? '',
        source: item.source ?? '',
    }));
    return items
}


  
export async function getArticle(decodedUrls:string){
  const $ = await beerio.fromURL(decodedUrls);
  const title = $.select('title').text();
  const content = $.select('.content').text();
  return title + content; 
}









