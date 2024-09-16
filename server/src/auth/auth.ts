
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from '../db/primary';
import { session, user } from '../db/primary/schema';
import { Lucia } from "lucia";
import { company, companySession } from "@/db/primary/schema";




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
      companyNeme: attributes.companyNeme,
      emailVerified: attributes.email_verified,
    };
  },
  getUserAttributes: (attributes) => {
		return {
      id: attributes.id,
      email: attributes.email,
      name: attributes.name,
      companyNeme: attributes.companyNeme,
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
    companyNeme: string
    email_verified: boolean;
    expiresAt: string;
  }

  interface DatabaseUserAttributes {
    invaitePassword: any;
    invaiteHashedPassword: any;
    id: string
    name: string;
    email: string;
    email_verified: boolean;
    companyNeme: string;
    emailVerified: boolean;
    hashedPassword: string;
  }
}

export type Auth = typeof auth;



const companyAdapter = new DrizzleSQLiteAdapter(db, companySession, company);

export const companyAuth = new Lucia(companyAdapter, {
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
      companyNeme: attributes.companyNeme,
      emailVerified: attributes.email_verified,
     
    };
  },
  getUserAttributes: (attributes) => {
		return {
      id: attributes.id,
      email: attributes.email,
      name: attributes.name,
      companyNeme: attributes.companyNeme,
      emailVerified: attributes.email_verified,
      hashedPassword: attributes.hashedPassword,
      invaiteHashedPassword: attributes.invaiteHashedPassword,
      invaitePassword: attributes.invaitePassword,
      
		};
	}
});

declare module "lucia" {
  interface Register {
    Lucia: typeof auth;
    DataCompanybaseSessionAttributes: DataCompanybaseSessionAttributes;
    DatabaseCompanyAttributes: DatabaseCompanyAttributes;
  }
  interface DataCompanybaseSessionAttributes {
    id: string
    userId: string
    email_verified: boolean;
    expiresAt: string;
  }

  interface DatabaseCompanyAttributes {
    id: string
    companyName: string;
    userId: string
    email: string;
    email_verified: boolean;
    hashedPassword: string;
    invaiteHashedPassword: string;
    invaitePassword: string;
  }
}

export type companyAuth = typeof companyAuth;