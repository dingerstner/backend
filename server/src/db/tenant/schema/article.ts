
import {  foreignKey, integer,  text } from "drizzle-orm/sqlite-core";
import { sqliteTable} from "../../helpers";



//articl
export const article = sqliteTable()("article",{ 
    id: text("id"),
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
    //score
    headLinekeywords:text("headLinekeywords"),
    subHeadLinekeywords:text("subHeadLinekeywords"),
    contentkeywords:text("contentkeywords"),
    imagekeywords:  text("imagekeywords",),
    videokeywords:  text("videokeywords" ),
    audiokeywords:  text("audiokeywords" ),
    //type
    section:text("section",{ enum: ["General","insurance","politics","Business","Technology","Science","Health ","Wellness","Innovation","Startups","investments","Education","Environment","Arts","Culture","sport","RiskManagement","Automotive","Fashion","lifestyle","Gadgets","Engineering","Telecommunications","media","IT","gaming","Computing"]}).default("General"),
    subSection:text("subSection",{ enum: ["General","news","interview","editorial","gossip","article","podcast"]}).default("General"),
  },
  (article) => {
    return {
      articleScoreFk: foreignKey({
        columns: [article.id],
        foreignColumns: [newArticl.id],
        name: "articleScoreFk"
      })
    }
  }
  );



//newArticl
  export const newArticl = sqliteTable()("newArticl",{
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }).unique(),
    link:text("link"),
    title:text("title"),
    pubDate:text("pubDate"),
    description:text("description"),
    source:text("source"),
  },
  )

 



//articleScore//
export const articleScore = sqliteTable()(
  "articleScore",{
  articleId: text("id").notNull().primaryKey(),
  headLine:integer("headline", { mode:'number'}),
  subHeadLine:integer("subHeadLine", { mode: 'number' }),
  content:integer("content", { mode: 'number' }),
  source:integer("source", { mode: 'number' }),
  postedOnHomePage:integer("postedOnHomePage", { mode: 'number' }),
  image:integer("image", { mode: 'number' }),
  video:integer("video", { mode: 'number' }),
  audio:integer("Audio", { mode: 'number' }),
  total: integer("total", { mode: 'number' })
},
(articleScore) => {
  return {
    articleScoreFk: foreignKey({
      columns: [articleScore.articleId],
      foreignColumns: [newArticl.id],
      name: "articleScoreFk"
    })
  }
}
);






















