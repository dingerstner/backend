
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import {  integer, sqliteTable,  text } from "drizzle-orm/sqlite-core";
import {fieldEnum, textEnum} from "@/db/helpers";

export const source = sqliteTable("source",{
    id: integer("id", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .unique(),
    url:text("Url").unique(),
    tier:text("tier"),
    type: text ("type").default("General"),
    field: textEnum("field",fieldEnum).default("General"),
    country:text("country"),
    language:text("language"),

   },)
 
   
   export const selectSourceSechema = createSelectSchema(source);
   export const insertSourceSechema = createInsertSchema(source);


   export const section= sqliteTable("section",{
    id: text("id").references(() => source.id),
    Url:text("rssUrl"),
    field: textEnum("field",fieldEnum).default("General"),
   },)
   export const selectsectionSechema = createSelectSchema(section);
   export const insertsectionSechema = createInsertSchema(section);
   
   