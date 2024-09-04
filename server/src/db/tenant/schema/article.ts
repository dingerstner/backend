
import { type AnySQLiteColumn, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {textEnum} from "./helpers";
import type { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { z } from 'zod';
import {fieldEnum} from "./helpers";


export const article = sqliteTable("article",{ 
    id: text("id").notNull().primaryKey(),
    source:text("source"),
    url:text("url"),
    headLine:text("headline"),
    subHeadLine:text("subHeadLine"),
    text:text("text"),
    publishedAt:text("publishedAt").$type<Date>(),
    updatedAt:text("updatedAt").$type<Date>(),
    postedOnHomePage:integer("postedOnHomePage", { mode: 'boolean' }).default(false),
    tags:text("tags"),
    image:text("image"),
    video:text("video"),
    audio:text("Audio"),
    author:text("author"),
    language:text("language"),
  },
  );

  const selectArticleSchema = createSelectSchema(article);

  

  export const newArticl = sqliteTable("newArticl",{
    id: text("id"),
    link:text("link"),
    title:text("title"),
    pubDate:text("pubDate"),
    description:text("description"),
    source:text("source"),
  },
  )

 
  const selectNewarticlechema = createSelectSchema(newArticl);
  const insertNewarticlechema = createInsertSchema(newArticl);


  export const newarticlechema = z.object({
    body: selectNewarticlechema.pick({
      id: true,
      link: true,
      title: true,
      pubDate: true,
      description: true,
      source: true,
    }),
  });


  export const updateArticleSchema = z.object({
    body: selectArticleSchema.pick({
      url: true,
      headLine: true,
      subHeadLine: true,
      text: true,
    }),
  });


  export const deleteArticleSchema = z.object({
    body: selectArticleSchema.pick({
      id: true,
      url: true,
      headLine: true,
      subHeadLine: true,
      text: true,
      publishedAt: true,
    }),
  })


  export type NewArticles = z.infer<typeof newarticlechema>['body'];
  export type articles =  InferSelectModel<typeof article>;
  export type UpdateArticle = z.infer<typeof updateArticleSchema>['body'];
  export type DeleteArticle = z.infer<typeof deleteArticleSchema>['body'];



  export const source = sqliteTable("source",{
   id: text("id").notNull().primaryKey(),
   url:text("Url"),
   type: text ("type").default("General"),
   field: textEnum("field",fieldEnum).default("General"),
   country:text("country"),
   language:text("language"),
  },)

  export type SelectSource = InferSelectModel<typeof source>
  export type insertSource = InferInsertModel<typeof source>





  
export const articleType = sqliteTable("articleType ", {
  id: text("id").$type<articles>().references((): AnySQLiteColumn => article.id, { onDelete: "cascade" }).primaryKey(),
  section:text("section",{ enum: ["General","insurance","politics","Business","Technology","Science","Health ","Wellness","Innovation","Startups","investments","Education","Environment","Arts","Culture","sport","RiskManagement","Automotive","Fashion","lifestyle","Gadgets","Engineering","Telecommunications","media","IT","gaming","Computing"]}).default("General"),
  subSection:text("subSection",{ enum: ["General","news","interview","editorial","gossip","article","podcast"]}).default("General"),
  tags:text("tags"),
})

export type SelectArticleType = InferSelectModel<typeof articleType>
export type insertArticleType = InferInsertModel<typeof articleType>






export const articlekeywordses = sqliteTable("articlekeywordses",{
  id: text("id").$type<articles>().references((): AnySQLiteColumn => article.id, { onDelete: "cascade" }).primaryKey(),
  headLinekeywords:text("headLinekeywords"),
  subHeadLinekeywords:text("subHeadLinekeywords"),
  contentkeywords:text("contentkeywords"),
  imagekeywords:  text("imagekeywords",),
  videokeywords:  text("videokeywords" ),
  audiokeywords:  text("audiokeywords" ),
});

export type SelectArticlekeywords = InferSelectModel<typeof articlekeywordses>
export type insertArticlekeywords = InferInsertModel<typeof articlekeywordses>















