import { article, articleScore, newArticl } from '@/db/tenant/schema/article';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { t, type Static } from "elysia";


// article Schema 
export const selectArticleSchema = createSelectSchema(article);
export const insertArticleSchema = createInsertSchema(article);

export type ArticleInsert = Static<typeof selectArticleSchema>;
export type Article = Static<typeof selectArticleSchema>;

export const articleBase = t.Pick(insertArticleSchema, [ 
    "title", "link","author", "pubDate","language", 
    "source","headLine","subHeadLine","content","image",
    "video","audio"
]);
export type ArticleBase = Static<typeof articleBase>;



// new article Schema
export const selectNewarticlechema = createSelectSchema(newArticl);
export const insertNewarticlechema = createInsertSchema(newArticl);

export type NewArticlInsert = Static<typeof insertNewarticlechema>;
export type NewArticl = Static<typeof selectNewarticlechema>;

export const newArticleBase = t.Pick(insertNewarticlechema, [
    "source" ,"link","title","pubDate","description"
]);

export type NewarticleBase = Static<typeof newArticleBase>;


// article Score Schema
export const selectArticleScorSeechema = createSelectSchema(articleScore);
export const insertArticleScorSeechema = createInsertSchema(articleScore);

