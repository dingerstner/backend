import { article } from "@/db/tenant/schema/article";



export const articleFields = {
    id: article.id,
    source: article.source,
    url: article.url,
    headLine: article.headLine,
    subHeadLine: article.subHeadLine,
    text: article.text,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    postedOnHomePage: article.postedOnHomePage,
    tags: article.tags,
    image: article.image,
    video: article.video,
    audio: article.audio,
    author: article.author,
    language: article.language,
    headLinekeywords: article.headLinekeywords,
    subHeadLinekeywords: article.subHeadLinekeywords,
    contentkeywords: article.contentkeywords,
    imagekeywords: article.imagekeywords,
    videokeywords: article.videokeywords,
    audiokeywords: article.audiokeywords,
    section: article.section,
    subSection: article.subSection,
    };
    
