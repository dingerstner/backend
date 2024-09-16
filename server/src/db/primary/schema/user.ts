import { relations, sql } from "drizzle-orm";
import { blob, index, integer, primaryKey, sqliteTable, text, type AnySQLiteColumn } from "drizzle-orm/sqlite-core";
import {admin } from "./admin";

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  companyName: text("CompanyName").notNull(),
  hashedPassword: text("hashed_password").notNull(),
  passwordSalt: text("password_salt").notNull(),
  invaitePassword: text("password_pepper").notNull(),
  emailVerified: integer("email_verified",{ mode: "boolean" }).default(false),
  iconUrl: text("icon_url"),
});




export const  session = sqliteTable("session", {
	id: text("id").notNull().primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => user.id),
	expiresAt: integer("expires_at").notNull()
});

export type SelectUser = typeof user.$inferSelect;
export type InsertUser = typeof user.$inferInsert;


// =============================== Verification ===============================


export const emailVerificationTokens = sqliteTable(
  "emailVerificationToken",
  {
    id: text("id").notNull().$defaultFn(() => crypto.randomUUID()).notNull(),
    token: text("token").notNull(),
    userId: text("userId").notNull()
    .references((): AnySQLiteColumn => user.id,{ onUpdate: 'cascade', onDelete: "cascade" }),
    email: text("email").notNull(),
    expires: integer("expires", { mode: 'timestamp' } ).default(sql`(unixepoch())`).notNull(),
  },
  (emailVerificationTokens) => ({
    compositePk: primaryKey({
      columns: [emailVerificationTokens.id, emailVerificationTokens.token],
    }),
    userIdx: index("userIdx").on(emailVerificationTokens.userId),
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



// =============================== OAuth ===============================


export const oauthAccount = sqliteTable(
  "oauthAccount",
  {
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => user.id),
  },
  (oauthAccount) => (
    {
    pk: primaryKey({ columns: [oauthAccount.provider, oauthAccount.providerAccountId]}),
    userIdx: index("userIdx").on(oauthAccount.userId),
     }
    )
  )