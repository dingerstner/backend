
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import {  sqliteTable,  text } from "drizzle-orm/sqlite-core";
import {fieldEnum, textEnum} from "@/db/helpers";

export const source = sqliteTable("source",{
    id: text("id").notNull().primaryKey(),
    url:text("Url"),
    type: text ("type").default("General"),
    field: textEnum("field",fieldEnum).default("General"),
    country:text("country"),
    language:text("language"),
    
   },)
 

 
   export const selectNewarticlechema = createSelectSchema(source);
   export const insertNewarticlechema = createInsertSchema(source);