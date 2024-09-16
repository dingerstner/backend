import { article, articleScore, newArticl } from '@/db/tenant/schema/article';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';



// article Schema 
export const selectArticleSchema = createSelectSchema(article);
export const insertArticleSchema = createInsertSchema(article);


// new article Schema
export const selectNewarticlechema = createSelectSchema(newArticl);
export const insertNewarticlechema = createInsertSchema(newArticl);


// article Score Schema
export const selectArticleScorSeechema = createSelectSchema(articleScore);
export const insertArticleScorSeechema = createInsertSchema(articleScore);

