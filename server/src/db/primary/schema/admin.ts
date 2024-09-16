import { relations, sql } from "drizzle-orm";
import { blob, integer, primaryKey, sqliteTable, text, type AnySQLiteColumn } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import {user} from "./user";

export const admin = sqliteTable("company", {
  id: text('id'),
  name: text("name").notNull(),
  email: text("email").notNull(),
  invaitePassword: text("passwordPepper").notNull(),
  invaiteHashedPassword: text("password").notNull(),
});


export const adminSession = sqliteTable("company_session", {
  id: text("id")
  .primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => admin.id),
  expiresAt: integer("expires_at").notNull(),
  activeExpires: blob("active_expires", {
    mode: "bigint",
  }).notNull(),
  idleExpires: blob("idle_expires", {
    mode: "bigint",
  }).notNull(),
});

export const key = sqliteTable("company_key", {
  id: text("id").primaryKey(),
  userId: text("company_Id")
    .notNull()
    .references(() => admin.id),
  hashedPassword: text("hashed_password"),
});


export const companyRelations = relations(admin, ({ many }) => ({
  users: many(user),
}));  

export const insertCompanySchema = createInsertSchema(admin);
export const selectCompanySchema = createSelectSchema(admin);



export const emailVerificationTokens = sqliteTable(
  "emailVerificationToken",
  {
    id: text("id").notNull().$defaultFn(() => crypto.randomUUID()).notNull(),
    token: text("token").notNull(),
    adminId: text("adminId").notNull()
    .references((): AnySQLiteColumn => admin.id,{ onUpdate: 'cascade', onDelete: "cascade" }),
    email: text("email").notNull(),
    expires: integer("expires", { mode: 'timestamp' } ).default(sql`(unixepoch())`).notNull(),
  },
  (emailVerificationTokens) => ({
    compositePk: primaryKey({
      columns: [emailVerificationTokens.id, emailVerificationTokens.token],
    }),
    userIdx: index("userIdx").on(emailVerificationTokens.adminId:),
  })
)

export type emailVerificationTokens = typeof emailVerificationTokens.$inferSelect;



export const passwordResetTokens = sqliteTable(
  "passwordResetToken",
  {
    id: text("id").notNull(),
    hashedToken: text("token").notNull(),
    userId: text("userId").notNull()
    .references((): AnySQLiteColumn => user.id,{ onUpdate: 'cascade', onDelete: "cascade" }),
    expires: integer("expires", { mode: 'timestamp' }).notNull(),
  },
  (passwordResetTokens) => ({
    compositePk: primaryKey({
      columns: [passwordResetTokens.expires],
   }
  ),
  userIdx: index("userIdx").on(passwordResetTokens.expires),
   }
  )
 )
export type SelectpasswordResetTokens = typeof passwordResetTokens.$inferSelect;
export type InsertUserpasswordResetTokens = typeof passwordResetTokens.$inferInsert;


export const emailVerificationTokenRelations = relations(
  emailVerificationTokens,
  ({ one }) => ({
    user: one(user, {
      fields: [emailVerificationTokens.userId],
      references: [user.id],
    })
  })
)


