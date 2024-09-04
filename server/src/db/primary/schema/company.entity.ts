import { relations } from "drizzle-orm";
import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import {user} from "./user.entity";

export const company = sqliteTable("company", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  databaseName: text("databaseName").notNull(),
});


export const companySession = sqliteTable("user_session", {
  id: text("id").primaryKey(),
  companyId: text("companyId")
    .notNull()
    .references(() => company.id),
  activeExpires: blob("active_expires", {
    mode: "bigint",
  }).notNull(),
  idleExpires: blob("idle_expires", {
    mode: "bigint",
  }).notNull(),
});

export const key = sqliteTable("user_key", {
  id: text("id").primaryKey(),
  companyId: text("user_id")
    .notNull()
    .references(() => company.id),
  hashedPassword: text("hashed_password"),
});


export const companyRelations = relations(company, ({ many }) => ({
  users: many(user),
}));  
export type SelectCompany = typeof company.$inferSelect;
export type InsertCompany = typeof company.$inferInsert;

export const insertCompanySchema = createInsertSchema(company);
export const selectCompanySchema = createSelectSchema(company);