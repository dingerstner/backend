
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from '../db/primary';
import { session, user } from '../db/primary/schema';
import { Lucia } from "lucia";




const adapter = new DrizzleSQLiteAdapter(db, session, user);

export const auth = new Lucia(adapter, {
  sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production",
		},
	},
  getSessionAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      name: attributes.name,
      companyId: attributes.companyId,
      emailVerified: attributes.email_verified,
    };
  },
  getUserAttributes: (attributes) => {
		return {
      id: attributes.id,
      email: attributes.email,
      name: attributes.name,
      companyId: attributes.companyId,
      emailVerified: attributes.email_verified,
      hashedPassword: attributes.hashedPassword,
		};
	}
});

declare module "lucia" {
  interface Register {
    Lucia: typeof auth;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
  interface DatabaseSessionAttributes {
    id: string
    email: string
    name: string
    companyId: string
    email_verified: boolean;
  }

  interface DatabaseUserAttributes {
    id: string
    name: string;
    email: string;
    email_verified: boolean;
    companyId: string;
    emailVerified: boolean;
    hashedPassword: string;
  }
}

export type Auth = typeof auth;
