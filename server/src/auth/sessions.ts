import type { Context } from "elysia";
import { auth } from ".";

export type AuthSession = {
  session: {
    user: {
id: string
email? : string
name?: string
email_verified: boolean
expiresAt?: string
    }
  } | null
} 

export async function newSession(
  userId: string,
  _: Context /*The context may be needed in the future*/,
): Promise<string> {
  const session = await auth.createSession(userId, {
    id: "",
    email: "",
    name: "",
    companyNeme: "",
    email_verified: false,
    expiresAt: ""
  });

  return session.id;
}

export async function deleteSession(sessionId: string) {
  await auth.invalidateSession(sessionId);
}




export type companyAuthSession = {
  companySession: {
    company: {
id: string
email? : string
email_verified: boolean
expiresAt?: string
    }
  } | null
}

export async function newCompanySession(
  userId: string,
  _: Context /*The context may be needed in the future*/,
): Promise<string> {
  const companySession = await auth.createSession(userId, {
    id: "",
    email: "",
    name: "",
    companyNeme: "",
    email_verified: false,
    expiresAt: ""
  } );

  return companySession.id;
}

export async function deleteCompanySession(companySessionId: string) {
  await auth.invalidateSession(companySessionId);
}
